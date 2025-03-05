<script lang="ts">
	// Props
	let { currentPage, totalPages, isTransitioning, goToPage, goToNextPage, goToPreviousPage } =
		$props();
</script>

<div class="navigation-controls">
	<button
		class="nav-arrow left"
		onclick={goToPreviousPage}
		disabled={currentPage === 0 || isTransitioning}
		aria-label="Previous page"
	>
		<i class="fas fa-chevron-left"></i>
	</button>

	<div class="pagination-dots">
		{#each Array(totalPages) as _, i}
			<button
				class="dot {currentPage === i ? 'active' : ''}"
				onclick={() => goToPage(i)}
				aria-label={`Go to page ${i + 1}`}
				aria-current={currentPage === i ? 'page' : undefined}
			></button>
		{/each}
	</div>

	<button
		class="nav-arrow right"
		onclick={goToNextPage}
		disabled={currentPage === totalPages - 1 || isTransitioning}
		aria-label="Next page"
	>
		<i class="fas fa-chevron-right"></i>
	</button>
</div>

<style>
	.navigation-controls {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 10px 0;
		gap: 15px;
		position: relative;
		z-index: 10;
	}

	.nav-arrow {
		background-color: #f0f0f0;
		border: none;
		border-radius: 50%;
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: #333;
	}

	.nav-arrow:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.pagination-dots {
		display: flex;
		gap: 8px;
	}

	.dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: #ddd;
		border: none;
		padding: 0;
		cursor: pointer;
	}

	.dot.active {
		background-color: #4caf50;
	}

	@media (max-width: 768px) {
		.nav-arrow {
			display: none;
		}
	}
</style>
