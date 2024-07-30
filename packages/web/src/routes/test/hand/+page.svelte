<script lang="ts">
	import TableWideView from '$lib/components/TableWideView.svelte';
	import { isPlayerAction, type ActionType } from '@pkrdb/hand-engine/holdem/action';
	import { type GameStateType } from '@pkrdb/hand-engine/holdem/state';
	let state: GameStateType = {
		players: [
			{
				startingStack: 25,
				cards: [
					{ rank: 'X', suit: 'x' },
					{ rank: 'X', suit: 'x' },
				],
			},
			{
				startingStack: 50,
				cards: [
					{ rank: 'X', suit: 'x' },
					{ rank: 'X', suit: 'x' },
				],
			},
			{
				startingStack: 100,
				cards: [
					{ rank: 'X', suit: 'x' },
					{ rank: 'X', suit: 'x' },
				],
			},
			{
				startingStack: 65,
				cards: [
					{ rank: 'X', suit: 'x' },
					{ rank: 'X', suit: 'x' },
				],
			},
		],
		options: {
			reopenPercent: 1.0,
		},
		actionList: [
			{ action: 'preflop' },
			{ action: 'blind', seat: 0, amount: 1, isAllIn: false },
			{ action: 'blind', seat: 1, amount: 2, isAllIn: false },
			{ action: 'call', seat: 2, amount: 2, isAllIn: false },
			{ action: 'bet', seat: 3, amount: 25, isAllIn: false },
			{ action: 'call', seat: 0, amount: 25, isAllIn: true },
			{ action: 'fold', seat: 1 },
			{ action: 'fold', seat: 2 },
			{
				action: 'flop',
				flop: [
					{ rank: 'X', suit: 'x' },
					{ rank: 'X', suit: 'x' },
					{ rank: 'X', suit: 'x' },
				],
			},
			{ action: 'turn', turn: { rank: 'X', suit: 'x' } },
			{ action: 'river', river: { rank: 'X', suit: 'x' } },
		],
	};
</script>

{#snippet displayAction(action:ActionType) }
	<div>Action: {action.action}</div>
	{#if isPlayerAction(action)}
		<div>Seat: {action.seat}</div>
	{/if}
{/snippet}

<TableWideView state={state} />
{#each state.actionList as action}
	{@render displayAction(action)}
{/each}
