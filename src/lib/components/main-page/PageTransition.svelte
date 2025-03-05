i<script lang="ts">
	import type { Snippet } from 'svelte';

	// Props
	let { children }: { children: Snippet } = $props();
</script>

<div class="page-transition">
	{@render children()}
</div>

<style>
	.page-transition {
		width: 100%;
		position: relative;
	}
</style>
