<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	type Props = {
		// minimum time the loader stays on screen before fading out
		duration?: number;
		oncomplete?: () => void;
	};

	const props: Props = $props();

	let show = $state(true);

	onMount(() => {
		const id = setTimeout(() => {
			show = false;
			props.oncomplete?.();
		}, props.duration ?? 1600);
		return () => clearTimeout(id);
	});
</script>

{#if show}
	<div class="wp-loader" transition:fade={{ duration: 400 }}>
		<div class="wp-loader-inner">
			<div class="wp-star-wrap" aria-label="Silverstars 777 star">
				<svg class="wp-star" viewBox="0 0 100 100" role="img">
					<polygon
						points="50,7 61,38 94,38 67,57 77,89 50,70 23,89 33,57 6,38 39,38"
						fill="none"
						stroke="#ffffff"
						stroke-width="5.5"
						stroke-linejoin="round"
					/>
					<text x="50" y="56" text-anchor="middle" dominant-baseline="middle">777</text>
				</svg>
			</div>
			<div class="wp-title">
				<div>SILVERSTARS</div>
				<div>STUDIO</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.wp-loader {
		position: absolute;
		inset: 0;
		z-index: 999;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #000;
	}

	.wp-loader-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.85rem;
		font-family: 'proxima-nova', Arial, sans-serif;
	}

	.wp-star-wrap {
		width: clamp(140px, 20vw, 240px);
		aspect-ratio: 1 / 1;
	}

	.wp-star {
		width: 100%;
		height: 100%;
		display: block;
		filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.25));
	}

	.wp-star text {
		fill: #fff;
		font-size: 18px;
		font-weight: 900;
		letter-spacing: 0;
		font-family: 'proxima-nova', Arial, sans-serif;
	}

	.wp-title {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		font-size: clamp(2rem, 4.2vw, 4rem);
		font-weight: 900;
		letter-spacing: 0.12em;
		color: #fff;
		text-align: center;
		line-height: 1;
		text-shadow: 0 0 16px rgba(255, 255, 255, 0.28);
	}
</style>
