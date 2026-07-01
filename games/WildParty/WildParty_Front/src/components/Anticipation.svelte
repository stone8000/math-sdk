<script lang="ts">
	import { SpineProvider, SpineTrack, Graphics } from 'pixi-svelte';
	import { stateBetDerived } from 'state-shared';
	import { onMount } from 'svelte';

	import { getContext } from '../game/context';
	import type { Reel } from '../game/stateGame.svelte';
	import { REEL_PADDING, SYMBOL_SIZE } from '../game/constants';

	type Props = {
		reel: Reel;
		oncomplete: () => void;
	};

	const props: Props = $props();
	const context = getContext();

	let pulse = $state(0);
	let finished = $state(false);

	onMount(() => {
		const id = setInterval(() => {
			pulse = 0.5 + 0.5 * Math.sin(Date.now() / 145);
		}, 32);

		return () => clearInterval(id);
	});

	$effect(() => {
		// Stop immediately when reel stops to avoid the heavy "falling/landing" outro feel.
		if (!finished && props.reel.reelState.motion === 'stopped') {
			finished = true;
			props.oncomplete();
		}
	});
</script>

<SpineProvider
	key="anticipation"
	width={SYMBOL_SIZE * 0.56}
	height={SYMBOL_SIZE * 1.6}
	x={context.stateGameDerived.boardLayout().x -
		context.stateGameDerived.boardLayout().width * 0.5 +
		(props.reel.reelIndex + REEL_PADDING) * SYMBOL_SIZE}
	y={context.stateGameDerived.boardLayout().y - SYMBOL_SIZE * 0.06}
>
	<Graphics
		draw={(g) => {
			const glowAlpha = 0.14 + 0.24 * pulse;
			const coreAlpha = 0.16 + 0.32 * pulse;
			g.clear();
			g.beginFill(0xff66cc, glowAlpha);
			g.drawRoundedRect(-SYMBOL_SIZE * 0.22, -SYMBOL_SIZE * 0.72, SYMBOL_SIZE * 0.44, SYMBOL_SIZE * 1.44, 22);
			g.endFill();
			g.lineStyle(3, 0xfff07a, coreAlpha);
			g.drawRoundedRect(-SYMBOL_SIZE * 0.2, -SYMBOL_SIZE * 0.68, SYMBOL_SIZE * 0.4, SYMBOL_SIZE * 1.36, 20);
			g.lineStyle(1.6, 0xffffff, 0.25 + 0.35 * pulse);
			g.drawRoundedRect(-SYMBOL_SIZE * 0.17, -SYMBOL_SIZE * 0.63, SYMBOL_SIZE * 0.34, SYMBOL_SIZE * 1.26, 18);
		}}
	/>
	<SpineTrack
		trackIndex={0}
		animationName="anticipation_loop"
		loop
		timeScale={stateBetDerived.timeScale()}
	/>
</SpineProvider>
