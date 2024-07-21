<script lang="ts">
	import { getXYPosAbs } from '$lib/table/draw';
	import { onMount } from 'svelte';

	let { numSeats = $bindable() }: { numSeats: number } = $props();

	let tblDiv: HTMLDivElement;
	let width: number = $state(0);
	let height: number = $state(0);

	onMount(() => {
		width = tblDiv.clientWidth;
		height = tblDiv.clientHeight;
		const resizeObserver = new ResizeObserver((entries) => {
			// We're only watching one element
			const entry = entries.at(0);

			if (entry === undefined) {
				console.error('entry is undefined');
				return;
			}
			//Get the block size
			width = entry.borderBoxSize[0].inlineSize;
			height = entry.contentBoxSize[0].blockSize;
		});

		resizeObserver.observe(tblDiv);

		// This callback cleans up the observer
		return () => resizeObserver.unobserve(tblDiv);
	});
</script>

<div class="tbl" bind:this={tblDiv}>
	{#each Array.from({ length: numSeats }) as _, i}
		{@const pos = getXYPosAbs(i, numSeats, width, height)}
		<div class="seat" style="left: {pos.left - 50}px; top: {pos.top - 50}px;">
			Player {i} ({pos.left}, {pos.top})
		</div>
	{/each}
</div>

<style>
	.tbl {
		width: 100%;
		height: 100%;
		border: var(--border-size-3) solid var(--brand);
		position: relative;
	}

	.seat {
		position: absolute;
		width: 100px;
		height: 100px;
		left: 400px;
		border: var(--border-size-1) solid var(--brand);
	}
</style>
