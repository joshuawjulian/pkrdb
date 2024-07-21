<script lang="ts">
	import type { CardType } from '@pkrdb/hand-engine/holdem';

	let card: CardType = { rank: 'X', suit: 'x' };

	type CardProps = {
		cardSelected: (card: CardType) => void;
	};

	let { cardSelected }: CardProps = $props();
</script>

<div>Card Selectors</div>

<style>
	div {
		background-color: var(--gray10);
		color: var(--colora);
	}
</style>
