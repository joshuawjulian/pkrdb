<script lang="ts">
	import PokerTable from '$lib/components/PokerTable.svelte';

	let numSeats = $state(5);
</script>

<select bind:value={numSeats}>
	{#each [2, 3, 4, 5, 6, 7, 8, 9, 10, 100, 1000, 10000] as n}
		<option value={n}>{n} seat(s)</option>
	{/each}
</select>
<div class="wrapper">
	<PokerTable bind:numSeats />
</div>

<style>
	.wrapper {
		width: 100%;
		height: 600px;
		display: flex;
		justify-content: center;
	}
</style>
