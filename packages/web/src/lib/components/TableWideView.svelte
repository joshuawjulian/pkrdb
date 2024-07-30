<script lang="ts">
	import { getPositionName } from '@pkrdb/hand-engine/holdem/seat';
	import type { GameStateType } from '@pkrdb/hand-engine/holdem/state';

	let { state }: { state: GameStateType } = $props();
</script>

<section>
	{#each state.players as player, i}
		<div class="player">
			<div class="name">{i}</div>
			<div class="stack">{getPositionName(state, i)}</div>
			<div class="hand">{player.cards}</div>
		</div>
	{/each}
</section>

<style>
	section {
		width: 100%;
		display: flex;
		gap: 2rem;
		border: 1rem solid var(--brand);
	}

	.player {
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 1px solid var(--border-color);
		border-radius: 0.5rem;
		padding: 1rem;
	}
</style>
