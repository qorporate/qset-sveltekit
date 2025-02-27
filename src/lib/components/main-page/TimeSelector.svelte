<script lang="ts">
	import { CurrentState } from '$lib/common/enums';
	import { game } from '$lib/main/game.svelte';
	import { timerManager } from '$lib/main/time.svelte';

	let customTimeInput = $state('');
	const isRunning = $derived(timerManager.isRunning);

	// Derived values
	const timeOptions = $derived(timerManager.timeOptions);
	const selectedTime = $derived(timerManager.selectedTime);
	const isMatchInProgress = $derived(game.currentState === CurrentState.MATCH_IN_PROGRESS);

	// Set custom time
	function setCustomTime() {
		const minutes = parseInt(customTimeInput);
		if (!isNaN(minutes) && minutes > 0) {
			timerManager.setTime(minutes);
		}

		customTimeInput = '';
	}
</script>

<div class="time-selector">
	<h2>Game Timer</h2>

	<div class="time-options">
		{#each timeOptions as option}
			<button
				class="time-option {selectedTime === option.value ? 'active' : ''}"
				onclick={() => timerManager.setTime(option.value)}
			>
				{option.label}
			</button>
		{/each}
	</div>

	<div class="custom-time">
		<input type="number" bind:value={customTimeInput} placeholder="Custom (mins)" min="1" />
		<button class="set-btn" onclick={setCustomTime}>Set</button>
	</div>

	<div class="timer-controls">
		{#if isRunning}
			<button
				class="control-btn pause"
				disabled={!isMatchInProgress}
				aria-label="Pause"
				onclick={() => timerManager.pauseTimer()}
			>
				<i class="fa fa-pause" aria-hidden="true"></i>
			</button>
		{:else}
			<button
				class="control-btn resume"
				disabled={!isMatchInProgress}
				aria-label="Start or Play"
				onclick={() => timerManager.resumeTimer()}
			>
				<i class="fa fa-play" aria-hidden="true"></i>
			</button>
		{/if}
		<button
			class="control-btn reset"
			disabled={!isMatchInProgress}
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

	h2 {
		margin: 0 0 15px 0;
		font-size: 1.2rem;
	}

	.time-options {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 8px;
		margin-bottom: 15px;
	}

	.time-option {
		background-color: #f0f0f0;
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 10px;
		cursor: pointer;
		font-size: 0.875rem;
		text-align: center;
	}

	.time-option.active {
		background-color: #4caf50;
		color: white;
		border-color: #4caf50;
	}

	.custom-time {
		display: flex;
		gap: 5px;
		margin-bottom: 15px;
	}

	.custom-time input {
		flex-grow: 1;
		padding: 10px;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 0.875rem;
		appearance: textfield;
		-moz-appearance: textfield;
	}

	.custom-time input::-webkit-outer-spin-button,
	.custom-time input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.set-btn {
		background-color: #4caf50;
		color: white;
		border: none;
		border-radius: 4px;
		padding: 10px 15px;
		cursor: pointer;
		font-size: 0.875rem;
	}

	/* Controls */
	.timer-controls {
		display: flex;
		justify-content: center;
		gap: 15px;
	}

	.control-btn {
		display: flex;
		align-items: center;
		justify-content: center;

		width: 80px;
		height: 40px;

		border: none;
		border-radius: 4px;

		cursor: pointer;
		font-size: 1rem;
		transition: all 0.2s;
	}

	.control-btn:enabled:hover {
		opacity: 0.9;
	}

	.control-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
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

	@media (min-width: 480px) {
		.time-options {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
