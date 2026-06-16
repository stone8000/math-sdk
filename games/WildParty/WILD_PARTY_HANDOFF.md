# Wild Party — 專案交接文件

> 最後更新：2026-06-14（Skill 總覽 `wild-party-skill-guide`、版控定稿）  
> 涵蓋範圍：math-sdk 數學後端 + `WildParty_Front` 前端 + Stake 上架素材  
> **Skill 路由：** `@wild-party-skill-guide`｜**交接：** `@WILD_PARTY_HANDOFF.md`

---

## 1. 專案目標（對話脈絡摘要）

使用者依 **遊戲規格圖** 與 **`game120_info`** 檔，在 Stake Engine math-sdk 內將範例遊戲改為 **Wild Party** 真實規格，並產出可上傳 Stake Engine 的數學產物。

之後新增 **`WildParty_Front`** 前端示範資料夾，要求：

1. 依 Wild Party 規格對接前端（符號先沿用範本風格，預留換美術／動畫空間）
2. 同步 math 輸出（config、books、events）
3. 接上 **全域倍數（Global Multiplier）**、retrigger、wincap 等事件
4. Storybook 改用真實 WildParty 牌局
5. UI 品牌與視覺對齊派對主題
6. 產生可上傳的靜態前端 bundle（`build/`）

最終使用者指示：**「照你設計的幫我搞定一切」** — 已完成符號美術接入、背景、品牌、賠付表／遊戲說明本地覆寫。

後續確認：**音效先用範本**即可上傳；並產出 Stake Engine **Thumbnail（背景）** 與 **Foreground（前景）** 上架用圖。

---

## 2. 遊戲規格（確認版）

### 2.1 基本架構

| 項目 | 值 |
|------|-----|
| Game ID | `WildParty` |
| Game Name（前端） | `wild_party` |
| 版面 | 5 軸 × 3 列 |
| 賠付線 | **35 條固定線**（由左至右） |
| RTP | **96%** |
| Max Win | **5000×** 總投注 |
| Bet Modes | `base`（cost 1×）、`bonus`（Buy Bonus 100×） |

### 2.2 符號（10 個）

| 代號 | 說明 | 美術主題（前端已接入） |
|------|------|------------------------|
| H1 | 高分 | 金色迪斯可球 |
| H2 | 高分 | 香檳開瓶 |
| H3 | 高分 | 粉紅雞尾酒 |
| H4 | 高分 | 禮物盒 |
| L1 | 低分 | 霓虹 A |
| L2 | 低分 | 霓虹 K |
| L3 | 低分 | 霓虹 Q |
| L4 | 低分 | 霓虹 J |
| W | Wild | 霓虹星 WILD |
| S | Scatter | 黑膠唱片 SCATTER |

> 規格原文（北極派對主題）在 `game_config.py` 註解仍有記載；前端美術已改為 **派對／夜店** 視覺，數學邏輯不變。

### 2.3 賠付表（總投注倍數）

來源：`library/configs/config_fe_WildParty.json` / `src/game/config.ts`

| 符號 | 3 連 | 4 連 | 5 連 |
|------|------|------|------|
| W | 1.5 | 15.4 | 46.3 |
| H1 | 0.8 | 7.7 | 23.1 |
| H2 | 0.8 | 3.9 | 11.6 |
| H3 | 0.3 | 1.3 | 3.9 |
| H4 | 0.3 | 1.0 | 3.1 |
| L1 | 0.2 | 0.7 | 2.1 |
| L2 | 0.2 | 0.5 | 1.5 |
| L3 | 0.1 | 0.3 | 0.7 |
| L4 | 0.1 | 0.3 | 0.5 |
| S | — | — | —（Scatter 不付線獎） |

### 2.4 特色玩法

**Wild（W）**
- 可替代除 Scatter 外所有符號

**Scatter（S）與免費遊戲**
- **3 個 Scatter** → 觸發 **5 次免費旋轉**
- 免費遊戲中再出現 **3 個 Scatter** → **Retrigger +5 次**

**全域倍數（Global Multiplier）— 本遊戲核心機制**
- 免費遊戲期間累積的全域倍數
- 起始值：觸發 Scatter 所在 **賠付線數**（上限 3）
- 免費遊戲中每出現一個 Wild → 倍數 **+1**
- 倍數上限：**100×**
- 前端事件：`updateGlobalMult`；結束免費遊戲時重置為 1

**Max Win（Wincap）**
- 單局累計達 **5000×** 總投注即封頂
- 前端事件：`wincap`

### 2.5 輪帶檔

| 檔名 | 用途 |
|------|------|
| `reels/BR0.csv` | Base game |
| `reels/FR0.csv` | Free game |
| `reels/FRWCAP.csv` | Wincap 強制情境 |

### 2.6 機率／模擬參數調整位置

**檔案：`run.py`**

```python
num_sim_args = {
    "base": int(1e4),    # base 模式模擬局數
    "bonus": int(5e4),   # bonus 模式模擬局數
}

run_conditions = {
    "run_sims": True,
    "run_optimization": True,
    "run_analysis": True,
    "run_format_checks": True,
}
```

**檔案：`game_config.py`**
- `self.paytable` — 賠付倍數
- `self.paylines` — 35 條線型
- `self.bet_modes` → `Distribution` 的 `quota` — 各 criteria 權重（wincap / freegame / 0 / basegame）
- `self.reels` — 輪帶表對應
- `self.freegame_mult_cap`、`self.freegame_start_mult_cap` — 倍數上下限

**快測結果位置**
- `library/stats_summary.json`
- `library/statistics_summary.json`
- `library/configs/books_*.verification.json`
- 優化輸出：`library/optimization_files/`

---

## 3. 目錄結構

```
games/WildParty/
├── WILD_PARTY_HANDOFF.md          ← 本文件
├── .gitignore                     ← node_modules / .svelte-kit 等
├── run.py                         ← 主執行：模擬、產書、產 config、優化、驗證
├── game_config.py                 ← 遊戲數學設定（規格源頭）
├── gamestate.py
├── game_optimization.py
├── game120_info_20250208_.py      ← 原始規格參考
├── design/                        ← ★ Stake 上架用 Thumbnail / Foreground
│   ├── thumbnail_wild_party.png   ← 環境背景（無文字）
│   └── foreground_wild_party.png  ← 前景主體（迪斯可球，透明 PNG）
├── reels/                         ← BR0.csv, FR0.csv, FRWCAP.csv
├── library/
│   ├── configs/
│   │   ├── config_fe_WildParty.json   ← 前端 config 來源
│   │   ├── event_config_base.json
│   │   ├── event_config_bonus.json
│   │   └── math_config.json
│   ├── publish_files/                 ← ★ 上傳 Stake Engine 的數學產物
│   │   ├── index.json
│   │   ├── books_base.jsonl.zst
│   │   ├── books_bonus.jsonl.zst
│   │   ├── lookUpTable_base_0.csv
│   │   └── lookUpTable_bonus_0.csv
│   ├── optimization_files/
│   └── lookup_tables/
└── WildParty_Front/               ← 前端（SvelteKit + Pixi）
    ├── build/                     ← ★ 上傳用的靜態前端 bundle
    ├── gen_config.py              ← math config → src/game/config.ts
    ├── gen_stories.py             ← math books → Storybook demo data
    ├── process_symbols.py         ← AI 符號圖 → 去背 PNG
    ├── fix_links.py               ← 修復搬移後的 pnpm symlink
    ├── static/assets/
    │   ├── sprites/wildPartySymbols/   ← 10 個符號 PNG
    │   └── sprites/wildPartyBackground/ ← base / feature 背景
    └── src/
        ├── game/                  ← config, constants, event handlers
        ├── components/            ← Game, Background, GlobalMultiplier…
        ├── components/ui/         ← 本地 Modals / PayTable / GameRules
        └── stories/data/          ← base_books, bonus_books, events
```

**關聯 monorepo（本機）**

| 路徑 | 說明 |
|------|------|
| `~/Stake_Engine/math-sdk` | 數學後端 |
| `~/Stake_Engine/web-sdk` | 前端框架與共享套件 |
| `web-sdk/packages/components-ui-html` | 共享 HTML UI（唯讀於 math-sdk workspace） |

---

## 4. 已完成工作清單

### 4.1 Math SDK（後端）

- [x] 依 `game120_info` 與規格圖改寫 `game_config.py`（35 線、10 符號、賠付表、免費遊戲、全域倍數邏輯）
- [x] 設定輪帶 `BR0` / `FR0` / `FRWCAP`
- [x] `run.py` 模擬量提高（base 1e4、bonus 5e4）
- [x] 產出 `library/publish_files/`（books、lookup、index）
- [x] 產出 `config_fe_WildParty.json`、`event_config_*.json`
- [x] 優化、分析、格式驗證流程可跑

### 4.2 前端 — 資料同步

- [x] `gen_config.py`：從 `config_fe_WildParty.json` 生成 `src/game/config.ts`（symbols 扁平化、`gameName = wild_party`）
- [x] `gen_stories.py`：從真實 books 抽樣生成 Storybook 資料（zero win / base win / freegame / retrigger / wincap）
- [x] 移除範例殘留符號引用（`L5`、`H5`）

### 4.3 前端 — 事件與狀態

- [x] `typesBookEvent.ts`：新增 `updateGlobalMult`、`freeSpinRetrigger`、`wincap`
- [x] `bookEventHandlerMap.ts`：實作上述 handler + `freeSpinEnd` 重置 `globalMultiplier`
- [x] `stateGame.svelte.ts`：新增 `globalMultiplier: 1`
- [x] `typesEmitterEvent.ts`：新增 `EmitterEventGlobalMultiplier`
- [x] `GlobalMultiplier.svelte` 接入 `Game.svelte`

### 4.4 前端 — 視覺與品牌

- [x] 遊戲標題／Logo 改為 **WILD PARTY**
- [x] `Background.svelte`：派對主題 base / feature 背景（`wildPartyBgBase`、`wildPartyBgFeature`）
- [x] **10 個符號美術**：AI 生成 → `process_symbols.py` 去棋盤格背景 → 256px 透明 PNG
- [x] `assets.ts`：註冊 `wpH1`…`wpS`
- [x] `constants.ts`：`SYMBOL_INFO_MAP` 改為純 sprite（中獎 1.12× pop；預留日後改 spine）
- [x] `winLevelMap.ts`：已對齊 5000× max win（無需改動）

### 4.5 前端 — 遊戲說明／賠付表

共享套件 `components-ui-html` 的 `ModalPayTable` / `ModalGameRules` 只有佔位文字，且位於 math-sdk workspace 外無法直接改。

**解法（已完成）：**
- [x] `src/components/ui/Modals.svelte` — 複用共享 modal，覆寫 PayTable / GameRules
- [x] `src/components/ui/ModalPayTable.svelte` — 動態讀 `config.symbols` + 符號圖
- [x] `src/components/ui/ModalGameRules.svelte` — Wild Party 規則全文
- [x] `Game.svelte` 改用本地 `Modals`

### 4.6 建置與環境

- [x] `fix_links.py`：修復 `WildParty_Front` 搬出 web-sdk 後斷掉的 pnpm symlink
- [x] `games/WildParty/.gitignore`：排除 `node_modules/`、`.svelte-kit/` 等
- [x] **Git 版控**：Wild Party 已納入 `math-sdk` repo（2026-06-13）
- [x] **遠端備份**：已 push 至 fork https://github.com/stone8000/math-sdk（remote 名稱 `mine`，2026-06-14）
- [x] **Stake 可玩確認**：上傳 `build/` 後 Play Game 正常（loader 修復後，使用者確認 2026-06-13）
- [x] `pnpm build` 成功 → `WildParty_Front/build/` 可上傳（**目前可玩版 build：2026-06-13 23:07**，commit `d0909df`）

### 4.7 Stake Engine 上架素材（Thumbnail / Foreground）

規格來源：**`stake-game-developer`** → `references/game-approval-checklist.md` → **Game Thumbnail** 區段。

- [x] **Background（環境背景）** — `design/thumbnail_wild_party.png`
  - 展現遊戲世界（霓虹派對大廳、迪斯可球、香檳、彩帶）
  - **無文字、無倍數**；整體明亮、鮮豔色調、邊緣避免過暗
- [x] **Foreground（前景主體）** — `design/foreground_wild_party.png`
  - 單一關鍵元素：**金色迪斯可球**（對應 H1／派對主視覺）
  - 放大填滿焦點區；**無文字、無倍數**
  - 1024×1024 透明 PNG（已 flood-fill 去除 AI 棋盤格背景）

> Thumbnail／Foreground **不在** `build/` 內，於 Stake Engine 後台 **另外上傳**（與 Frontend files 分開）。

### 4.8 尚未完成（需外部資源）

- [ ] **派對主題音效／BGM**（**目前沿用範本 `sounds.json`，使用者確認可先上傳**）
- [ ] **符號 spine 中獎動畫**（目前全狀態用 sprite；架構已預留）
- [ ] **web-sdk 共享套件層級**修改（若要把 PayTable/Rules 寫回共用庫而非 app 本地覆寫）

### 4.9 第二波前端優化（已實作後撤回）

2026-06-12 曾實作 WinLines、Wild 飛行減速、Loading 品牌化、按鈕 CSS 等，上傳後出現黑屏／無法遊玩，**已全部撤回**，恢復交接版（共享 `UI`、Spine Loading、`LoaderStakeEngine` 流程）。

| 項目 | 狀態 |
|------|------|
| WinLines / WildMultiplierFly / WildPartyUI | 已刪除 |
| `+layout.svelte` | 恢復 `LoaderStakeEngine` + `LoaderExample` |
| `LoadingScreen.svelte` | 恢復 Spine 範本 loader |
| `bookEventHandlerMap.ts` | lines 範本 + Wild Party 擴充（倍數、retrigger、wincap） |

> 若日後重做 UI 升級，**先開 git 分支**，每步 `pnpm build` + 本機／Stake 測試後再 commit。

### 4.10 上傳黑屏修復（2026-06-13）— 目前可玩版

**症狀：** Stake 後台 Play Game 全黑，中央破圖 `loader`。

**根因：** `+layout.svelte` 用 `new URL('../../stake-engine-loader.gif', import.meta.url)`；Stake 子路徑部署時 GIF 404 → 預載失敗 → 遊戲不掛載。

**修復：**

1. `src/routes/+layout.svelte` — 改用 `$app/paths` 的 `base`：`${base}/stake-engine-loader.gif`、`${base}/loader.gif`
2. `vite.config.js` — `base: './'`
3. 重建 `build/`，commit **`d0909df`**
4. **使用者確認**：Stake 後台 Play Game 可正常進入遊戲

**上傳：** 整包 `build/` 須含根目錄 `stake-engine-loader.gif`、`loader.gif`。

### 4.11 Git 遠端備份與 push（2026-06-14）

**遠端設定：**

| Remote | URL | 用途 |
|--------|-----|------|
| `origin` | `https://github.com/StakeEngine/math-sdk` | 官方上游（通常只 pull，勿 push） |
| `mine` | `https://github.com/stone8000/math-sdk` | **自己的 fork**，Wild Party 備份與 push 目標 |

**已 push 的 Wild Party commit（rebase 後 hash，以 `main` 為準）：**

| Commit | 說明 |
|--------|------|
| `42fda6d` | Baseline：math + 前端 + build |
| `d0909df` | Loader 子路徑修復（**可玩／可上傳版**） |
| `0f0af7c` | 交接文件 + 版控說明 |

**連結：**
- Repo：https://github.com/stone8000/math-sdk
- Wild Party 目錄：https://github.com/stone8000/math-sdk/tree/main/games/WildParty

**push 若被拒（遠端較新）：** 先 `git fetch mine` → `git rebase mine/main` → 再 push。

**push 若 HTTP 500（build 約 60MB）：**

```bash
git -c http.version=HTTP/1.1 -c http.postBuffer=524288000 push mine main
```

**Skill 版控規則：** Cursor `@stake-engine-local-dev` 已寫入「**每次改動必 commit**」；Agent 與接手者皆應遵守。

---

## 5. 常用指令

### 5.1 Math SDK

```bash
cd ~/Stake_Engine/math-sdk
source env/bin/activate

# 完整流程（模擬 + 產 config + 優化 + 分析 + 驗證）
python3 games/WildParty/run.py

# 上傳用數學產物
ls games/WildParty/library/publish_files/
```

**只看快測／統計：** 跑完 `run.py` 後查 `library/stats_summary.json`、`library/statistics_summary.json`。

**調機率：** 改 `game_config.py` 的 `Distribution.quota` 或輪帶 CSV，再重跑 `run.py`。

### 5.2 前端 — 同步 math 資料

```bash
cd ~/Stake_Engine/math-sdk/games/WildParty/WildParty_Front

# 1) 先確保 math 已跑過 run.py
python3 gen_config.py      # → src/game/config.ts
python3 gen_stories.py     # → src/stories/data/*
```

### 5.3 前端 — 符號美術更新

```bash
# 1) 將新 AI 原圖放到：
#    ~/.cursor/projects/Users-stone-Stake-Engine-math-sdk-games-WildParty/assets/
#    命名：sym_h1.png … sym_s.png（見 process_symbols.py 的 MAPPING）

# 2) 處理去背 + 正方形輸出
python3 process_symbols.py
# → static/assets/sprites/wildPartySymbols/*.png
```

### 5.4 前端 — 開發與建置

```bash
cd ~/Stake_Engine/math-sdk/games/WildParty/WildParty_Front

# 若 node_modules symlink 壞掉（搬移資料夾後）
python3 fix_links.py

# 開發
pnpm dev          # http://localhost:3001

# Storybook
pnpm storybook    # http://localhost:6001

# 建置（上傳用）
pnpm build
# 產物：./build/
```

### 5.5 Cursor 同時開 math + 前端

在 Cursor：**File → Add Folder to Workspace**，加入：
- `~/Stake_Engine/math-sdk`
- `~/Stake_Engine/web-sdk`（讀共享套件、必要時改 components-ui-html）

### 5.6 Git 版控（必做 — 每次改動都要 commit）

詳細規則見 Cursor skill **`stake-engine-local-dev`** →「版控（Git）— 必做」。

**硬性規則：**
1. **每次**改 math、前端、design、交接文件或 build → **必須 `git commit`**
2. commit 訊息須寫清 **改了什麼、為什麼改**
3. 改前端且要上傳 Stake → **先 `pnpm build`**，再 commit（含 `build/`）
4. 大改（UI／動畫實驗）→ **先開分支**，通過測試再 merge
5. 需要遠端備份 → `git push mine main`（勿 push 到官方 `origin`）

```bash
cd ~/Stake_Engine/math-sdk

git status
git diff games/WildParty/

# 若改前端且要上傳 Stake，先 build 再 commit
cd games/WildParty/WildParty_Front && pnpm build && cd ../../..

git add games/WildParty/
git commit -m "描述這次改了什麼、為什麼改"

git log --oneline games/WildParty/    # 查歷史

# 備份到自己的 fork（非官方 origin）
git fetch mine
git rebase mine/main                # 若 push 被拒再做
git -c http.version=HTTP/1.1 -c http.postBuffer=524288000 push mine main
```

**還原 Wild Party 到可玩版：**

```bash
git checkout d0909df -- games/WildParty/
```

**大改前開分支：**

```bash
git checkout -b feature/ui-v2
# …改完測試通過…
git checkout main && git merge feature/ui-v2
```

| Commit | 說明 |
|--------|------|
| `42fda6d` | Baseline：math + 前端 + build |
| `d0909df` | **可玩／可上傳版**（loader 子路徑 + vite base） |
| `0f0af7c` | 交接文件 + 版控說明 |

**遠端：** https://github.com/stone8000/math-sdk（`mine`）

**不會被 git 追蹤：** `library/`（重跑 `run.py`）、`node_modules/`、`.svelte-kit/`。

---

## 6. 關鍵檔案對照表

### Math

| 檔案 | 用途 |
|------|------|
| `game_config.py` | 賠付、線型、輪帶、bet mode、免費遊戲、倍數規則 |
| `run.py` | 模擬量、是否跑優化／分析 |
| `reels/*.csv` | 輪帶表 |
| `library/publish_files/` | **上傳數學** |
| `library/configs/config_fe_WildParty.json` | 前端 config 來源 |

### Frontend

| 檔案 | 用途 |
|------|------|
| `src/game/config.ts` | 前端遊戲參數（由 gen_config 生成，勿手改） |
| `src/game/constants.ts` | 符號渲染 `SYMBOL_INFO_MAP`、盤面尺寸 |
| `src/game/assets.ts` | 所有資產路徑（符號、背景、spine、音效） |
| `src/game/bookEventHandlerMap.ts` | Book 事件 → UI／音效／動畫 |
| `src/game/stateGame.svelte.ts` | `globalMultiplier` 等狀態 |
| `src/components/Game.svelte` | 主場景 |
| `src/components/Background.svelte` | 派對背景 |
| `src/components/GlobalMultiplier.svelte` | 倍數徽章 |
| `src/components/WinLines.svelte` | 中獎線圖繪製（PixiJS Graphics） |
| `src/components/ui/Modals.svelte` | 本地 modal 組合 |
| `src/components/ui/ModalPayTable.svelte` | 賠付表 |
| `src/components/ui/ModalGameRules.svelte` | 遊戲規則 |
| `static/assets/sprites/wildPartySymbols/` | 符號 PNG |
| `static/assets/sprites/wildPartyBackground/` | 背景 PNG |
| `src/routes/+layout.svelte` | Loader 路徑（`${base}/stake-engine-loader.gif`） |
| `vite.config.js` | `base: './'`（Stake 子路徑部署） |
| `build/` | **上傳前端** |

### 上架素材（Stake 後台，非 build 內）

| 檔案 | 用途 |
|------|------|
| `design/thumbnail_wild_party.png` | Thumbnail **Background**（環境） |
| `design/foreground_wild_party.png` | Thumbnail **Foreground**（迪斯可球，1024² 透明） |

### 工具腳本

| 腳本 | 用途 |
|------|------|
| `gen_config.py` | math JSON → `config.ts` |
| `gen_stories.py` | math books → Storybook 資料 |
| `process_symbols.py` | AI 圖去背 → 符號 sprite |
| `fix_links.py` | 修復 pnpm workspace symlink |

---

## 7. 前端架構說明（給後續接手）

### 7.1 無狀態原則

前端 **不自行計算結果**，只播放 math-sdk 產生的 **Book Event 串流**：
`reveal` → `winInfo` → `freeSpinTrigger` → `updateGlobalMult` → … → `wincap`

### 7.2 符號渲染

目前 **全部狀態**（`static` / `spin` / `land` / `win` / `postWinStatic`）都用 **sprite**。

日後要加 spine 動畫：在 `constants.ts` 的 `SYMBOL_INFO_MAP` 把對應狀態的 `type` 改回 `'spine'`，並在 `assets.ts` 保留 spine 定義即可（範本 spine 仍在 repo 內）。

### 7.3 本地 Modals 覆寫原因

`components-ui-html` 匯出的 `Modals` 只接受 `version` snippet，PayTable / GameRules 內容寫死為佔位字。

本地 `src/components/ui/Modals.svelte` 透過深層 import 重用其他共享 modal，只替換 PayTable / GameRules。Modal 名稱仍為 `payTable`、`gameRules`，與原 UI 按鈕相容。

### 7.4 process_symbols.py 去背原理

AI 生成圖為 **RGB + 烤進去的淺灰棋盤格**（無真 alpha）。腳本：
1. 縮到 512px 工作尺寸
2. 從邊界 flood-fill 移除「淺灰、低彩度」背景像素
3. 依 alpha bbox 裁切、置中到 256px 透明畫布

參數：`GRAY_TOL = 22`、`LIGHT_MIN = 165`（在 `process_symbols.py` 可調）。

Foreground 去背使用相同 flood-fill 邏輯（見對話中一次性處理腳本；可併入 `process_symbols.py` 若需常態化）。

---

## 8. 上傳 Stake Engine（完整對照）

Stake Engine 後台通常有 **三個獨立上傳欄位**：Math、Frontend、Thumbnail（含 Background／Foreground 分層）。

### 8.1 數學（RGS / Math）

**上傳 `publish_files/` 資料夾內的全部檔案：**

```
games/WildParty/library/publish_files/
├── index.json
├── books_base.jsonl.zst
├── books_bonus.jsonl.zst
├── lookUpTable_base_0.csv
└── lookUpTable_bonus_0.csv
```

改過 math 後重跑：`python3 games/WildParty/run.py`

### 8.2 前端（Frontend files）

**上傳 `build/` 資料夾「裡面」的全部內容**（不是上傳 `build` 資料夾本身）：

```
games/WildParty/WildParty_Front/build/
├── index.html              ← 必須有
├── favicon.svg
├── loader.gif
├── stake-engine-loader.gif
├── _app/                   ← JS/CSS bundle（整包）
└── assets/                 ← 圖、音、spine、字體（整包，約 61MB）
```

本機絕對路徑：
`/Users/stone/Stake_Engine/math-sdk/games/WildParty/WildParty_Front/build/`

改過前端後重建：

```bash
cd ~/Stake_Engine/math-sdk/games/WildParty/WildParty_Front
pnpm build
```

建置後確認：
- `build/assets/sprites/wildPartySymbols/` 有 10 個 PNG
- `build/assets/sprites/wildPartyBackground/` 有 `bg_base.png`、`bg_feature.png`

> **注意：** `pnpm build | tail` 可能因 esbuild 子進程而看似卡住；以 `build/index.html` 時間戳或 `pnpm build > build_log.txt 2>&1` 確認即可。

### 8.3 Thumbnail（遊戲封面／大廳 Tile）

**對應 Skill：** `stake-game-developer` → `references/game-approval-checklist.md`

| 後台欄位 | 檔案 | 說明 |
|----------|------|------|
| **Background** | `design/thumbnail_wild_party.png` | 環境場景；明亮鮮豔；**無文字、無倍數** |
| **Foreground** | `design/foreground_wild_party.png` | 單一主體（迪斯可球）；透明底；**無文字、無倍數** |

審核要點（摘自 checklist）：
- Tile 整體要亮，邊緣不要太暗（避免與 Stake 大廳背景衝突）
- 背景圖明亮、符合遊戲主題
- 前景主體清楚，焦點區域填滿
- 漸層色與背景相近（若後台有 Gradient 欄位）
- 遊戲標題由後台設定，**不要畫在 thumbnail 圖上**

若要重做前景主體（香檳瓶、WILD 星等），可請 Agent 依相同規格重新生成並去背。

### 8.4 上傳快速對照表

| 上傳項目 | 本機路徑 | 何時重建 |
|---------|---------|---------|
| **數學** | `library/publish_files/*` | 改 `game_config.py` / 輪帶後 `run.py` |
| **前端** | `WildParty_Front/build/*` | 改前端後 `pnpm build` |
| **Thumbnail 背景** | `design/thumbnail_wild_party.png` | 換美術時重做 |
| **Thumbnail 前景** | `design/foreground_wild_party.png` | 換主體時重做 |

---

## 9. 曾遇到的問題與解法

| 問題 | 解法 |
|------|------|
| `config_fe` 的 `symbols` 是 list 不是 dict | `gen_config.py` 扁平化成 object |
| 缺少 `updateGlobalMult` 等 handler → console error | 補 `typesBookEvent` + `bookEventHandlerMap` |
| `INITIAL_BOARD` 引用不存在的 `L5` | 改為 WildParty 有效符號 |
| `WildParty_Front` 搬出 web-sdk 後 build 失敗 | 執行 `fix_links.py` |
| **Stake Play Game 黑屏、破圖 loader** | `+layout.svelte` 改用 `${base}/stake-engine-loader.gif`；`vite.config.js` 設 `base: './'`；整包上傳 `build/`；commit `d0909df` |
| 改壞無法還原 | 2026-06 前未 commit；現已納入 git + push 至 `mine`，見 §5.6、§4.11 |
| `git push` 被拒（fetch first） | `git fetch mine` → `git rebase mine/main` → 再 push |
| `git push` HTTP 500（~60MB build） | `git -c http.version=HTTP/1.1 -c http.postBuffer=524288000 push mine main` |
| 無法寫入 `web-sdk/apps/WildParty`（sandbox） | 在 math-sdk 內維護 `WildParty_Front` |
| AI 符號圖無真透明通道 | `process_symbols.py` flood-fill 去棋盤格 |
| `components-ui-html` 無法在工作區修改 | app 內本地 `Modals` + PayTable/Rules 覆寫 |
| `pnpm build \| tail` 看似卡住 | esbuild 子進程；看 `build/` 時間戳或寫 log 檔；手動 kill 卡住的 build 進程 |
| 滾動中與靜止中的 rows 座標映射有 offset | 使用 book 事件帶來的 `win.positions` 進行直接映射，不額外依賴 row 偏移 |
| 前端 framework 預載的 Spine 資源 `loader` 導致 Loading 頁卡住 | 維持範本 Spine LoadingScreen；勿在未測子路徑部署前改 Loader 流程 |

---

## 10. 建議後續步驟

### 優先級 A — 換音效

1. 音檔放入 `static/assets/audio/`
2. 編輯 `static/assets/audio/sounds.json`
3. 建議事件鍵：

```
sfx_spin, sfx_reel_stop_1..5, sfx_scatter_stop_1..5,
sfx_win_line, sfx_winlevel_small/big/mega/end,
sfx_freespin_intro, sfx_global_mult_up, sfx_retrigger,
bgm_base (loop), bgm_freegame (loop)
```

4. `pnpm build` 重新打包

### 優先級 B — 符號 spine 動畫

1. 美術／動畫師產出 spine（或沿用範本 spine 換貼圖）
2. 只改 `SYMBOL_INFO_MAP` 的 `win` / `land` 狀態
3. Storybook `ComponentsSymbol` 驗證各狀態

### 優先級 C — 數學再調

1. 改 `game_config.py` 或輪帶 CSV
2. `python3 run.py`
3. `gen_config.py` + `gen_stories.py`
4. 前端 rebuild

### 優先級 D — 併回 web-sdk monorepo（可選）

若希望與官方 pipeline 一致，可將 `WildParty_Front` 內容同步到 `web-sdk/apps/WildParty/`，在 monorepo 內 `pnpm build --filter=WildParty`。

---

## 11. 對話請求時間線（簡表）

| 階段 | 使用者請求 | 完成內容 |
|------|------------|----------|
| 1 | 依規格圖 + game120_info 改 math，產上傳檔 | `game_config.py`、`run.py`、library 產物 |
| 2 | 提高模擬量、說明調參與快測位置 | `run.py` num_sim_args、stats 路徑說明 |
| 3 | 確認遊戲規格玩法 | 35 線、Scatter、免費遊戲、全域倍數、5000× |
| 4 | WildParty_Front 前端對接 | config、events、handlers、build |
| 5 | Storybook 真實資料、全域倍數、品牌 | gen_stories、GlobalMultiplier、WILD PARTY |
| 6 | 配合規格設計視覺 | 背景、概念圖、winLevel 確認 |
| 7 | 照設計搞定一切 | 10 符號美術、PayTable/Rules、重建 build |
| 8 | 彙整 MD 交接 | `WILD_PARTY_HANDOFF.md` |
| 9 | 上傳哪些前端檔？音效先用範本 | 說明 `build/*` 上傳方式；math `publish_files/` |
| 10 | 產 Thumbnail | `design/thumbnail_wild_party.png`（環境、無文字） |
| 11 | 產 Foreground | `design/foreground_wild_party.png`（迪斯可球、透明、無文字） |
| 12 | 更新交接文件 | 補上傳／Thumbnail 章節 |
| 13 | 第二波前端升級規劃 | 完成規格確認、設計一條條連線/飛行減速/Loading優化/按鈕美化計畫並獲得確認 |
| 14 | 第二波前端升級實作 | 已撤回（黑屏）；恢復交接版 |
| 15 | Git baseline + loader 修復 | `42fda6d`、`d0909df`；Stake 可玩 |
| 16 | 版控寫入 skill + 更新交接 | `stake-engine-local-dev`、§4.10 / §5.6 |
| 17 | push 至 fork | `git rebase mine/main`；push `mine` → stone8000/math-sdk |
| 18 | 定稿版控流程 | 每次改動必 commit；§4.11、skill 更新 |
| 19 | Skill 總覽 skill | `wild-party-skill-guide`；§12 更新 |

---

## 12. 相關 Skill（Cursor）

**Skill 總覽（該 @ 哪一個？）：** `@wild-party-skill-guide`  
依任務選 skill 的決策表、常見情境指令、本專案教訓，都寫在該 skill 內。

繼續開發時建議組合：

| 優先 | Skill | 用途 |
|------|-------|------|
| ★ | `wild-party-skill-guide` | **Skill 路由總覽**（不確定時先看） |
| ★ | `WILD_PARTY_HANDOFF.md` | 專案現況、路徑、坑、上傳 |
| ★ | `stake-engine-local-dev` | 本機指令、**每次改動必 commit**、push `mine` |
| | `stake-engine-casino-development` | Stake 端到端交付總覽 |
| | `stake-game-developer` | RGS、replay、上架檢查、Thumbnail 規格 |
| | `senior-game-math-engineer` | RTP、輪帶、`game_config.py` |
| | `book-generator` | books / lookup / index |
| | `pixi-svelte-integrator` | Pixi + Svelte 渲染與生命週期 |
| | `slot-ui-studio` | UI 架構、Modals 本地覆寫 |
| | `event-animation-designer` | 連線／飛行／Loading 動效（先開分支） |
| | `slot-qa-engineer` | 測試與回歸 |

---

## 13. 快速健康檢查

```bash
# Math：publish_files 存在且 index.json 有效
ls games/WildParty/library/publish_files/index.json

# Git：Wild Party 有 commit 歷史
cd ~/Stake_Engine/math-sdk && git log --oneline -3 games/WildParty/

# Frontend：符號與 build
ls games/WildParty/WildParty_Front/static/assets/sprites/wildPartySymbols/*.png | wc -l
# 應為 10

cd games/WildParty/WildParty_Front && pnpm build
ls build/index.html
ls build/stake-engine-loader.gif build/loader.gif

# Thumbnail 素材
ls games/WildParty/design/thumbnail_wild_party.png
ls games/WildParty/design/foreground_wild_party.png
```

---

*本文件由 Cursor Agent 依多輪對話與實際程式變更整理，供後續接手或在新對話中 `@WILD_PARTY_HANDOFF.md` 繼續開發。*
