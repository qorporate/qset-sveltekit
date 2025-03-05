<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	let container: HTMLElement;
	let currentPage = $state(0);
	let totalPages = $state(0);
	let startX = 0;
	let isSwiping = false;
	let containerWidth = 0;
	let touchStartTime = 0;

	onMount(() => {
		// Count the number of direct children (pages)
		totalPages = container.children.length;

		// Update container width on resize
		const updateWidth = () => {
			containerWidth = container.clientWidth;
		};

		updateWidth();
		window.addEventListener('resize', updateWidth);

		return () => {
			window.removeEventListener('resize', updateWidth);
		};
	});

	function handleTouchStart(e: TouchEvent) {
		startX = e.touches[0].clientX;
		touchStartTime = Date.now();
		isSwiping = true;
	}

	function handleTouchMove(_e: TouchEvent) {
		if (!isSwiping) {
			return;
		}
	}

	function handleTouchEnd(e: TouchEvent) {
		if (!isSwiping) {
			return;
		}

		const endX = e.changedTouches[0].clientX;
		const diffX = endX - startX;
		const touchDuration = Date.now() - touchStartTime;

		// Detect swipe (minimum distance and maximum time)
		if (Math.abs(diffX) > 50 && touchDuration < 300) {
			if (diffX > 0 && currentPage > 0) {
				// Swipe right -> previous page
				currentPage--;
			} else if (diffX < 0 && currentPage < totalPages - 1) {
				// Swipe left -> next page
				currentPage++;
			}
		}

		isSwiping = false;
	}

	function goToPage(pageIndex: number) {
		if (pageIndex >= 0 && pageIndex < totalPages) {
			currentPage = pageIndex;
		}
	}

	function nextPage() {
		if (currentPage < totalPages - 1) {
			currentPage++;
		}
	}

	function prevPage() {
		if (currentPage > 0) {
			currentPage--;
		}
	}

	let { children }: { children: Snippet } = $props();
</script>

<div class="swipeable-container-wrapper">
	<div class="navigation-controls">
		<button
			class="nav-arrow left"
			onclick={prevPage}
			disabled={currentPage === 0}
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
			onclick={nextPage}
			disabled={currentPage === totalPages - 1}
			aria-label="Next page"
		>
			<i class="fas fa-chevron-right"></i>
		</button>
	</div>

	<div
		bind:this={container}
		class="swipeable-container"
		ontouchstart={handleTouchStart}
		ontouchmove={handleTouchMove}
		ontouchend={handleTouchEnd}
		style="transform: translateX(-{currentPage * 100}%)"
	>
		{@render children()}
	</div>
</div>

<style>
	.swipeable-container-wrapper {
		width: 100%;
		overflow: hidden;
		position: relative;
	}

	.swipeable-container {
		display: flex;
		transition: transform 0.3s ease;
		width: 100%;
		touch-action: pan-y;
	}

	.navigation-controls {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 10px 0;
		gap: 15px;
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
