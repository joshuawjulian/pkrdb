<script lang="ts">
	import { cardToString, isPlayerAction, type ActionType, type GameStateType } from '@pkrdb/hand-engine/holdem';
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
{#snippet players(state:GameStateType) }
<table>
	<tbody>
	<tr>
{#each state.players as player, i}
		<td>
			<div>Player {i + 1}</div>
			<div>Stack: {player.startingStack}</div>
			<div>Cards: {cardToString(player.cards[0])} {cardToString(player.cards[1])}</div>
		</td>
{/each}
	</tr>
	</tbody>
</table>
{/snippet}

{#snippet displayAction(action:ActionType) }
	<div>Action: {action.action}</div>
	{#if isPlayerAction(action)}
		<div>Seat: {action.seat}</div>
	{/if}
{/snippet}

{@render players(state)}
{#each state.actionList as action}
	{@render displayAction(action)}
{/each}
