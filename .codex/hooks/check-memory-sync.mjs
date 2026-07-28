// PostToolUse hook：當編輯到「規則層級」檔案時，提醒 Claude 檢查記憶 / CLAUDE.md 是否需同步。
// 只對會影響規則的檔案發出提醒；改文案/資料（works.js 內單純加作品）不算規則變更，仍會提醒由 Claude 自行判斷。

let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (c) => { raw += c; });
process.stdin.on('end', () => { run(raw); });
// 保險：若無 stdin，1 秒後仍執行
setTimeout(() => { if (!raw) run(''); }, 1000);

let done = false;
function run(input) {
  if (done) return;
  done = true;

  let data = {};
  try { data = JSON.parse(input || '{}'); } catch {}

  const fp = (data.tool_input && (data.tool_input.file_path || data.tool_input.path)) || '';
  const norm = fp.replace(/\\/g, '/').toLowerCase();

  // 規則層級檔案：結構、渲染邏輯、樣式、部署/建置、上傳工具、專案規則
  const watch = [
    'assets/js/works.js',
    'assets/js/main.js',
    'assets/js/i18n.js',
    'assets/css/style.css',
    'build-standalone.mjs',
    'index.html',
    'tools/add-work.ps1',
    '新增作品.bat',
    'claude.md',
  ];

  if (watch.some((w) => norm.endsWith(w.toLowerCase()))) {
    const msg =
      '【記憶同步提醒】你剛改到奈奈畫圖網站的規則層級檔案（' + fp + '）。' +
      '請判斷是否需要同步更新：(1) 記憶檔 nana-website-overview / nana-website-add-work-tool / hero-slideshow-focus-top；' +
      '(2) 專案 CLAUDE.md。若只是改文案或單純新增一筆作品資料，通常不需要更新，可忽略此提醒。';
    process.stdout.write(
      JSON.stringify({
        hookSpecificOutput: { hookEventName: 'PostToolUse', additionalContext: msg },
      })
    );
  }
  process.exit(0);
}
