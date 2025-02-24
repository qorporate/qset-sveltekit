<script lang="ts">
	import type { StepByStepItem } from '$lib/common/types';
	import DemoItemVideo from './DemoItemVideo.svelte';

	const { title, description, videoSrc, additionalDescription }: StepByStepItem = $props();
</script>

<div class="demo-item">
	<h3 class="demo-title">{title}</h3>
	<p class="demo-description">{description}</p>
	<DemoItemVideo {videoSrc} />
	{#if additionalDescription}
		<br />
		<p class="demo-description">{@html additionalDescription}</p>
	{/if}
</div>

<style>
	.demo-item {
		border-top: 1px solid #eee;
		border-bottom: 4px;
		padding: 1rem;
	}

	.demo-title {
		font-size: 1rem;
		color: #444;
		margin-bottom: 0.5rem;
	}

	.demo-description {
		color: #666;
		font-size: 0.9rem;
		margin-bottom: 1rem;
		line-height: 1.2rem;
	}
</style>
