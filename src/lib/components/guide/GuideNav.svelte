<script lang="ts">
	import { GuidePageSection } from '$lib/common/enums';

	export let activePage: GuidePageSection = GuidePageSection.VideoGuide;

	function setActivePage(page: GuidePageSection) {
		activePage = page;
	}
</script>

<p>Learn how to use QSet to manage your football sessions</p>
<nav class="guide-nav">
	<button
		class="guide-nav-button {activePage === GuidePageSection.VideoGuide ? 'active' : ''}"
		onclick={() => setActivePage(GuidePageSection.VideoGuide)}
	>
		Quick Video
	</button>

	<button
		class="guide-nav-button {activePage === GuidePageSection.StepByStep ? 'active' : ''}"
		onclick={() => setActivePage(GuidePageSection.StepByStep)}
	>
		Step-by-Step
	</button>
</nav>

<style>
	.guide-nav {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.guide-nav-button {
		padding: 0.75rem 1.5rem;
		border: 1px solid #eee;
		text-decoration: none;
		text-align: center;
		background: white;
		transition: all 0.2s ease;
		cursor: pointer;
	}

	.guide-nav-button:hover {
		background: #eee;
	}

	.guide-nav-button.active {
		background: #4caf50;
		color: white;
	}

	p {
		color: #666;
		text-align: center;
	}
</style>
