# 奈奈畫圖 — 一鍵新增作品 GUI
# 選圖、打標題、選分類 → 自動複製圖片、寫入 works.js、commit 並 push 上線
# 自動依圖片長寬判斷直/橫圖：直圖沿用「偏上」預設、橫圖自動加 focus:"center"

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'

$root     = Split-Path $PSScriptRoot -Parent
$worksJs  = Join-Path $root 'assets\js\works.js'
$worksDir = Join-Path $root 'works'
$errLog   = Join-Path $PSScriptRoot 'last-error.log'

# 圖片壓縮設定：長邊上限（px）與 JPEG 品質（0-100）
$MaxEdge     = 2000
$JpegQuality = 82

function Esc([string]$s) {
  if ($null -eq $s) { return '' }
  return ($s -replace '\\', '\\') -replace '"', '\"'
}

# 執行 git 並回傳輸出字串。git 常把警告寫到 stderr，搭配 $ErrorActionPreference='Stop' + 2>&1
# 會被誤當成終止錯誤，故此處暫時改為 Continue，並濾掉無害的 LF/CRLF 換行警告。
function Invoke-Git([string[]]$GitArgs) {
  $prev = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  try { $raw = & git @GitArgs 2>&1 }
  finally { $ErrorActionPreference = $prev }
  $lines = @($raw | ForEach-Object { $_.ToString() }) |
    Where-Object { $_ -notmatch 'will be replaced by (CRLF|LF)' }
  return ($lines -join "`n")
}

# 以共享唯讀模式把整個檔讀進記憶體再解碼，避免圖正開在繪圖軟體裡導致檔案被鎖。
# 回傳 @{ img = <Image>; ms = <MemoryStream> }，呼叫端用完要 Dispose 兩者。
function Open-ImageSafe([string]$path) {
  $fs = [IO.File]::Open($path, [IO.FileMode]::Open, [IO.FileAccess]::Read, [IO.FileShare]::ReadWrite)
  $ms = New-Object IO.MemoryStream
  try { $fs.CopyTo($ms) } finally { $fs.Close(); $fs.Dispose() }
  $ms.Position = 0
  $img = [Drawing.Image]::FromStream($ms)
  return @{ img = $img; ms = $ms }
}

# 縮圖 + 轉 JPEG 壓縮；回傳輸出後的長寬。不放大（scale 上限 1.0）
function Save-Compressed([string]$srcPath, [string]$destPath, [int]$maxEdge, [int]$quality) {
  $src = Open-ImageSafe $srcPath
  $img = $src.img
  try {
    $w = $img.Width; $h = $img.Height
    $scale = [Math]::Min(1.0, $maxEdge / [Math]::Max($w, $h))
    $nw = [int][Math]::Round($w * $scale); if ($nw -lt 1) { $nw = 1 }
    $nh = [int][Math]::Round($h * $scale); if ($nh -lt 1) { $nh = 1 }
    $bmp = New-Object Drawing.Bitmap($nw, $nh)
    try {
      $g = [Drawing.Graphics]::FromImage($bmp)
      $g.InterpolationMode = [Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $g.SmoothingMode     = [Drawing.Drawing2D.SmoothingMode]::HighQuality
      $g.PixelOffsetMode   = [Drawing.Drawing2D.PixelOffsetMode]::HighQuality
      $g.Clear([Drawing.Color]::White)   # 透明 PNG 轉 JPEG 時底色填白
      $g.DrawImage($img, 0, 0, $nw, $nh)
      $g.Dispose()
      $codec = [Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
      $ep = New-Object Drawing.Imaging.EncoderParameters(1)
      $ep.Param[0] = New-Object Drawing.Imaging.EncoderParameter([Drawing.Imaging.Encoder]::Quality, [long]$quality)
      $bmp.Save($destPath, $codec, $ep)
    }
    finally { $bmp.Dispose() }
  }
  finally { $img.Dispose(); $src.ms.Dispose() }
  return @{ w = $nw; h = $nh }
}

# 分類：顯示文字 -> 寫入 works.js 的 key（須與 works.js 的 CATEGORIES 一致）
$cats = [ordered]@{
  '二次創作 (fanart)'    = 'fanart'
  '角色設計 (character)' = 'character'
  '遊戲用 (game)'        = 'game'
  '書籍封面 (cover)'     = 'cover'
  '委託 (commission)'    = 'commission'
  '其他 (other)'         = 'other'
}
# 職務：顯示 -> @(ja, en, zh)
$roles = [ordered]@{
  '插畫'       = @('イラスト', 'Illustration', '插畫')
  '角色設計'   = @('キャラクターデザイン', 'Character Design', '角色設計')
  '設計至完稿' = @('デザイン〜イラスト', 'Design–Illustration', '設計至完稿')
}

$script:imgPath  = $null
$script:isLandsc = $false

# ---------- 介面 ----------
$form = New-Object Windows.Forms.Form
$form.Text = '奈奈畫圖 — 新增作品'
$form.Size = New-Object Drawing.Size(520, 600)
$form.StartPosition = 'CenterScreen'
$form.Font = New-Object Drawing.Font('Microsoft JhengHei UI', 9)
$form.BackColor = [Drawing.Color]::FromArgb(27, 26, 31)
$form.ForeColor = [Drawing.Color]::White

function Add-Label($text, $y) {
  $l = New-Object Windows.Forms.Label
  $l.Text = $text; $l.AutoSize = $true
  $l.Location = New-Object Drawing.Point(20, $y)
  $l.ForeColor = [Drawing.Color]::FromArgb(239, 124, 163)
  $form.Controls.Add($l); return $l
}
function New-Box($y, $w = 470) {
  $t = New-Object Windows.Forms.TextBox
  $t.Location = New-Object Drawing.Point(20, $y)
  $t.Size = New-Object Drawing.Size($w, 24)
  $t.BackColor = [Drawing.Color]::FromArgb(40, 38, 46)
  $t.ForeColor = [Drawing.Color]::White
  $form.Controls.Add($t); return $t
}

$y = 15
Add-Label '圖片檔（直圖自動偏上、橫圖自動置中）' $y | Out-Null
$y += 22
$pathBox = New-Box $y 360
$pathBox.ReadOnly = $true
$btnPick = New-Object Windows.Forms.Button
$btnPick.Text = '選擇…'
$btnPick.Location = New-Object Drawing.Point(390, ($y - 1))
$btnPick.Size = New-Object Drawing.Size(100, 26)
$form.Controls.Add($btnPick)
$y += 28
$lblInfo = Add-Label '尚未選圖' $y
$lblInfo.ForeColor = [Drawing.Color]::Gray
$y += 30

Add-Label '標題（日文 / 必填）' $y | Out-Null; $y += 22
$jaBox = New-Box $y; $y += 32
Add-Label '標題（英文 / 可留空，留空則沿用日文）' $y | Out-Null; $y += 22
$enBox = New-Box $y; $y += 32
Add-Label '標題（中文 / 可留空）' $y | Out-Null; $y += 22
$zhBox = New-Box $y; $y += 32

Add-Label '分類' $y | Out-Null; $y += 22
$catBox = New-Object Windows.Forms.ComboBox
$catBox.Location = New-Object Drawing.Point(20, $y)
$catBox.Size = New-Object Drawing.Size(230, 24)
$catBox.DropDownStyle = 'DropDownList'
$cats.Keys | ForEach-Object { $catBox.Items.Add($_) | Out-Null }
$catBox.SelectedIndex = 0
$form.Controls.Add($catBox)

$lblRole = New-Object Windows.Forms.Label
$lblRole.Text = '職務'; $lblRole.AutoSize = $true
$lblRole.Location = New-Object Drawing.Point(270, ($y - 22))
$lblRole.ForeColor = [Drawing.Color]::FromArgb(239, 124, 163)
$form.Controls.Add($lblRole)
$roleBox = New-Object Windows.Forms.ComboBox
$roleBox.Location = New-Object Drawing.Point(270, $y)
$roleBox.Size = New-Object Drawing.Size(220, 24)
$roleBox.DropDownStyle = 'DropDownList'
$roles.Keys | ForEach-Object { $roleBox.Items.Add($_) | Out-Null }
$roleBox.SelectedIndex = 0
$form.Controls.Add($roleBox)
$y += 36

Add-Label '委託方 / 標註（client）' $y | Out-Null; $y += 22
$clientBox = New-Object Windows.Forms.ComboBox
$clientBox.Location = New-Object Drawing.Point(20, $y)
$clientBox.Size = New-Object Drawing.Size(230, 24)
@('Fan Art', 'Personal', 'Commission') | ForEach-Object { $clientBox.Items.Add($_) | Out-Null }
$clientBox.Text = 'Fan Art'
$form.Controls.Add($clientBox)

$lblYear = New-Object Windows.Forms.Label
$lblYear.Text = '年份'; $lblYear.AutoSize = $true
$lblYear.Location = New-Object Drawing.Point(270, ($y - 22))
$lblYear.ForeColor = [Drawing.Color]::FromArgb(239, 124, 163)
$form.Controls.Add($lblYear)
$yearBox = New-Box $y 220
$yearBox.Location = New-Object Drawing.Point(270, $y)
$yearBox.Text = (Get-Date).Year.ToString()
$y += 36

$heroChk = New-Object Windows.Forms.CheckBox
$heroChk.Text = '放進首頁幻燈片（hero）'
$heroChk.AutoSize = $true
$heroChk.Location = New-Object Drawing.Point(20, $y)
$form.Controls.Add($heroChk)
$y += 26

$pushChk = New-Object Windows.Forms.CheckBox
$pushChk.Text = '完成後自動 push 上線（GitHub Pages）'
$pushChk.Checked = $true
$pushChk.AutoSize = $true
$pushChk.Location = New-Object Drawing.Point(20, $y)
$form.Controls.Add($pushChk)
$y += 36

$btnGo = New-Object Windows.Forms.Button
$btnGo.Text = '新增作品'
$btnGo.Location = New-Object Drawing.Point(20, $y)
$btnGo.Size = New-Object Drawing.Size(470, 40)
$btnGo.BackColor = [Drawing.Color]::FromArgb(239, 124, 163)
$btnGo.ForeColor = [Drawing.Color]::FromArgb(27, 26, 31)
$btnGo.FlatStyle = 'Flat'
$form.Controls.Add($btnGo)

# ---------- 事件 ----------
$btnPick.Add_Click({
    $dlg = New-Object Windows.Forms.OpenFileDialog
    $dlg.Filter = '圖片 (*.jpg;*.jpeg;*.png;*.webp)|*.jpg;*.jpeg;*.png;*.webp'
    if ($dlg.ShowDialog() -eq 'OK') {
      $script:imgPath = $dlg.FileName
      $pathBox.Text = $dlg.FileName
      try {
        $picked = Open-ImageSafe $dlg.FileName
        $w = $picked.img.Width; $h = $picked.img.Height
        $picked.img.Dispose(); $picked.ms.Dispose()
        $script:isLandsc = ($w -gt ($h * 1.1))
        $kind = if ($script:isLandsc) { '橫圖 → 自動置中 focus:center' } else { '直圖 → 沿用偏上預設（顯示上半部）' }
        $lblInfo.Text = "$w x $h  ·  $kind"
        $lblInfo.ForeColor = [Drawing.Color]::FromArgb(150, 200, 150)
      }
      catch {
        $lblInfo.Text = '無法讀取圖片尺寸'; $lblInfo.ForeColor = [Drawing.Color]::Salmon
      }
    }
  })

$btnGo.Add_Click({
    if (-not $script:imgPath) { [Windows.Forms.MessageBox]::Show('請先選擇圖片'); return }
    if (-not $jaBox.Text.Trim()) { [Windows.Forms.MessageBox]::Show('請填寫日文標題'); return }

    try {
      # 1) 下一個編號
      $nums = Get-ChildItem $worksDir -File |
      Where-Object { $_.BaseName -match '^\d+$' } |
      ForEach-Object { [int]$_.BaseName }
      $max = ($nums | Measure-Object -Maximum).Maximum
      $next = [int]$max + 1
      $nn = '{0:D2}' -f [int]$next
      $destName = "$nn.jpg"   # 一律壓成 JPEG
      $dest = Join-Path $worksDir $destName
      $origKB = [int]((Get-Item $script:imgPath).Length / 1KB)
      $dim = Save-Compressed $script:imgPath $dest $MaxEdge $JpegQuality
      $newKB = [int]((Get-Item $dest).Length / 1KB)
      $imgField = "works/$destName"

      # 2) 組裝 works.js 物件
      $ja = Esc $jaBox.Text.Trim()
      $en = Esc $(if ($enBox.Text.Trim()) { $enBox.Text.Trim() } else { $jaBox.Text.Trim() })
      $zh = Esc $(if ($zhBox.Text.Trim()) { $zhBox.Text.Trim() } else { $jaBox.Text.Trim() })
      $cat = $cats[$catBox.SelectedItem.ToString()]
      $r = $roles[$roleBox.SelectedItem.ToString()]
      $client = Esc $clientBox.Text.Trim()
      $year = ($yearBox.Text.Trim() -replace '\D', '')
      if (-not $year) { $year = (Get-Date).Year.ToString() }

      $lines = @(
        '  {',
        ('    image: "' + $imgField + '",'),
        ('    category: "' + $cat + '",'),
        ('    title: { ja: "' + $ja + '", en: "' + $en + '", zh: "' + $zh + '" },'),
        ('    client: "' + $client + '",'),
        ('    role:  { ja: "' + (Esc $r[0]) + '", en: "' + (Esc $r[1]) + '", zh: "' + (Esc $r[2]) + '" },'),
        ('    year: ' + $year + ',')
      )
      if ($script:isLandsc) { $lines += '    focus: "center",' }
      if ($heroChk.Checked) { $lines += '    hero: true,' }
      $lines += '  },'

      $text = [IO.File]::ReadAllText($worksJs)
      $nl = if ($text -match "`r`n") { "`r`n" } else { "`n" }
      $entry = ($lines -join $nl) + $nl
      $idx = $text.LastIndexOf('];')
      if ($idx -lt 0) { throw 'works.js 找不到結尾的 "];"' }
      $newText = $text.Insert($idx, $entry)
      $enc = New-Object Text.UTF8Encoding($false)  # 無 BOM
      [IO.File]::WriteAllText($worksJs, $newText, $enc)

      # 3) git add / commit / push
      $log = New-Object Text.StringBuilder
      $null = $log.AppendLine("已新增：$imgField")
      $null = $log.AppendLine("壓縮：$origKB KB -> $newKB KB（$($dim.w)x$($dim.h)px）")
      $null = $log.AppendLine("分類：$cat   標題：$($jaBox.Text.Trim())")
      $null = $log.AppendLine('')

      Push-Location $root
      try {
        $null = $log.AppendLine((Invoke-Git @('add', '--', "works/$destName", 'assets/js/works.js')))
        $msg = "新增作品「$($jaBox.Text.Trim())」"
        $null = $log.AppendLine((Invoke-Git @('commit', '-m', $msg)))
        if ($pushChk.Checked) {
          $null = $log.AppendLine('')
          $null = $log.AppendLine('推送中…')
          $null = $log.AppendLine((Invoke-Git @('push')))
          $null = $log.AppendLine('')
          $null = $log.AppendLine('幾分鐘後 https://angelsetsuna.github.io/ 會更新。')
        }
        else {
          $null = $log.AppendLine('（已本機 commit，未 push）')
        }
      }
      finally { Pop-Location }

      [Windows.Forms.MessageBox]::Show($log.ToString(), '完成') | Out-Null

      # 清空，方便連續新增
      $jaBox.Clear(); $enBox.Clear(); $zhBox.Clear()
      $script:imgPath = $null; $pathBox.Clear()
      $lblInfo.Text = '尚未選圖'; $lblInfo.ForeColor = [Drawing.Color]::Gray
    }
    catch {
      $detail = "時間：" + (Get-Date).ToString('yyyy-MM-dd HH:mm:ss') + "`n`n" +
                "訊息：" + $_.Exception.Message + "`n`n" +
                "型別：" + $_.Exception.GetType().FullName + "`n`n" +
                "位置：" + $_.InvocationInfo.PositionMessage + "`n`n" +
                "堆疊：`n" + $_.ScriptStackTrace + "`n`n" +
                "完整：`n" + ($_ | Out-String)
      try { [IO.File]::WriteAllText($errLog, $detail, (New-Object Text.UTF8Encoding($true))) } catch {}
      [Windows.Forms.MessageBox]::Show("發生錯誤：`n$($_.Exception.Message)`n`n完整內容已存到：`ntools\last-error.log", '錯誤') | Out-Null
    }
  })

[void]$form.ShowDialog()
