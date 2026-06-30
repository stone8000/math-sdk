<script lang="ts">
	import { Popup } from 'components-shared';
	import { zIndex } from 'constants-shared/zIndex';
	import { stateModal } from 'state-shared';

	import config from '../../game/config';

	const rtpPct = `${(config.rtp * 100).toFixed(2)}%`;
	const lineCount = Object.keys(config.paylines).length;
	const maxWin = config.betModes?.base?.max_win ?? 5000;
	const buyCost = config.betModes?.bonus?.cost;
	const reelCount = config.numReels;
	const rowCount = config.numRows?.[0] ?? 3;
</script>

{#if stateModal.modal?.name === 'gameRules'}
	<Popup zIndex={zIndex.modal} onclose={() => (stateModal.modal = null)}>
		<div class="wp-rules">
			<h2>WILD PARTY — GAME RULES</h2>

			<section class="wp-card">
				<h3><span class="wp-accent-bar"></span>How to play</h3>
				<p>
					Wild Party is a {reelCount}&times;{rowCount} video slot with {lineCount} fixed paylines.
					Winning combinations pay left to right, starting from the leftmost reel on
					adjacent reels. Only the highest win is paid per line, and all line wins are added
					together. The theoretical return to player (RTP) is {rtpPct}.
				</p>
			</section>

			<section class="wp-card">
				<h3><span class="wp-accent-bar"></span>Wild</h3>
				<p>
					The Wild symbol substitutes for every symbol except the Scatter, helping to
					complete winning paylines. Wilds also drive the Global Multiplier during Free Spins.
				</p>
			</section>

			<section class="wp-card">
				<h3><span class="wp-accent-bar"></span>Scatter</h3>
				<p>
					The Scatter symbol appears only on reels 3, 4 and 5. Scatters pay anywhere on the
					reels and do not need to be on a payline. Landing 3 Scatters in a single spin
					triggers the Free Spins feature.
				</p>
			</section>

			<section class="wp-card">
				<h3><span class="wp-accent-bar"></span>Free Spins</h3>
				<p>
					3 Scatters award 5 Free Spins. Landing another 3 Scatters during the feature
					retriggers and adds +5 Free Spins. The feature is played on a dedicated reel set
					with more Wilds.
				</p>
			</section>

			<section class="wp-card">
				<h3><span class="wp-accent-bar"></span>Global Multiplier</h3>
				<p>
					Free Spins use a single accumulating Global Multiplier applied to every line win.
					It starts between 1&times; and 3&times; (based on the lines the triggering Scatters
					land on) and increases by +1 for every Wild that appears during Free Spins, up to a
					maximum of 100&times;. The multiplier stays active for the whole feature.
				</p>
			</section>

			{#if buyCost}
				<section class="wp-card">
					<h3><span class="wp-accent-bar"></span>Buy Bonus</h3>
					<p>
						Instead of waiting for Scatters, you can buy direct entry into the Free Spins
						feature for {buyCost}&times; your total bet. The Buy Bonus plays at the same {rtpPct} RTP.
					</p>
				</section>
			{/if}

			<section class="wp-card">
				<h3><span class="wp-accent-bar"></span>Max Win</h3>
				<p>
					The maximum payout is capped at {maxWin.toLocaleString()}&times; the total bet. Once
					the cap is reached the round ends immediately and the maximum win is awarded.
				</p>
			</section>

			<div class="wp-divider"></div>
			<p class="wp-foot">
				Malfunction voids all pays and plays. A stable internet connection is required; if a
				round is interrupted, reload the game to complete it. Reel movement is illustrative only
				&mdash; every outcome is determined at spin time by the remote game server.
			</p>
		</div>
	</Popup>
{/if}

<style lang="scss">
	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(18px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes cardFadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes shimmer {
		0% { background-position: -200% center; }
		100% { background-position: 200% center; }
	}

	@keyframes accentPulse {
		0%, 100% { opacity: 0.7; box-shadow: 0 0 6px rgba(255, 122, 217, 0.3); }
		50% { opacity: 1; box-shadow: 0 0 12px rgba(255, 122, 217, 0.6); }
	}

	.wp-rules {
		/* sit above the Popup's full-screen click-to-close layer (z-index 2),
		   otherwise the overlay swallows wheel/touch events and blocks scrolling */
		position: relative;
		z-index: 100;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		width: min(36rem, 90vw);
		max-width: 36rem;
		max-height: 80vh;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		overscroll-behavior: contain;
		padding: 1.5rem 1.75rem;
		color: #fff;
		text-align: left;
		animation: slideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;

		/* custom scrollbar */
		&::-webkit-scrollbar {
			width: 5px;
		}
		&::-webkit-scrollbar-track {
			background: rgba(255, 255, 255, 0.04);
			border-radius: 4px;
		}
		&::-webkit-scrollbar-thumb {
			background: linear-gradient(180deg, #ff7ad9 0%, #ffd34d 100%);
			border-radius: 4px;
		}

		h2 {
			margin: 0 0 0.35rem;
			text-align: center;
			font-size: 1.65rem;
			font-weight: 800;
			letter-spacing: 0.08em;
			background: linear-gradient(135deg, #ffd34d 0%, #ff7ad9 50%, #a855f7 100%);
			background-size: 200% auto;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
			animation: shimmer 4s linear infinite;
			filter: drop-shadow(0 0 18px rgba(255, 122, 217, 0.5));
		}
	}

	.wp-card {
		padding: 0.85rem 1rem;
		border-radius: 0.75rem;
		background: rgba(255, 255, 255, 0.03);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		border: 1px solid rgba(255, 255, 255, 0.05);
		transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
		animation: cardFadeIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;

		&:nth-child(2) { animation-delay: 0.05s; }
		&:nth-child(3) { animation-delay: 0.1s; }
		&:nth-child(4) { animation-delay: 0.15s; }
		&:nth-child(5) { animation-delay: 0.2s; }
		&:nth-child(6) { animation-delay: 0.25s; }
		&:nth-child(7) { animation-delay: 0.3s; }
		&:nth-child(8) { animation-delay: 0.35s; }
		&:nth-child(9) { animation-delay: 0.4s; }

		&:hover {
			background: rgba(255, 122, 217, 0.05);
			border-color: rgba(255, 122, 217, 0.15);
			box-shadow: 0 0 16px rgba(255, 122, 217, 0.08);
		}

		h3 {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			margin: 0 0 0.35rem;
			font-size: 1.05rem;
			font-weight: 700;
			color: #ff7ad9;
		}

		p {
			margin: 0;
			font-size: 0.88rem;
			line-height: 1.55;
			opacity: 0.88;
			padding-left: 0.9rem;
		}
	}

	.wp-accent-bar {
		display: inline-block;
		width: 3px;
		height: 1.1em;
		border-radius: 2px;
		background: linear-gradient(180deg, #ff7ad9, #a855f7);
		flex-shrink: 0;
		animation: accentPulse 3s ease-in-out infinite;
	}

	.wp-divider {
		width: 60%;
		height: 1px;
		margin: 0.25rem auto;
		background: linear-gradient(90deg, transparent, rgba(255, 122, 217, 0.3), rgba(255, 211, 77, 0.2), transparent);
	}

	.wp-foot {
		margin: 0;
		font-size: 0.75rem;
		opacity: 0.5;
		text-align: center;
		line-height: 1.45;
		letter-spacing: 0.02em;
	}

	@media (prefers-reduced-motion: reduce) {
		.wp-rules,
		.wp-card,
		.wp-accent-bar,
		h2 {
			animation: none !important;
		}
		.wp-card,
		.wp-card:hover {
			transition: none !important;
		}
	}
</style>
