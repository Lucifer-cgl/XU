@echo off
setlocal EnableExtensions
chcp 65001 >nul
cd /d "%~dp0"

echo [XU] 启动本地预览：http://127.0.0.1:5173/
echo 关闭此窗口即可停止预览；不会生成 dist，也不会推送或发布。
npm run preview:local

if errorlevel 1 (
  echo.
  echo 本地预览启动失败，请保留窗口中的错误信息。
  pause
  exit /b 1
)
