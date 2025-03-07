<script lang="ts">
	import { timerManager } from '$lib/main/time.svelte';

	const formattedTime = $derived(timerManager.formattedTime);
</script>

<div class="timer-container">
	<div class="timer-display">
		{formattedTime}
	</div>
	<div class="vs">VS</div>
</div>

<style>
	.timer-container {
		display: flex;
		flex-direction: column;
		align-items: center;

		margin: 0 20px;
	}

	.timer-display {
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 5px;
	}

	.vs {
		margin: 5px 0;
		font-weight: bold;
		font-size: 1.5rem;
	}
</style>
