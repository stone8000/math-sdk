import { setContextEventEmitter, getContextEventEmitter } from 'utils-event-emitter';
import { setContextXstate, getContextXstate } from 'utils-xstate';
import { setContextLayout, getContextLayout } from 'utils-layout';
import { setContextApp, getContextApp } from 'pixi-svelte';
import { stateMeta } from 'state-shared';

import { eventEmitter, type EmitterEvent } from './eventEmitter';
import { stateXstate, stateXstateDerived } from './stateXstate';
import { stateLayout, stateLayoutDerived } from './stateLayout';
import { stateApp } from './stateApp';

import { stateGame, stateGameDerived } from './stateGame.svelte';
import { WILD_PARTY_BET_MODE_META } from './betModeMeta';
import { i18nDerived } from '../i18n/i18nDerived';

export const setContext = () => {
	setContextEventEmitter<EmitterEvent>({ eventEmitter });
	setContextXstate({ stateXstate, stateXstateDerived });
	setContextLayout({ stateLayout, stateLayoutDerived });
	setContextApp({ stateApp });

	// Restrict the buy-bonus screen to the only modes Wild Party math supports
	// (base + 100x bonus); otherwise the shared template defaults expose extra
	// unplayable buy options.
	stateMeta.betModeMeta = WILD_PARTY_BET_MODE_META;
};

export const getContext = () => ({
	...getContextEventEmitter<EmitterEvent>(),
	...getContextLayout(),
	...getContextXstate(),
	...getContextApp(),
	stateGame,
	stateGameDerived,
	i18nDerived,
});
