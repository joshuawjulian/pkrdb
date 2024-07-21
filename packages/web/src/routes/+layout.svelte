<script>
	import '../app.css';
</script>

<slot></slot>

<style>
	:global(html) {
		margin: auto;
		width: clamp(320px, 100%, 1024px);
		background-color: var(--surface-1);
		color: var(--text-2);
	}

	:global(body) {
		border-left: var(--border-size-1) solid hsl(from var(--brand) h s l / 50%);
		border-right: var(--border-size-1) solid var(--brand);
		background-color: var(--surface-2);
		color: var(--text-1);
	}
</style>
