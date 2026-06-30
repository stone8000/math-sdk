#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# Wild Party — 本機一鍵重建腳本
# 用途：pull 最新原始碼 → pnpm build → 確認 build/ 是「剛剛」產生的
# 必須在「有 web-sdk monorepo」的本機跑（~/Stake_Engine/...），
# 單獨 clone 的 math-sdk 因缺 workspace:* 相依無法 build。
#
# 用法：
#   cd ~/Stake_Engine/math-sdk/games/WildParty
#   bash rebuild_and_check.sh
# ─────────────────────────────────────────────────────────────
set -euo pipefail

# 腳本所在目錄 = games/WildParty
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$HERE/../.." && pwd)"
FRONT="$HERE/WildParty_Front"
BUILD="$FRONT/build"

echo "▶ repo  : $REPO_ROOT"
echo "▶ front : $FRONT"
echo

# 0) 防呆：確認這是完整 monorepo（單獨 clone 沒有 web-sdk → 不能 build）
if [ ! -d "$REPO_ROOT/../web-sdk" ] && [ ! -d "$FRONT/node_modules" ]; then
  echo "✖ 找不到 web-sdk（../web-sdk）也沒有 node_modules。"
  echo "  這看起來是『單獨 clone 的 math-sdk』，缺 workspace:* 相依，無法 build。"
  echo "  請在 ~/Stake_Engine/ 的完整 monorepo 內執行本腳本。"
  exit 1
fi

# 1) 拉最新原始碼（fork = origin / 文件中的 mine）
echo "▶ [1/4] git pull origin main ..."
git -C "$REPO_ROOT" pull origin main

# 2) 確保 pnpm symlink 沒壞（搬移資料夾後常壞）
echo "▶ [2/4] 修復 pnpm symlink（fix_links.py）..."
( cd "$FRONT" && python3 fix_links.py ) || echo "  (fix_links 跳過/非必要)"

# 3) build
echo "▶ [3/4] pnpm build ..."
( cd "$FRONT" && pnpm build )

# 4) 驗證 build 是剛剛產生的、且必要檔案齊全
echo "▶ [4/4] 驗證 build/ ..."
fail=0
check() { if [ -e "$1" ]; then echo "  ✔ $2"; else echo "  ✖ 缺少 $2 ($1)"; fail=1; fi; }

check "$BUILD/index.html"               "index.html"
check "$BUILD/stake-engine-loader.gif"  "stake-engine-loader.gif"
check "$BUILD/loader.gif"               "loader.gif"
check "$BUILD/_app"                      "_app/ bundle"
check "$BUILD/assets"                    "assets/"

# 符號 / 背景 / spine 數量
sym=$(ls "$BUILD"/assets/sprites/wildPartySymbols/*.png 2>/dev/null | wc -l | tr -d ' ')
echo "  • 符號 PNG：$sym（應為 10）"
[ "$sym" = "10" ] || { echo "    ⚠ 符號數量不符"; fail=1; }

# index.html 是否在最近 5 分鐘內更新（= 確實重建過）
if [ -f "$BUILD/index.html" ]; then
  now=$(date +%s); mod=$(date -r "$BUILD/index.html" +%s); age=$(( now - mod ))
  echo "  • index.html 更新於 ${age}s 前"
  [ "$age" -lt 300 ] || echo "    ⚠ build/index.html 不是剛剛產生的，build 可能沒成功重跑"
fi

echo
if [ "$fail" = "0" ]; then
  echo "✅ build/ 完整且為新版。上傳對象："
  echo "   $BUILD/   ← 上傳『裡面』全部內容到 Stake 後台 Frontend files"
  echo
  echo "下一步："
  echo "   1) cd $FRONT && pnpm dev   # localhost:3001 開 modal 驗收新 UI"
  echo "   2) 上傳 build/ → Stake Play Game 確認不黑屏"
  echo "   3) git add games/WildParty/WildParty_Front/build && git commit -m 'rebuild build/' && git push origin main"
else
  echo "✖ build/ 有問題，請看上方 ⚠/✖ 訊息。"
  exit 1
fi
