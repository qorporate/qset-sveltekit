<script lang="ts">
	interface Page {
		page: 'home' | 'guide' | 'feedback';
	}

	const props: Page = $props();
</script>

<div class="nav-container">
	<a class="logo" href="/">QSet</a>
	<div class="nav-links">
		{#if props.page === 'home'}
			<a href="/guide" class="nav-link primary">Guide</a>
			<a href="/feedback" class="nav-link secondary">Feedback</a>
		{:else if props.page === 'guide'}
			<a href="/feedback" class="nav-link secondary">Feedback</a>
		{:else if props.page === 'feedback'}
			<a href="/guide" class="nav-link primary">Guide</a>
		{/if}
	</div>
</div>

<style>
	.nav-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1rem;
		margin-bottom: 1rem;
		border-bottom: 1px solid #ddd;
	}

	.logo {
		font-size: 1.5rem;
		font-weight: bold;
		text-decoration: none;
		color: black;
	}

	.nav-links {
		display: flex;
		gap: 0.75rem;
	}

	.nav-link {
		padding: 0.5rem 1rem;
		border-radius: 4px;
		text-decoration: none;
		font-size: 0.875rem;
		transition: all 0.2s ease;
	}

	.nav-link.primary {
		background-color: #3498db;
		color: white;
	}

	.nav-link.primary:hover {
		background-color: #2980b9;
	}

	.nav-link.secondary {
		background-color: #4caf50;
		color: white;
	}

	.nav-link.secondary:hover {
		background-color: #45a049;
	}

	@media (max-width: 329px) {
		.nav-links {
			gap: 0.5rem;
		}

		.nav-link {
			padding: 0.3rem 0.8rem;
			font-size: 0.6rem;
		}
	}
</style>
