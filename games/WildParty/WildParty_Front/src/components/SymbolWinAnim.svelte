<script lang="ts">
	import { Container, Sprite, Graphics } from 'pixi-svelte';
	import { onMount } from 'svelte';

	import { SYMBOL_SIZE } from '../game/constants';
	import { getSymbolInfo } from '../game/utils';

	type Props = {
		x?: number;
		y?: number;
		symbolInfo: ReturnType<typeof getSymbolInfo>;
		oncomplete?: () => void;
	};

	const props: Props = $props();

	// pulse 0→1→0 at ~1.4 Hz
	let pulse = $state(0);

	onMount(() => {
		// Signal complete immediately so the game state machine isn't blocked.
		// The visual animation continues looping until the component is destroyed.
		props.oncomplete?.();

		const id = setInterval(() => {
			pulse = 0.5 + 0.5 * Math.sin(Date.now() / 225);
		}, 32);

		return () => clearInterval(id);
	});
</script>

<!--
  Programmatic win animation: scale pulse + golden glow ring behind the symbol.
  Uses the existing wildPartySymbols PNG sprites — no external spine required.
-->
<Container x={props.x} y={props.y} scale={1 + 0.18 * pulse}>
	<!-- Outer glow ring -->
	<Graphics
		draw={(g) => {
			g.clear();
			g.beginFill(0xffe050, 0.08 + 0.14 * pulse);
			g.drawCircle(0, 0, SYMBOL_SIZE * 0.54);
			g.endFill();
			g.lineStyle(3.5, 0xffe050, 0.35 + 0.45 * pulse);
			g.drawCircle(0, 0, SYMBOL_SIZE * 0.49);
			g.lineStyle(1.5, 0xffffff, 0.2 + 0.3 * pulse);
			g.drawCircle(0, 0, SYMBOL_SIZE * 0.44);
		}}
	/>
	<!-- Symbol sprite -->
	<Sprite
		anchor={0.5}
		key={props.symbolInfo.assetKey}
		width={SYMBOL_SIZE * props.symbolInfo.sizeRatios.width}
		height={SYMBOL_SIZE * props.symbolInfo.sizeRatios.height}
	/>
</Container>
