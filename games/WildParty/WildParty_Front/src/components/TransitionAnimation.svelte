<script lang="ts">
	import { onMount } from 'svelte';
	import { Container, Sprite } from 'pixi-svelte';
	import { getContext } from '../game/context';

	type Props = {
		oncomplete: () => void;
	};

	const props: Props = $props();
	const context = getContext();

	const SWAY_MS = 760;
	const ZOOM_MS = 420;
	const TOTAL_MS = SWAY_MS + ZOOM_MS;

	let elapsed = 0;
	let rafId = 0;
	let completed = false;

	let ballScale = $state(0.92);
	let ballRotation = $state(0);
	let ballOffsetX = $state(0);
	let ballAlpha = $state(1);

	function easeOutCubic(t: number) {
		const clamped = Math.min(Math.max(t, 0), 1);
		return 1 - (1 - clamped) ** 3;
	}

	onMount(() => {
		let last = 0;
		const tick = (now: number) => {
			if (!last) last = now;
			const dt = now - last;
			last = now;
			elapsed += dt;

			if (elapsed < SWAY_MS) {
				const p = elapsed / SWAY_MS;
				const damp = 1 - p * 0.55;
				ballRotation = Math.sin(p * Math.PI * 4.5) * 0.13 * damp; // 摇摆
				ballOffsetX = Math.sin(p * Math.PI * 2.2) * 22 * damp;
				ballScale = 0.92 + p * 0.16;
				ballAlpha = 1;
			} else {
				const p = (elapsed - SWAY_MS) / ZOOM_MS;
				const e = easeOutCubic(p);
				ballRotation = 0.03 * (1 - e);
				ballOffsetX = 0;
				ballScale = 1.08 + e * 2.35; // 拉近
				ballAlpha = 1 - e * 0.08;
			}

			if (elapsed >= TOTAL_MS) {
				if (!completed) {
					completed = true;
					props.oncomplete();
				}
				return;
			}

			rafId = requestAnimationFrame(tick);
		};

		rafId = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafId);
	});
</script>

<Container
	x={context.stateLayoutDerived.canvasSizes().width * 0.5}
	y={context.stateLayoutDerived.canvasSizes().height * 0.5}
>
	<Sprite
		key="wpH1"
		anchor={0.5}
		width={context.stateLayoutDerived.canvasSizes().height * 0.42}
		height={context.stateLayoutDerived.canvasSizes().height * 0.42}
		scale={ballScale}
		rotation={ballRotation}
		x={ballOffsetX}
		alpha={ballAlpha}
	/>
</Container>
