# Wild Party — 專案交接文件

> 最後更新：2026-07-01（連線節奏/FreeGame Turbo/AutoSpin 選中辨識調整）  
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

### 4.12 第三波前端升級（2026-06-17）— feature 分支

**分支：** `feature/front-v2-winlines-loading-buttons`（基於 `83f6ee2` main）

本次吸取第二波教訓：先開分支、每步 build 確認、不動 `+layout.svelte` loader 流程。

#### WinLines 連線動畫（已完成）

- [x] `WinLines.svelte`：新元件，中獎時畫出完整 payline 路徑
  - 使用 `config.paylines` 定義，每條線穿過全部 5 reel（不只 winning positions）
  - 多層 glow 渲染：8px 外光 → 5px 中光 → 2.5px 核心 → 1px 白色高光
  - 35 色霓虹色盤，一條一條依序出現（500ms stagger），全顯後 hold 800ms
  - 先畫線 → 再跑符號 win 動畫 → 最後清線
- [x] `typesEmitterEvent.ts`：新增 `EmitterEventWinLines` 類型
- [x] `bookEventHandlerMap.ts`：`winInfo` 事件觸發 `winLinesShow` → 動畫 → `winLinesHide`
- [x] `Game.svelte`：接入 `<WinLines />`

#### Global Multiplier 一顆一顆打（已完成）

- [x] `bookEventHandlerMap.ts`：`updateGlobalMult` 改為逐一 +1 遞增
  - 每次 +1 觸發 Spine `increment` 動畫 + 音效
  - 間隔 **700ms**，節奏緩慢有戲劇感
  - 重置（回 1）仍走 `reset` 動畫一次完成

#### Loading Screen 品牌化（已完成）

- [x] `LoadingScreen.svelte`：替換範本 Spine loader 畫面
  - 暗色背景 + 「WILD PARTY」霓虹大標題 + 副標
  - 細長紫色進度條（動態 animatedProgress）
  - **保留 `+layout.svelte` 的 `LoaderStakeEngine` / `LoaderExample` GIF 不動**（避免黑屏）
  - PressToContinue + TransitionAnimation 流程不變

#### 按鈕與 Modal 高級感 CSS（已完成）

- [x] `Modals.svelte` 全域 CSS 覆寫：
  - `.rectangle`（BaseIcon）：深紫漸層 + 霓虹邊框 + glow 陰影
  - `.button:hover .rectangle`：增亮邊框 + 加深 glow
  - `.button:active .rectangle`：內凹效果
  - `.ui-popup-standard-content-wrap`：深紫毛玻璃面板 + 圓角
  - `.close-button`：紫色 glow hover 效果
  - scrollbar / input / select 統一深色紫邊風格

#### 穩定性保證

- `+layout.svelte` **完全未動**（LoaderStakeEngine + LoaderExample + `${base}/` 路徑）
- `vite.config.js` **完全未動**（`base: './'`）
- `pnpm build` 成功、`build/` 含所有必要檔案
- Pixi 渲染管線無改動（符號、背景、Board、Spine preload 不變）

#### web-sdk UiSprite 修改（按鈕外觀）

**檔案：** `~/Stake_Engine/web-sdk/packages/components-ui-pixi/src/components/UiSprite.svelte`

由原始的黑色 `Rectangle borderRadius={50}` 改為：
- `backgroundColor: 0x1a0033`（深紫）
- `borderWidth: 1.5`
- `borderColor: 0x8833cc`（紫色邊框）
- `borderRadius: 12`

> ⚠️ 此修改位於 web-sdk（symlink target），會影響所有使用同一 web-sdk 的專案。若日後需要還原：恢復為 `<Rectangle borderRadius={50} {...props} />`。

#### 自定義 BGM

- `static/assets/audio/background.mp3`：base game 循環播放
- `Sound.svelte`：用 HTMLAudioElement 獨立播放（不走 sprite 系統）
- 免費遊戲切回 sprite 系統的 `bgm_freespin`
- 回到 base 自動恢復 `background.mp3`

#### Commits

| Commit | 說明 |
|--------|------|
| `2a161e7` | 初版：WinLines + Loading + CSS + GlobalMult 450ms |
| `019ee36` | 修正：payline完整路徑、CSS對準實際class、乘倍700ms |
| `d4cdfcd` | 接入自定義BGM (background.mp3) |
| `866582f` | 品質提升：UI按鈕紫色邊框、符號放大、Loading背景圖、Buy Bonus描述 |

#### Merge 回 main 前

1. 本機 `pnpm dev` 確認連線/乘倍/Loading/按鈕視覺正常
2. 上傳 `build/` 到 Stake 後台 → Play Game 確認不黑屏
3. `git checkout main && git merge feature/front-v2-winlines-loading-buttons`
4. `git push mine main`

### 4.13 第四波修正（2026-06-22）— buy bonus / info 頁 / loader（同 feature 分支）

延續 `feature/front-v2-winlines-loading-buttons` 分支。三個獨立修正：

#### Buy Bonus 只留 100x（commit `aa5c393`）

- **症狀：** buy bonus 畫面出現多個購買選項（ANTE / SUPER ANTE / SUPER SPIN / SUPER BONUS 200x…），但只有 **100x BONUS** 能正常遊玩，其餘點了無法進場。
- **根因：** 共享庫 `state-shared/src/constants.ts` 的 `DEFAULT_BET_MODE_META` 是「範本」預設，內含 6 個模式；`Authenticate.svelte` **不會**從 RGS 回寫 `betModeMeta`，所以 buy bonus 永遠顯示這 6 個範本模式。但 Wild Party math 只產 `base` + `bonus(100x)` 兩種模式 → 其他模式無對應 math。
- **修復：** 新增 `src/game/betModeMeta.ts`（`WILD_PARTY_BET_MODE_META` 只含 `BASE` + `BONUS` 100x，cost 取自 `config.betModes`），在 `src/game/context.ts` 的 `setContext()` 設 `stateMeta.betModeMeta = WILD_PARTY_BET_MODE_META`。**不改共享庫**（避免影響其他遊戲）。
- 之後若 math 新增模式（如真的做 ANTE / SUPER），需同步更新此 override。

#### Info 頁可滾動 + 補完內容（commit `7a59929`）

- **症狀：** GameRules / PayTable（info 頁）內容看起來不完整，且**無法下拉滾動**。
- **根因（滾動）：** 共享 `Popup.svelte` 內有一層全螢幕 `.click-to-close-layer`（`position:absolute; z-index:2`）。我們本地的 `.wp-rules` / `.wp-paytable` 是 `.top-layer` 的 flex 子項但**沒設 z-index**，被關閉層蓋住 → 滾輪/觸控事件被攔截、且點內容會誤觸關閉。共享 modal 用的 `BaseContent` 是靠 `z-index:100` 浮起（flex 子項即使 static 也吃 z-index）。
- **修復（滾動）：** 兩個容器加 `position:relative; z-index:100`，並加 `-webkit-overflow-scrolling:touch; overscroll-behavior:contain`，寬度改 `min(36rem, 90vw)`。
- **修復（內容）：** 依 `game_config.py` 補正規則：5×3 / 35 線、Scatter 僅出現於第 3-5 軸、3 Scatter → 5 次免費遊戲、retrigger +5、全域倍數 1-3 起始每顆 Wild +1 上限 100x、Buy Bonus 100x、max win 動態取自 config。
- 已比對符號美術，PayTable 標籤正確：H1=Disco Ball、H2=Champagne、H3=Cocktail、H4=Gift（與 `static/assets/sprites/wildPartySymbols/*.png` 一致）。

#### 簡單的 Wild Party Loader（commit `b667754`）

- **症狀：** 「好像還沒有 loader」。
- **根因：** `+layout.svelte` 中間那層用的是 web-sdk 範本元件 `LoaderExample`，會顯示「**Add Your Loader**」佔位字樣 → 等同沒有真正 loader。
- **修復：** 新增 `src/components/WildPartyLoader.svelte`（純 CSS：深色漸層底 + 旋轉圈 + 「WILD PARTY」漸層標題 +「LOADING…」，顯示約 1.6s 後淡出，**不依賴 gif**），在 `+layout.svelte` 取代 `LoaderExample`，並移除不再需要的 `loader.gif` 引用。
- **保留：** `LoaderStakeEngine`（Stake 品牌開場）、Pixi `LoadingScreen`（進度條主畫面）。載入順序：Stake 品牌 → Wild Party CSS loader → Pixi 載入畫面。

#### Commits

| Commit | 說明 |
|--------|------|
| `aa5c393` | buy bonus 只保留 100x BONUS（betModeMeta override） |
| `7a59929` | info 頁可滾動 + 規則/賠付內容補完 |
| `b667754` | 簡單的 Wild Party CSS loader 取代範本佔位 |

### 4.14 第五波更新（2026-06-30）— WildParty 符號 Spine 中獎動畫

本次目標：讓中獎符號不是靜態 sprite，而是確實走 Spine 動畫。

- [x] 新增 `static/assets/spines/wildPartySymbols/`（`h1~h4`、`l1~l4`、`w`、`s`）
  - 每個符號包含 `.png + .atlas + .json`
  - 每份 spine json 內含 `idle` / `win` 動畫
- [x] `src/game/assets.ts` 註冊 `wpSpH1~wpSpS`（對應上述新 spine）
- [x] `src/game/constants.ts` 調整 `SYMBOL_INFO_MAP`
  - `static/spin/land/postWinStatic` 維持 WildParty PNG sprite
  - `win` 改用 `type: 'spine'` + `animationName: 'win'`
- [x] 前端重新 build，`build/` 產物已含 `assets/spines/wildPartySymbols/*`

相關 commit（main）：

| Commit | 說明 |
|--------|------|
| `caa5422` | 接入 WildParty 生成 Spine、切換 win 狀態走 spine、更新 build 產物 |

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

### 4.15 第六波更新（2026-06-30）— 報獎回退 + TURBO 狀態色強化

- [x] **報獎動畫回復原版流程**
  - 移除自訂主題化報獎（gift / cocktail / champagne / disco ball）顯示層
  - `Win.svelte` 回復為原本 big win spine 動畫流程
  - `FreeSpinOutro.svelte` 回復為原本數字 spine (`fsOutroNumber`) 流程
  - 刪除 `WinThemeShowcase.svelte`
- [x] **TURBO 開關色彩強化（更容易辨識）**
  - OFF：深灰按鈕底 + 淺灰閃電
  - ON：橘色按鈕底 + 白色閃電（高對比）
- [x] 前端重建並同步 `WildParty_Front/build/`（可直接上傳 Stake）

### 4.16 第七波更新（2026-06-30）— HTML UI 高級感升級（統一派對設計系統）

目標：把所有 **HTML 層 UI**（共享 modals + 本地 PayTable/Rules）統一成一套高級感的「派對」設計系統。

**範圍說明（重要）：** 底部主控制列的 spin / bet / turbo / autoplay 按鈕是 **PixiJS**，由 web-sdk 的 `UiSprite.svelte` 渲染（見 §4.12），**不在 HTML 層**。本次只升級 **HTML 層**（modals 與其按鈕、面板、表單控件），不動 web-sdk、不動 Pixi 主控列、不動 loader 流程 → 風險低。

參考 skill（`Slot-Casino-Game-Developer-Skills-for-Stake-Engine`）：
- `ui-slot-ux-designer` — 控制階層、44px 觸控、`prefers-reduced-motion`、對比
- `slot-ui-studio` — 共享元件治理、本地覆寫邊界
- `css-motion-designer` — 短迴圈動效、palette 紀律

**改動內容：**

- [x] **設計 token 化**：`Modals.svelte` 新增 `:root` CSS 變數（金 `#ffd34d` → 粉 `#ff7ad9` → 紫 `#a855f7` 漸層、surface、line、ease），三個 modal 共用同一 palette
  - 修正原本不一致：PayTable/Rules 用粉金、共享 modal 用素紫 → 現統一
- [x] **按鈕分層**
  - 圖示鈕（`.rectangle`）：玻璃質感 chip，hover 上浮 + 雙重發光 + 金色描邊
  - 主要動作鈕（`button.primary` / `.confirm` / `[type=submit]` / `.buy-button`）：漸層填色 + **流動 sheen 掃光動畫** + hover 位移
  - 次要鈕（`.secondary` / `.cancel`）：outlined glass
- [x] **面板質感**：popup 頂緣漸層 hairline、radial 背景模糊（`.blur-layer`）、深紫毛玻璃內容區
- [x] **表單控件**：checkbox → 漸層 pill 開關；range slider → 金色發光把手；input/select 聚焦光環
- [x] **細節**：× 關閉鈕 hover 旋轉 90°、金額數字金色發光、漸層捲軸
- [x] **可及性**：三個 modal 全套 `prefers-reduced-motion` fallback（關閉掃光/旋轉/位移）

**檔案：**

| 檔案 | 變更 |
|------|------|
| `src/components/ui/Modals.svelte` | 主升級 — 全域樣式系統重寫（design token、按鈕分層、表單控件、掃光動畫、reduced-motion） |
| `src/components/ui/ModalPayTable.svelte` | 補 `prefers-reduced-motion` |
| `src/components/ui/ModalGameRules.svelte` | 補 `prefers-reduced-motion` |

> 純 HTML/CSS 樣式層，只會編進 `build/_app/` bundle，**不影響數學 `publish_files/`**（不用重傳數學）。

**重建並上傳（在有 web-sdk monorepo 的本機執行）：**

```bash
cd ~/Stake_Engine/math-sdk/games/WildParty/WildParty_Front
pnpm build            # → build/ 重新產生（CSS 編進 _app/）
pnpm dev              # localhost:3001 開任一 modal 驗收新樣式
```

> ⚠️ 此次程式碼變更在獨立 clone 完成（無 web-sdk，無法在該環境 build）。**`pnpm build` 必須在 `~/Stake_Engine/` monorepo 本機跑**，再上傳 `build/`。

### 4.17 第八波更新（2026-07-01）— 節奏手感與 AutoSpin 可視化修正

- [x] **得分連線演繹加快**
  - `src/components/WinLines.svelte`
  - `WIN_LINE_STEP_DELAY_FAST`: `120 → 70`
  - `WIN_LINE_STEP_DELAY_NORMAL`: `280 → 140`
  - `WIN_LINE_END_DELAY`: `150 → 80`
- [x] **FreeGame + Turbo 轉輪節奏放慢（修正「停輪後下一轉過快」）**
  - `src/game/constants.ts`：新增 `SPIN_OPTIONS_FAST_FREEGAME`（較慢的 `reelPreSpinSpeed/reelSpinSpeed` 與較長 `reelSpinDelay`）
  - `src/game/stateGame.svelte.ts`：`freegame + fast` 時改用 `SPIN_OPTIONS_FAST_FREEGAME`
  - `src/game/actor.ts`：調整 `onNewGameStart`，避免 freegame turbo 走過快 preSpin 路徑
  - `packages/utils-slots/src/createEnhanceBoardPreSpin.ts`：新增 `isTurboBeforeAllOverride`，允許遊戲端覆寫 preSpin turbo 判定
- [x] **AutoSpin 選單選中態可視化**
  - `packages/components-ui-html/src/components/AutoSpinsOptions.svelte`
  - `packages/components-ui-html/src/components/AutoSpinsLossLimit.svelte`
  - `packages/components-ui-html/src/components/AutoSpinsSingleWinLimit.svelte`
  - 選中項目改為明顯顏色辨識（紫底 + 金色文字高亮）
- [x] 前端多次重建並同步 `WildParty_Front/build/`（可直接上傳 Stake）

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

### 5.7 前端上傳前重建（pull → build → 驗證）— ★ 改過 `src/` 必做

> **重要觀念：** 改 `src/` 原始碼**不會**自動更新 `build/`。`build/` 是 `pnpm build` 的產物；
> 沒重新 build，上傳的就是**舊樣式**。Stake 看到的永遠是 `build/` 的內容，不是 `src/`。
>
> **另一個坑：** 單獨 clone 的 `math-sdk`（無 web-sdk monorepo）**無法 build**，
> 因 app 相依全為 `workspace:*`。重建一定要在 `~/Stake_Engine/` 完整 monorepo 跑。

**一鍵腳本（本機）：**

```bash
cd ~/Stake_Engine/math-sdk/games/WildParty
bash rebuild_and_check.sh
```

腳本會：`git pull origin main` → `fix_links.py` → `pnpm build` → 驗證
`build/index.html` 是剛產生的、必要檔案齊全、符號 PNG = 10。

**手動等效流程：**

```bash
cd ~/Stake_Engine/math-sdk && git pull origin main          # 1) 拉新 src
cd games/WildParty/WildParty_Front
pnpm build                                                  # 2) 重建 build/
ls -la build/index.html                                     # 3) 確認時間戳是「剛剛」
pnpm dev                                                    # 4) localhost:3001 開 modal 驗收
# 5) 上傳 build/ 內容到 Stake → Play Game 確認不黑屏
git add games/WildParty/WildParty_Front/build
git commit -m "rebuild build/ with <改了什麼>"
git push origin main
```

**判斷 build 是否為新版：** 看 `build/index.html` 時間戳。若不是「剛剛」，build 沒成功重跑
（vite 完成後 node 程序常不自動退出、看似卡住，見 §9）。

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
| `static/assets/spines/wildPartySymbols/` | 符號 Spine（`idle`/`win`） |
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
| `rebuild_and_check.sh` | 本機一鍵：pull → build → 驗證 build/ 為新版（見 §5.7） |

---

## 7. 前端架構說明（給後續接手）

### 7.1 無狀態原則

前端 **不自行計算結果**，只播放 math-sdk 產生的 **Book Event 串流**：
`reveal` → `winInfo` → `freeSpinTrigger` → `updateGlobalMult` → … → `wincap`

### 7.2 符號渲染

目前採用「**混合渲染**」：
- `static` / `spin` / `land` / `postWinStatic`：`wildPartySymbols` PNG sprite
- `win`：`wildPartySymbols` Spine（`animationName: 'win'`）

若要調整中獎動態節奏，直接改 `static/assets/spines/wildPartySymbols/*.json` 的 `animations.win` 參數即可。

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
- `build/assets/spines/wildPartySymbols/` 有 10 組 spine（`.json + .atlas + .png`）

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
| **vite build「卡住」/ 背景任務 aborted，build 其實完成** | vite 跑完（`built in Xs` + `Wrote site to "build"`）後 node 程序常**不自動退出**；舊 session 殘留的 build 程序會堆積、互相搶 `rm -rf build` 而全卡死。判斷成功看 log 的 `Wrote site to` 與 `build/index.html` 時間戳；用 `node node_modules/vite/bin/vite.js build > log 2>&1` 並在完成後 kill 殘留程序 |
| `pkill -f "vite.js build"` 把自己殺掉 | 該 pattern 會匹配到正在執行此指令的 shell（cmdline 含同字串）→ 整條指令被殺、exit 1。改用更精確 pattern（含完整路徑）或先 `pgrep -lf` 確認 |
| **buy bonus 出現無法遊玩的多餘選項** | 共享 `DEFAULT_BET_MODE_META` 範本含 6 模式且 `Authenticate` 不回寫；在遊戲端覆寫 `stateMeta.betModeMeta`（見 §4.13、`src/game/betModeMeta.ts`） |
| **本地 modal（PayTable/Rules）無法滾動、點內容會關閉** | 共享 `Popup` 的 `.click-to-close-layer`（z-index:2）蓋住內容；本地內容容器需 `position:relative; z-index:100`（見 §4.13） |
| info 頁顯示「Add Your Loader」/ 感覺沒 loader | 那是 web-sdk 範本 `LoaderExample` 佔位；用本地 `WildPartyLoader.svelte` 取代（見 §4.13） |
| **單獨 clone `math-sdk`（無 web-sdk）無法 build** | app 依賴全為 `workspace:*`（web-sdk 套件 + 共享 config），單獨 clone 無 `node_modules`／無 monorepo → `pnpm install`／`pnpm build` 失敗。改 code 可在任何 clone，但 **`pnpm build` 必須在 `~/Stake_Engine/` 完整 monorepo 跑**（見 §4.16） |

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
| 20 | 同步 skills 到 Slot-Casino 資料夾 | 新增/更新 `wild-party-skill-guide`、`stake-engine-local-dev`、`stake-engine-casino-development`、`stake-game-developer` |
| 21 | buy bonus 只留 100x | `betModeMeta.ts` override；§4.13、`aa5c393` |
| 22 | info 頁可滾動 + 補完內容 | Popup z-index 修復 + 規則補完；§4.13、`7a59929` |
| 23 | 簡單 loader | `WildPartyLoader.svelte`；§4.13、`b667754` |
| 24 | 送審 Game Details + 寫入交接 | §14 介紹文、§4.13、§9 踩坑 |
| 25 | HTML UI 高級感升級 | 統一派對設計系統、按鈕分層、表單控件、reduced-motion；§4.16 |

---

## 14. 送審用 Game Details（Stake 後台「GAME DETAILS」欄位）

> 用途：Stake 後台送審表單的 **GAME DETAILS** 欄位（要求描述 features / gameplay mechanics，最少 20 字）。直接複製下方英文段落貼上。

```text
Wild Party is a 5x3, 35-payline video slot with a 96% RTP and a maximum win of 5,000x the total bet.

Base game: Winning combinations pay left-to-right on adjacent reels, starting from the leftmost reel. Only the highest win is paid per line and all line wins are added together. The Wild symbol substitutes for every symbol except the Scatter.

Free Spins: The Scatter appears only on reels 3, 4 and 5 and pays anywhere on the reels. Landing 3 Scatters in a single spin triggers 5 Free Spins. During Free Spins a single accumulating Global Multiplier is applied to every line win: it starts between 1x and 3x (based on the lines the triggering Scatters land on) and increases by +1 for each Wild that appears during the feature, up to a maximum of 100x. Landing 3 more Scatters during the feature retriggers an additional 5 Free Spins.

Buy Bonus: Players can purchase direct entry into the Free Spins feature for 100x the total bet, played at the same 96% RTP.

Technical: The game runs on the Stake Engine math-sdk with deterministic, server-driven event playback and a PixiJS + Svelte frontend. It supports replay mode and a stateless frontend (payouts are taken from RGS events, never recalculated client-side).
```

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
