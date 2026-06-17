<script lang="ts" module>
	import { sound, type MusicName, type SoundEffectName, type SoundName } from '../game/sound';

	export type EmitterEventSound =
		| { type: 'soundMusic'; name: MusicName }
		| { type: 'soundOnce'; name: SoundEffectName; forcePlay?: boolean }
		| { type: 'soundLoop'; name: SoundEffectName }
		| { type: 'soundStop'; name: SoundName }
		| { type: 'soundFade'; name: SoundName; from: number; to: number; duration: number }
		| { type: 'soundScatterCounterIncrease' }
		| { type: 'soundScatterCounterClear' };
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	import { waitForTimeout } from 'utils-shared/wait';
	import { SECOND } from 'constants-shared/time';
	import { stateBet, stateSoundDerived } from 'state-shared';
	import { base } from '$app/paths';

	import { getContext } from '../game/context';

	const context = getContext();

	// ─── Wild Party custom BGM player (standalone HTML5 Audio) ───
	let bgmAudio: HTMLAudioElement | null = null;
	let currentBgm: 'base' | 'freespin' | null = null;

	function playBgm(type: 'base' | 'freespin') {
		if (type === 'base') {
			if (currentBgm === 'base' && bgmAudio && !bgmAudio.paused) return;
			// Stop any playing sprite bgm
			sound.players.music.stop?.({ name: 'bgm_main' } as any);
			// Play standalone mp3
			if (!bgmAudio) {
				bgmAudio = new Audio(`${base}/assets/audio/background.mp3`);
				bgmAudio.loop = true;
			}
			bgmAudio.volume = stateSoundDerived.volumeMusic();
			bgmAudio.currentTime = 0;
			bgmAudio.play().catch(() => {});
			currentBgm = 'base';
		} else {
			// Free spin — stop custom bgm, use sprite system
			if (bgmAudio) {
				bgmAudio.pause();
				bgmAudio.currentTime = 0;
			}
			currentBgm = 'freespin';
			sound.players.music.play({ name: 'bgm_freespin' });
		}
	}

	function stopBgm() {
		if (bgmAudio) {
			bgmAudio.pause();
			bgmAudio.currentTime = 0;
		}
		currentBgm = null;
	}

	// Keep volume in sync with settings
	$effect(() => {
		const vol = stateSoundDerived.volumeMusic();
		if (bgmAudio) bgmAudio.volume = vol;
	});

	context.eventEmitter.subscribeOnMount({
		// ui
		soundBetMode: async ({ betModeKey }) => {
			if (betModeKey === 'SUPERSPIN') {
				sound.players.once.play({ name: 'sfx_winlevel_end' });
				await waitForTimeout(SECOND);
				playBgm('freespin');
			} else {
				playBgm('base');
			}
		},
		soundPressGeneral: () => sound.players.once.play({ name: 'sfx_btn_general' }),
		soundPressBet: () => sound.players.once.play({ name: 'sfx_btn_spin' }),
		// scatterCounter
		soundScatterCounterIncrease: () => (context.stateGame.scatterCounter = context.stateGame.scatterCounter + 1), // prettier-ignore
		soundScatterCounterClear: () => (context.stateGame.scatterCounter = 0),
		// game
		soundMusic: ({ name }) => {
			if (name === 'bgm_main') {
				playBgm('base');
			} else if (name === 'bgm_freespin') {
				playBgm('freespin');
			} else {
				// Other music (win levels etc) — pause custom bgm, play via sprite
				if (bgmAudio) bgmAudio.pause();
				currentBgm = null;
				sound.players.music.play({ name });
			}
		},
		soundLoop: ({ name }) => sound.players.loop.play({ name }),
		soundOnce: ({ name, forcePlay }) => sound.players.once.play({ name, forcePlay }),
		soundStop: ({ name }) => {
			if (name === 'bgm_main') {
				stopBgm();
			} else {
				sound.stop({ name });
			}
		},
		soundFade: async ({ name, duration, from, to }) => await sound.fade({ name, duration, from, to }), // prettier-ignore
	});

	onMount(() => {
		if (stateBet.activeBetModeKey === 'SUPERSPIN') {
			playBgm('freespin');
		} else {
			playBgm('base');
		}

		return () => {
			if (bgmAudio) {
				bgmAudio.pause();
				bgmAudio.src = '';
				bgmAudio = null;
			}
		};
	});
</script>
