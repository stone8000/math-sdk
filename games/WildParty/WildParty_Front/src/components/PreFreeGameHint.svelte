<script lang="ts" module>
	export type EmitterEventPreFreeGameHint = { type: 'preFreeGameHintShow' };
</script>

<script lang="ts">
	import { Container, Graphics, SpineProvider, SpineTrack } from 'pixi-svelte';
	import { waitForResolve } from 'utils-shared/wait';
	import { MainContainer } from 'components-layout';
	import { onDestroy } from 'svelte';

	import { getContext } from '../game/context';

	const context = getContext();

	const DURATION_MS = 700;

	let show = $state(false);
	let progress = $state(0);
	let oncomplete = $state(() => {});
	let intervalId = $state<ReturnType<typeof setInterval> | null>(null);

	const stopAnimation = () => {
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = null;
		}
	};

	const runAnimation = () => {
		stopAnimation();
		const startedAt = Date.now();
		progress = 0;
		show = true;

		intervalId = setInterval(() => {
			const elapsed = Date.now() - startedAt;
			progress = Math.min(elapsed / DURATION_MS, 1);
			if (progress >= 1) {
				stopAnimation();
				show = false;
				oncomplete();
			}
		}, 16);
	};

	context.eventEmitter.subscribeOnMount({
		preFreeGameHintShow: async () => {
			runAnimation();
			await waitForResolve((resolve) => (oncomplete = resolve));
		},
	});

	onDestroy(() => {
		stopAnimation();
	});

	const x = $derived.by(() => {
		const board = context.stateGameDerived.boardLayout();
		const from = board.x + board.width * 0.78;
		const to = board.x - board.width * 0.78;
		return from + (to - from) * progress;
	});
	const y = $derived(context.stateGameDerived.boardLayout().y - 55);
	const scale = $derived(0.95 + 0.3 * Math.sin(progress * Math.PI));
	const alpha = $derived(progress < 0.84 ? 1 : 1 - (progress - 0.84) / 0.16);
</script>

{#if show}
	<MainContainer>
		<Container {x} {y} {scale} alpha={Math.max(alpha, 0)}>
			<Graphics
				draw={(g) => {
					g.clear();
					g.beginFill(0xffe993, 0.14);
					g.drawEllipse(0, 0, 180, 95);
					g.endFill();
					g.lineStyle(5, 0xffffff, 0.45);
					g.drawEllipse(0, 0, 160, 78);
				}}
			/>

			<SpineProvider key="wpSpH1" width={260}>
				<SpineTrack trackIndex={0} animationName="win" loop />
			</SpineProvider>
		</Container>
	</MainContainer>
{/if}
