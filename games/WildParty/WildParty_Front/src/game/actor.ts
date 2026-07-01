import _ from 'lodash';

import { stateBet } from 'state-shared';
import { checkIsMultipleRevealEvents } from 'utils-book';
import { createPrimaryMachines, createIntermediateMachines, createGameActor } from 'utils-xstate';

import type { Bet } from './typesBookEvent';
import { stateXstateDerived } from './stateXstate';
import { playBet, convertTorResumableBet } from './utils';
import { stateGame, stateGameDerived } from './stateGame.svelte';
import { eventEmitter } from './eventEmitter';
import config from './config';

const primaryMachines = createPrimaryMachines<Bet>({
	onResumeGameActive: (betToResume) => convertTorResumableBet(betToResume),
	onResumeGameInactive: (betToResume) => {
		const lastRevealEvent = _.findLast(
			betToResume.state,
			(bookEvent) => bookEvent?.type === 'reveal',
		);

		if (lastRevealEvent) stateGameDerived.enhancedBoard.settle(lastRevealEvent.board);
	},
	onNewGameStart: async () => {
		stateBet.winBookEventAmount = 0;
		if (stateBet.isSpaceHold) return;

		// Basegame pre-spin is handled in onPlayGame so we can inject the
		// pre-freegame hint animation before reels start spinning.
		if (stateGame.gameType !== 'freegame') return;

		const skipPreSpinInTurboAutoBet =
			stateBet.isTurbo && stateXstateDerived.isAutoBetting() && stateGame.gameType !== 'freegame';
		if (skipPreSpinInTurboAutoBet) return;

		const forceNormalPreSpin = stateBet.isTurbo && stateGame.gameType === 'freegame';
		await stateGameDerived.enhancedBoard.preSpin({
			paddingBoard: config.paddingReels[stateGame.gameType],
			isTurboBeforeAllOverride: forceNormalPreSpin ? false : undefined,
		});
	},
	onNewGameError: () => stateGameDerived.enhancedBoard.settle(),
	onPlayGame: async (bet) => {
		if (stateGame.gameType === 'basegame') {
			const hasFreeSpinTrigger = bet.state.some((bookEvent) => bookEvent.type === 'freeSpinTrigger');
			if (hasFreeSpinTrigger) {
				await eventEmitter.broadcastAsync({ type: 'preFreeGameHintShow' });
			}

			const skipPreSpinInTurboAutoBet =
				stateBet.isTurbo && stateXstateDerived.isAutoBetting() && !hasFreeSpinTrigger;
			if (!stateBet.isSpaceHold && !skipPreSpinInTurboAutoBet) {
				await stateGameDerived.enhancedBoard.preSpin({
					paddingBoard: config.paddingReels[stateGame.gameType],
				});
			}
		}

		await playBet(bet);
	},
	checkIsBonusGame: (bet) => checkIsMultipleRevealEvents({ bookEvents: bet.state }),
});

const intermediateMachines = createIntermediateMachines(primaryMachines);

export const gameActor = createGameActor(intermediateMachines);
