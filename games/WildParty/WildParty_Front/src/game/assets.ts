export default {
	loader: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/loader/loader.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/loader/loader.json', import.meta.url).href,
			scale: 2,
		},
		preload: true,
	},
	pressToContinueText: {
		type: 'sprites',
		src: new URL('../../assets/sprites/pressToContinueText/MM_pressanywhere.json', import.meta.url).href,
		preload: true,
	},
	H1: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/h1.json', import.meta.url).href,
			scale: 2,
		},
	},
	H2: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/h2.json', import.meta.url).href,
			scale: 2,
		},
	},
	H3: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/h3.json', import.meta.url).href,
			scale: 2,
		},
	},
	H4: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/h4.json', import.meta.url).href,
			scale: 2,
		},
	},
	H5: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/h5.json', import.meta.url).href,
			scale: 2,
		},
	},
	L1: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/l1.json', import.meta.url).href,
			scale: 2,
		},
	},
	L2: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/l2.json', import.meta.url).href,
			scale: 2,
		},
	},
	L3: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/l3.json', import.meta.url).href,
			scale: 2,
		},
	},
	L4: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/l4.json', import.meta.url).href,
			scale: 2,
		},
	},
	M: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols2/symbols2.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols2/M.json', import.meta.url).href,
			scale: 2,
		},
	},
	S: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols2/symbols2.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols2/S.json', import.meta.url).href,
			scale: 2,
		},
	},
	explosion: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols3/symbols3.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols3/explosion.json', import.meta.url).href,
			scale: 2,
		},
	},
	W: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols3/symbols3.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols3/W.json', import.meta.url).href,
			scale: 2,
		},
	},
	reelsFrame: {
		type: 'sprites',
		src: new URL('../../assets/sprites/reelsFrame/reels_frame.json', import.meta.url).href,
	},
	payFrame: {
		type: 'sprite',
		src: new URL('../../assets/sprites/payFrame/payFrame.png', import.meta.url).href,
	},
	// Wild Party symbol art (transparent PNGs — swap files in
	// static/assets/sprites/wildPartySymbols/ to update the look)
	wpH1: {
		type: 'sprite',
		src: new URL('../../assets/sprites/wildPartySymbols/h1.png', import.meta.url).href,
		preload: true,
	},
	wpH2: {
		type: 'sprite',
		src: new URL('../../assets/sprites/wildPartySymbols/h2.png', import.meta.url).href,
		preload: true,
	},
	wpH3: {
		type: 'sprite',
		src: new URL('../../assets/sprites/wildPartySymbols/h3.png', import.meta.url).href,
		preload: true,
	},
	wpH4: {
		type: 'sprite',
		src: new URL('../../assets/sprites/wildPartySymbols/h4.png', import.meta.url).href,
		preload: true,
	},
	wpL1: {
		type: 'sprite',
		src: new URL('../../assets/sprites/wildPartySymbols/l1.png', import.meta.url).href,
		preload: true,
	},
	wpL2: {
		type: 'sprite',
		src: new URL('../../assets/sprites/wildPartySymbols/l2.png', import.meta.url).href,
		preload: true,
	},
	wpL3: {
		type: 'sprite',
		src: new URL('../../assets/sprites/wildPartySymbols/l3.png', import.meta.url).href,
		preload: true,
	},
	wpL4: {
		type: 'sprite',
		src: new URL('../../assets/sprites/wildPartySymbols/l4.png', import.meta.url).href,
		preload: true,
	},
	wpW: {
		type: 'sprite',
		src: new URL('../../assets/sprites/wildPartySymbols/w.png', import.meta.url).href,
		preload: true,
	},
	wpS: {
		type: 'sprite',
		src: new URL('../../assets/sprites/wildPartySymbols/s.png', import.meta.url).href,
		preload: true,
	},
	wpSpH1: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/wildPartySymbols/h1.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/wildPartySymbols/h1.json', import.meta.url).href,
			scale: 1,
		},
	},
	wpSpH2: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/wildPartySymbols/h2.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/wildPartySymbols/h2.json', import.meta.url).href,
			scale: 1,
		},
	},
	wpSpH3: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/wildPartySymbols/h3.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/wildPartySymbols/h3.json', import.meta.url).href,
			scale: 1,
		},
	},
	wpSpH4: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/wildPartySymbols/h4.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/wildPartySymbols/h4.json', import.meta.url).href,
			scale: 1,
		},
	},
	wpSpL1: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/wildPartySymbols/l1.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/wildPartySymbols/l1.json', import.meta.url).href,
			scale: 1,
		},
	},
	wpSpL2: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/wildPartySymbols/l2.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/wildPartySymbols/l2.json', import.meta.url).href,
			scale: 1,
		},
	},
	wpSpL3: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/wildPartySymbols/l3.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/wildPartySymbols/l3.json', import.meta.url).href,
			scale: 1,
		},
	},
	wpSpL4: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/wildPartySymbols/l4.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/wildPartySymbols/l4.json', import.meta.url).href,
			scale: 1,
		},
	},
	wpSpW: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/wildPartySymbols/w.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/wildPartySymbols/w.json', import.meta.url).href,
			scale: 1,
		},
	},
	wpSpS: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/wildPartySymbols/s.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/wildPartySymbols/s.json', import.meta.url).href,
			scale: 1,
		},
	},
	// Wild Party themed backgrounds (placeholder art — swap files in
	// static/assets/sprites/wildPartyBackground/ to update the look)
	wildPartyBgBase: {
		type: 'sprite',
		src: new URL('../../assets/sprites/wildPartyBackground/bg_base.png', import.meta.url).href,
		preload: true,
	},
	wildPartyBgFeature: {
		type: 'sprite',
		src: new URL('../../assets/sprites/wildPartyBackground/bg_feature.png', import.meta.url).href,
		preload: true,
	},
	anticipation: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/anticipation/anticipation.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/anticipation/anticipation.json', import.meta.url).href,
			scale: 2,
		},
	},
	goldFont: {
		type: 'font',
		src: new URL('../../assets/fonts/goldFont/mm_gold.xml', import.meta.url).href,
	},
	goldBlur: {
		type: 'font',
		src: new URL('../../assets/fonts/goldBlur/miningfont_gold_blur.xml', import.meta.url).href,
	},
	silverFont: {
		type: 'font',
		src: new URL('../../assets/fonts/silverFont/mm_silver.xml', import.meta.url).href,
	},
	purpleFont: {
		type: 'font',
		src: new URL('../../assets/fonts/purpleFont/mm_purple.xml', import.meta.url).href,
	},
	bigwin: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/bigwin/big_wins.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/bigwin/mm_bigwin.json', import.meta.url).href,
			scale: 2,
		},
	},
	globalMultiplier: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/globalMultiplier/multiframe.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/globalMultiplier/multiframe.json', import.meta.url).href,
			scale: 2,
		},
	},
	fsIntro: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/fsIntro/fs_screen.json', import.meta.url).href,
			scale: 2,
		},
	},
	fsIntroNumber: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/fsIntro/fs_screen_number.json', import.meta.url).href,
			scale: 2,
		},
	},
	fsOutroNumber: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/fsIntro/fs_total_number.json', import.meta.url).href,
			scale: 2,
		},
	},
	foregroundAnimation: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/foregroundAnimation/mm_bg.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/foregroundAnimation/mm_bg.json', import.meta.url).href,
			scale: 2,
		},
		preload: true,
	},
	foregroundFeatureAnimation: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/foregroundFeatureAnimation/mm_bg_feature.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/foregroundFeatureAnimation/mm_bg_feature.json', import.meta.url).href,
			scale: 2,
		},
		preload: true,
	},
	tumble_multiplier: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/tumbleWin/tumble_win.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/tumbleWin/tumble_multiplier.json', import.meta.url).href,
			scale: 2,
		},
	},
	tumble_win: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/tumbleWin/tumble_win.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/tumbleWin/tumble_win.json', import.meta.url).href,
			scale: 2,
		},
	},
	reelhouse: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/reelhouse/reelhouse_glow.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/reelhouse/reelhouse_glow.json', import.meta.url).href,
			scale: 2,
		},
	},
	progressBar: {
		type: 'sprites',
		src: new URL('../../assets/sprites/progressBar/progressBar.json', import.meta.url).href,
		preload: true,
	},
	freeSpins: {
		type: 'sprites',
		src: new URL('../../assets/sprites/freeSpins/freeSpins.json', import.meta.url).href,
	},
	winSmall: {
		type: 'sprites',
		src: new URL('../../assets/sprites/winSmall/MM_Localisation_winsmall.json', import.meta.url).href,
	},
	clusterWin: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/clusterWin/clusterpay.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/clusterWin/clusterpay.json', import.meta.url).href,
			scale: 2,
		},
	},
	transition: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/transition/transition.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/transition/transition.json', import.meta.url).href,
			scale: 2,
		},
	},
	symbolsStatic: {
		type: 'sprites',
		src: new URL('../../assets/sprites/symbolsStatic/symbolsStatic.json', import.meta.url).href,
	},
	coins: {
		type: 'spriteSheet',
		src: new URL('../../assets/sprites/coin/SD2_Coin.json', import.meta.url).href,
	},
	sound: {
		type: 'audio',
		src: new URL('../../assets/audio/sounds.json', import.meta.url).href,
		preload: true,
	},
} as const;
