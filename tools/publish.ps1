# 發布網站：把目前所有變更 commit 並 push 上線（給手動修改網站後使用）
$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
Set-Location $root

# 執行 git；git 把警告寫到 stderr，搭配 Stop + 2>&1 會被誤判成錯誤，故暫改 Continue 並濾掉換行警告
function Invoke-Git([string[]]$GitArgs) {
  $prev = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  try { $raw = & git @GitArgs 2>&1 }
  finally { $ErrorActionPreference = $prev }
  $lines = @($raw | ForEach-Object { $_.ToString() }) |
    Where-Object { $_ -notmatch 'will be replaced by (CRLF|LF)' }
  return ($lines -join "`n")
}

Write-Host ''
Write-Host '=== 發布網站 ===' -ForegroundColor Cyan

# 發布前先檢查 JavaScript 語法，避免空白網站被推送上線
foreach ($jsFile in @('assets/js/works.js', 'assets/js/i18n.js', 'assets/js/main.js')) {
  $prev = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  try { $syntaxOutput = & node --check $jsFile 2>&1; $syntaxExit = $LASTEXITCODE }
  finally { $ErrorActionPreference = $prev }
  if ($syntaxExit -ne 0) {
    Write-Host ''
    Write-Host ("無法發布：$jsFile 格式錯誤。") -ForegroundColor Red
    Write-Host (($syntaxOutput | ForEach-Object { $_.ToString() }) -join "`n")
    Read-Host '按 Enter 關閉'
    exit 1
  }
}

$changes = Invoke-Git @('status', '--porcelain')
if (-not $changes) {
  Write-Host '目前沒有任何變更，網站已是最新。' -ForegroundColor Green
  Read-Host '按 Enter 關閉'
  exit
}

Write-Host '以下變更將會發布上線：' -ForegroundColor Yellow
Write-Host $changes
Write-Host ''
$msg = Read-Host '輸入這次更新的說明（直接按 Enter 使用預設）'
if (-not $msg) { $msg = '更新網站 ' + (Get-Date).ToString('yyyy-MM-dd HH:mm') }

try {
  Invoke-Git @('add', '-A') | Out-Null
  Write-Host (Invoke-Git @('commit', '-m', $msg))
  Write-Host '推送中…' -ForegroundColor Cyan
  $pushOut = Invoke-Git @('push')
  Write-Host $pushOut
  Write-Host ''
  Write-Host '完成！幾分鐘後 https://angelsetsuna.github.io/ 會更新。' -ForegroundColor Green
}
catch {
  Write-Host ''
  Write-Host ('發生錯誤：' + $_.Exception.Message) -ForegroundColor Red
}
Read-Host '按 Enter 關閉'
