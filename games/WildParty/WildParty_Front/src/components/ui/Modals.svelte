<script lang="ts">
	import type { Snippet } from 'svelte';

	// Reuse the shared modals for everything except the pay table / game rules,
	// which we override locally with WildParty-specific content.
	import ModalError from 'components-ui-html/src/components/ModalError.svelte';
	import ModalBetMenu from 'components-ui-html/src/components/ModalBetMenu.svelte';
	import ModalBuyBonus from 'components-ui-html/src/components/ModalBuyBonus.svelte';
	import ModalBuyBonusConfirm from 'components-ui-html/src/components/ModalBuyBonusConfirm.svelte';
	import ModalAutoSpin from 'components-ui-html/src/components/ModalAutoSpin.svelte';
	import ModalAutoSpinMessage from 'components-ui-html/src/components/ModalAutoSpinMessage.svelte';
	import ModalSettings from 'components-ui-html/src/components/ModalSettings.svelte';

	import ModalPayTable from './ModalPayTable.svelte';
	import ModalGameRules from './ModalGameRules.svelte';

	type Props = {
		version: Snippet;
	};

	const props: Props = $props();
</script>

<ModalError />
<ModalBetMenu />
<ModalBuyBonus />
<ModalBuyBonusConfirm />
<ModalAutoSpin />
<ModalAutoSpinMessage />
<ModalPayTable />
<ModalGameRules />
<ModalSettings />

<!-- version snippet retained for parity with the shared Modals API -->
<div style="display:none">{@render props.version()}</div>

<style lang="scss">
	:global(html) {
		font-size: 16px;
		@media screen and (max-width: 500px) {
			font-size: 50%;
		}
	}

	/* Wild Party premium button styling */
	:global(.ui-button),
	:global(button[class*='btn']),
	:global(.modal button),
	:global(.modal-content button) {
		position: relative;
		border: 1px solid rgba(255, 0, 255, 0.3) !important;
		background: linear-gradient(
			135deg,
			rgba(20, 0, 40, 0.9) 0%,
			rgba(40, 0, 60, 0.9) 50%,
			rgba(20, 0, 40, 0.9) 100%
		) !important;
		color: #fff !important;
		border-radius: 8px !important;
		font-weight: 600 !important;
		letter-spacing: 0.5px;
		transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
		box-shadow:
			0 2px 8px rgba(255, 0, 255, 0.15),
			inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
		text-transform: uppercase;
		backdrop-filter: blur(4px);
	}

	:global(.ui-button:hover),
	:global(button[class*='btn']:hover),
	:global(.modal button:hover),
	:global(.modal-content button:hover) {
		border-color: rgba(255, 0, 255, 0.6) !important;
		box-shadow:
			0 4px 16px rgba(255, 0, 255, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
		transform: translateY(-1px);
	}

	:global(.ui-button:active),
	:global(button[class*='btn']:active),
	:global(.modal button:active),
	:global(.modal-content button:active) {
		transform: translateY(0px);
		box-shadow:
			0 1px 4px rgba(255, 0, 255, 0.2),
			inset 0 2px 4px rgba(0, 0, 0, 0.3) !important;
	}

	/* Modal styling upgrade */
	:global(.modal-content),
	:global([class*='modal-body']),
	:global([class*='ModalContent']) {
		background: linear-gradient(
			180deg,
			rgba(15, 0, 30, 0.97) 0%,
			rgba(10, 0, 20, 0.98) 100%
		) !important;
		border: 1px solid rgba(255, 0, 255, 0.2) !important;
		border-radius: 12px !important;
		box-shadow:
			0 8px 32px rgba(0, 0, 0, 0.6),
			0 0 60px rgba(255, 0, 255, 0.08) !important;
		backdrop-filter: blur(12px);
	}

	/* Scrollbar premium styling */
	:global(::-webkit-scrollbar) {
		width: 6px;
	}
	:global(::-webkit-scrollbar-track) {
		background: rgba(10, 0, 20, 0.5);
		border-radius: 3px;
	}
	:global(::-webkit-scrollbar-thumb) {
		background: linear-gradient(180deg, rgba(255, 0, 255, 0.4), rgba(100, 0, 200, 0.4));
		border-radius: 3px;
	}
	:global(::-webkit-scrollbar-thumb:hover) {
		background: linear-gradient(180deg, rgba(255, 0, 255, 0.6), rgba(100, 0, 200, 0.6));
	}

	/* Select / input premium styling */
	:global(.modal select),
	:global(.modal input),
	:global(.modal-content select),
	:global(.modal-content input) {
		background: rgba(20, 0, 40, 0.8) !important;
		border: 1px solid rgba(255, 0, 255, 0.2) !important;
		border-radius: 6px !important;
		color: #fff !important;
		transition: border-color 0.2s ease !important;
	}

	:global(.modal select:focus),
	:global(.modal input:focus),
	:global(.modal-content select:focus),
	:global(.modal-content input:focus) {
		border-color: rgba(255, 0, 255, 0.5) !important;
		outline: none !important;
		box-shadow: 0 0 8px rgba(255, 0, 255, 0.2) !important;
	}
</style>
