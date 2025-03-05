<script lang="ts">
	import { game } from '$lib/main/game.svelte';

	// the initial game state doesn't count as 'undoable', hence we don't undo when stack length is at 1
	const isUndoButtonDisabled = $derived(game.undoStack.length <= 1);
	const isRedoButtonDisabled = $derived(game.redoStack.length === 0);
</script>

<div class="undo-redo-buttons">
	<button
		id="undo-button"
		aria-label="Undo"
		disabled={isUndoButtonDisabled}
		onclick={() => game.undo()}
	>
		<i class="fas fa-undo"></i> Undo
	</button>
	<button
		id="redo-button"
		aria-label="Redo"
		disabled={isRedoButtonDisabled}
		onclick={() => game.redo()}
	>
		<i class="fas fa-redo"></i> Redo
	</button>
</div>

<style>
	.undo-redo-buttons {
		display: flex;
		justify-content: center;
		margin-top: 10px;
	}

	#undo-button,
	#redo-button {
		padding: 10px 20px;
		margin: 0 5px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	#undo-button {
		background-color: #aad03d;
	}

	#undo-button:hover {
		background-color: #a9d03d9a;
	}

	#redo-button {
		background-color: #e27dc7;
	}

	#redo-button:hover {
		background-color: #e27dc788;
	}

	#undo-button:disabled,
	#redo-button:disabled {
		background-color: #f0f0f0;
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
