<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		isActive: boolean;
		children: Snippet;
	}

	let { isActive, children }: Props = $props();
</script>

<div class="page {isActive ? 'active' : 'hidden'}">
	{@render children()}
</div>

<style>
	.page {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}

	.page.active {
		position: relative;
		display: block;
		width: 100%;
	}

	.page.hidden {
		display: none;
		position: absolute;
		pointer-events: none;
	}
</style>
