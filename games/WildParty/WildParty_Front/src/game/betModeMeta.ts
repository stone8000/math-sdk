import type { BetModeData } from 'state-shared';

import config from './config';

// Wild Party only ships two math modes: base play and the 100x bonus buy.
// The shared library ships a template default (ANTE / SUPER ANTE / SUPER SPIN /
// SUPER BONUS) that has no backing math here, so those buy-bonus options fail to
// play. We override the shared meta so the buy-bonus screen exposes only the
// 100x BONUS buy that the math actually supports.
const emptyAssets = {
	icon: '',
	volatility: '',
	button: '',
	dialogImage: '',
	dialogVolatility: '',
};

export const WILD_PARTY_BET_MODE_META: Record<string, BetModeData> = {
	BASE: {
		mode: 'BASE',
		costMultiplier: config.betModes.base.cost,
		type: 'default',
		parent: '',
		children: '',
		maxWin: config.betModes.base.max_win,
		assets: { ...emptyAssets },
		text: {
			title: 'BASE',
			dialog: '',
			button: '',
			betAmountLabel: '',
			tickerIdle: 'PLACE YOUR BET',
			tickerSpin: 'GOOD LUCK',
			bannerText: '',
		},
	},
	BONUS: {
		mode: 'BONUS',
		costMultiplier: config.betModes.bonus.cost,
		type: 'buy',
		parent: '',
		children: '',
		maxWin: config.betModes.bonus.max_win,
		assets: { ...emptyAssets },
		text: {
			title: 'BUY FREE SPINS',
			dialog:
				'Triggers the FREE SPINS feature when purchased for 100x the player bet amount. A Global Multiplier builds throughout FREE SPINS and is applied to winning lines.',
			description: 'Instantly trigger FREE SPINS with a building Global Multiplier.',
			button: 'BUY',
			tickerIdle: 'PLACE YOUR BET',
			tickerSpin: 'BONUS BUY ACTIVATED',
			bannerText: '',
		},
	},
};
