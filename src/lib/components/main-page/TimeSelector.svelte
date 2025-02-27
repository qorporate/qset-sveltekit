<script lang="ts">
	import { timerManager } from '$lib/main/time.svelte';

	let customTimeInput = $state('');
	const isRunning = $derived(timerManager.isRunning);

	// Derived values
	const timeOptions = $derived(timerManager.timeOptions);
	const selectedTime = $derived(timerManager.selectedTime);

	// Set custom time
	function setCustomTime() {
		const minutes = parseInt(customTimeInput);
		if (!isNaN(minutes) && minutes > 0) {
			timerManager.setTime(minutes);
		}
	}
</script>

<div class="time-selector">
	<div class="selector-header">
		<h2>Game Timer</h2>
	</div>

	<div class="time-options">
		{#each timeOptions as option}
			<button
				class="time-option {selectedTime === option.value ? 'active' : ''}"
				onclick={() => timerManager.setTime(option.value)}
			>
				{option.label}
			</button>
		{/each}

		<div class="custom-time">
			<input type="number" bind:value={customTimeInput} placeholder="Custom (mins)" min="1" />
			<button class="set-btn" onclick={setCustomTime}>Set</button>
		</div>
	</div>

	<div class="timer-controls">
		{#if isRunning}
			<button class="control-btn pause" aria-label="Pause" onclick={() => timerManager.pauseTimer()}
				><i class="fa fa-pause" aria-hidden="true"></i>
			</button>
		{:else}
			<button
				class="control-btn resume"
				aria-label="Start or Play"
				onclick={() => timerManager.resumeTimer()}
			>
				<i class="fa fa-play" aria-hidden="true"></i>
			</button>
		{/if}
		<button
			class="control-btn reset"
			aria-label="Stop timer"
			onclick={() => timerManager.resetTimer()}
		>
			<i class="fa fa-stop" aria-hidden="true"></i>
		</button>
	</div>
</div>

<style>
	.time-selector {
		width: 100%;
		max-width: 600px;
		margin: 20px auto;
		border-top: 1px solid #ddd;
		padding-top: 10px;
	}

	.selector-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}

	.selector-header h2 {
		margin: 0;
		font-size: 1rem;
	}

	.time-options {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 15px;
	}

	.time-option {
		background-color: #f0f0f0;
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 5px 10px;
		cursor: pointer;
		font-size: 0.875rem;
	}

	.time-option.active {
		background-color: #4caf50;
		color: white;
		border-color: #4caf50;
	}

	.custom-time {
		display: flex;
		gap: 5px;
	}

	.custom-time input {
		width: 100px;
		padding: 5px;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 0.875rem;
	}

	.set-btn {
		background-color: #4caf50;
		color: white;
		border: none;
		border-radius: 4px;
		padding: 5px 10px;
		cursor: pointer;
		font-size: 0.875rem;
	}

	/* Controls */
	.timer-controls {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-top: 5px;
	}

	.control-btn {
		padding: 6px 12px;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-weight: bold;
		transition: all 0.2s;
		font-size: 0.875rem;
	}

	.resume {
		background-color: #4caf50;
		color: white;
	}

	.pause {
		background-color: #ffc107;
		color: black;
	}

	.reset {
		background-color: #f44336;
		color: white;
	}

	.control-btn:hover {
		opacity: 0.9;
	}
</style>
