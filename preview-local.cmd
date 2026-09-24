@echo off
setlocal EnableExtensions
chcp 65001 >nul
cd /d "%~dp0"

echo [XU] 先生成与线上一致的 dist...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0build-dist.ps1"
if errorlevel 1 (
  echo.
  echo dist 生成失败，请保留窗口中的错误信息。
  pause
  exit /b 1
)

echo [XU] 启动 dist 本地预览：http://127.0.0.1:5175/
echo 关闭此窗口即可停止预览；不会推送或发布。
npm run preview -- --host 127.0.0.1 --port 5175 --open

if errorlevel 1 (
  echo.
  echo 本地预览启动失败，请保留窗口中的错误信息。
  pause
  exit /b 1
)
