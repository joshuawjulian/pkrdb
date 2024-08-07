<script lang="ts">
	import { cardToString } from '@pkrdb/hand-engine/holdem/card';
	import { getPositionName } from '@pkrdb/hand-engine/holdem/seat';
	import type { GameStateType } from '@pkrdb/hand-engine/holdem/state';

	let { state }: { state: GameStateType } = $props();
</script>

<section>
	{#each state.players as player, i}
		<div class="player">
			<div class="name">{i}</div>
			<div class="position">{getPositionName(state, i).shortName}</div>
			<div class="stack">{player.startingStack}</div>
			<div class="hand">
				{cardToString(player.cards[0])}{cardToString(player.cards[1])}
			</div>
		</div>
	{/each}
</section>

<style>
	section {
		width: 100%;
		display: flex;
		gap: 2rem;
		border: 0.25rem solid var(--brand);
		justify-content: space-around;
	}

	.player {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
	}
</style>
