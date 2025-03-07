<script>
	import {
		LOCAL_STORAGE_ITEM_GameState,
		LOCAL_STORAGE_ITEM_SelectedTime
	} from '$lib/common/constants';

	function resetGame() {
		const confirmation = confirm(
			'Are you sure you want to reset the game? This action is unrecoverable.'
		);
		if (confirmation) {
			localStorage.removeItem(LOCAL_STORAGE_ITEM_GameState);
			localStorage.removeItem(LOCAL_STORAGE_ITEM_SelectedTime);

			location.reload(); // Refresh the page
		}
	}
</script>

<div class="reset">
	<button class="reset-game" onclick={resetGame}> Reset Game </button>
</div>

<style>
	.reset {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.reset button {
		background-color: #f44336;
		color: white;
		font-weight: bold;
	}
</style>
