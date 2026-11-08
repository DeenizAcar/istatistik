# pdf.html sayfasını Edge (yoksa Chrome) ile A4 PDF'e basar.
# Kullanım: powershell -ExecutionPolicy Bypass -File tools\make-pdf.ps1
$root = Split-Path -Parent $PSScriptRoot
$out = Join-Path $root 'Istatistik-Vize-Tekrar.pdf'
$page = 'file:///' + ((Join-Path $root 'pdf.html') -replace '\\', '/')
$browsers = @(
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe"
)
$exe = $browsers | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $exe) { throw 'Edge ya da Chrome bulunamadı.' }
$profile = Join-Path $env:TEMP 'istvize-pdf-profile'
if (Test-Path $out) { Remove-Item $out -Force }
& $exe --headless=new --disable-gpu --no-first-run --user-data-dir="$profile" `
  --no-pdf-header-footer --run-all-compositor-stages-before-draw --virtual-time-budget=30000 `
  --print-to-pdf="$out" $page | Out-Null
$deadline = (Get-Date).AddSeconds(60)
while (-not (Test-Path $out) -and (Get-Date) -lt $deadline) { Start-Sleep -Milliseconds 500 }
if (Test-Path $out) { "PDF hazır: $out ($([math]::Round((Get-Item $out).Length / 1KB)) KB)" } else { throw 'PDF oluşturulamadı.' }
