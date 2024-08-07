<script lang="ts">
	import {
		isDealerAction,
		type ActionType,
	} from '@pkrdb/hand-engine/holdem/action';

	const { action }: { action: ActionType } = $props();
</script>

<section>
	{#if isDealerAction(action)}
		<div>{action.action}</div>
	{:else}
		<div>{action.seat}</div>
		<div>{action.action}</div>
	{/if}
</section>

<style>
	section {
		width: 100%;
		display: flex;
		justify-content: space-around;
		border-bottom: 2px solid var(--blue-4);
	}
</style>
