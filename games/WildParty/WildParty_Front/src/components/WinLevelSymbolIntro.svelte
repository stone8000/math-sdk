<script lang="ts">
	import { Container, Graphics, SpineProvider, SpineTrack } from 'pixi-svelte';
	import { onMount } from 'svelte';

	type Props = {
		symbolKey: 'wpSpH1' | 'wpSpH2' | 'wpSpH3' | 'wpSpH4';
	};

	const props: Props = $props();

	let tick = $state(0);

	onMount(() => {
		const intervalId = setInterval(() => {
			tick += 1;
		}, 32);

		return () => {
			clearInterval(intervalId);
		};
	});

	const shakeX = $derived(Math.sin(tick / 1.7) * 6);
	const shakeY = $derived(Math.sin(tick / 2.3) * 4);
	const scale = $derived(1 + 0.06 * Math.sin(tick / 3.3));
	const flashAlpha = $derived(0.35 + 0.45 * (0.5 + 0.5 * Math.sin(tick / 1.4)));
</script>

<Container x={shakeX} y={shakeY} scale={scale}>
	<Graphics
		draw={(g) => {
			g.clear();
			g.beginFill(0xfff0a5, 0.08 + 0.15 * flashAlpha);
			g.drawCircle(0, 0, 125);
			g.endFill();

			g.lineStyle(8, 0xffffff, 0.24 + 0.26 * flashAlpha);
			g.drawCircle(0, 0, 102);
			g.lineStyle(2.5, 0xffdf66, 0.25 + 0.4 * flashAlpha);
			g.drawCircle(0, 0, 116);
		}}
	/>

	<SpineProvider key={props.symbolKey} width={360}>
		<SpineTrack trackIndex={0} animationName="win" loop />
	</SpineProvider>
</Container>
