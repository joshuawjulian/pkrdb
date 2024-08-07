<script lang="ts">
	import HoldemActionLine from '$lib/components/HoldemActionLine.svelte';
	import TableWideView from '$lib/components/TableWideView.svelte';
	import { type GameStateType } from '@pkrdb/hand-engine/holdem/state';
	let state: GameStateType = {
		options: {
			reopenPercent: 1.0,
		},
		players: Array(8).fill({
			startingStack: 100,
			cards: [
				{ rank: 'A', suit: 'c' },
				{ rank: 'K', suit: 'd' },
			],
		}),
		actionList: [
			{ action: 'preflop' }, //0
			{ action: 'blind', seat: 0, amount: 1, isAllIn: false }, //1
			{ action: 'call', seat: 1, amount: 1, isAllIn: false }, //2
			{ action: 'call', seat: 2, amount: 1, isAllIn: false }, //3
			{ action: 'fold', seat: 3 }, //4
			{ action: 'fold', seat: 4 }, //5
			{ action: 'fold', seat: 5 }, //6
			{ action: 'bet', seat: 6, amount: 10, isAllIn: false }, //7
			{ action: 'call', seat: 7, amount: 10, isAllIn: false }, //8

			{ action: 'call', seat: 1, amount: 10, isAllIn: false }, //11
			{ action: 'fold', seat: 2 }, //12
			{
				action: 'flop',
				flop: [
					{ rank: '2', suit: 'h' },
					{ rank: '3', suit: 'h' },
					{ rank: '4', suit: 'h' },
				],
			}, //13
			{ action: 'check', seat: 1 }, //14
			{ action: 'bet', seat: 6, amount: 20, isAllIn: false }, //15
			{ action: 'call', seat: 7, amount: 20, isAllIn: false }, //16
			{ action: 'fold', seat: 1 }, //17
			{ action: 'turn', turn: { rank: '5', suit: 'h' } }, //18
			{ action: 'check', seat: 6 }, //19
			{ action: 'check', seat: 7 }, //20
			{ action: 'river', river: { rank: '6', suit: 'h' } }, //21
			{ action: 'check', seat: 6 }, //22
			{ action: 'bet', seat: 7, amount: 70, isAllIn: true }, //23
			{ action: 'fold', seat: 6 }, //24
		],
	};
</script>

<TableWideView {state} />
{#each state.actionList as action}
	<HoldemActionLine {action} />
{/each}
