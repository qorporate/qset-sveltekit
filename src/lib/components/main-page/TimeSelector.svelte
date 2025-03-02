<script lang="ts">
	import { CurrentState } from '$lib/common/enums';
	import { game } from '$lib/main/game.svelte';
	import { timerManager } from '$lib/main/time.svelte';

	let customTimeInput = $state('');
	let showCustomInput = $state(false);
	let errorMessage = $state('');

	const isTimerRunning = $derived(timerManager.isRunning);
	const remainingSeconds = $derived(timerManager.remainingSeconds);
	const isMatchInProgress = $derived(game.currentState === CurrentState.MATCH_IN_PROGRESS);

	// Derived value to determine whether to show time selection or controls
	const showTimeSelection = $derived(
		!isTimerRunning &&
			(remainingSeconds === 0 || remainingSeconds === timerManager.selectedTime * 60)
	);

	const isTimeEqualToZero = $derived(remainingSeconds === 0);

	function setAndStartTimer(minutes: number) {
		timerManager.setTime(minutes);
		timerManager.startTimer();
	}

	function showCustomTimeInput() {
		showCustomInput = true;
		errorMessage = '';
	}

	function setCustomTime() {
		const minutes = parseInt(customTimeInput);
		if (isNaN(minutes) || minutes < 1) {
			errorMessage = 'Please enter a valid number (minimum 1 minute)';
		} else {
			setAndStartTimer(minutes);
			showCustomInput = false;
			customTimeInput = '';
			errorMessage = '';
		}
	}

	function cancelCustomTime() {
		showCustomInput = false;
		customTimeInput = '';
		errorMessage = '';
	}
</script>

<div class="time-selector" hidden={!isMatchInProgress}>
	<h2>Timer</h2>

	{#if showTimeSelection}
		{#if showCustomInput}
			<div class="custom-time">
				<input
					type="number"
					bind:value={customTimeInput}
					placeholder="Enter minutes"
					min="1"
					class:error={errorMessage !== ''}
				/>
				<div class="custom-time-buttons">
					<button class="cancel-btn" onclick={cancelCustomTime}>Cancel</button>
					<button class="set-btn" onclick={setCustomTime}>Set</button>
				</div>
			</div>
			{#if errorMessage}
				<p class="error-message">{errorMessage}</p>
			{/if}
		{:else}
			<div class="time-options">
				<button class="time-option" onclick={() => setAndStartTimer(7)}>7 mins</button>
				<button class="time-option" onclick={() => setAndStartTimer(10)}>10 mins</button>
				<button class="time-option" onclick={showCustomTimeInput}>Custom</button>
			</div>
		{/if}
	{/if}

	<!-- When the custom input field is active, we don't want to show pause/play, no matter what -->
	{#if !showCustomInput}
		<!-- For all control buttons, we want them disabled when the time is not set (= 0 minutes) -->
		<div class="timer-controls">
			{#if !isTimeEqualToZero}
				{#if isTimerRunning}
					<button
						class="control-btn pause"
						aria-label="Pause"
						onclick={() => timerManager.pauseTimer()}
					>
						<i class="fa fa-pause" aria-hidden="true"></i>
					</button>
				{:else}
					<button
						class="control-btn resume"
						aria-label="Resume"
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
			{/if}
		</div>
	{/if}
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
		display: flex;
		justify-content: space-between;
		gap: 10px;
		margin-bottom: 15px;
	}

	.time-option {
		flex: 1;
		background-color: white;
		border: 1px solid #2196f3;
		border-radius: 4px;
		padding: 10px;
		cursor: pointer;
		font-size: 0.875rem;
		text-align: center;
	}

	.custom-time {
		display: flex;
		gap: 10px;
		margin-bottom: 5px;
	}

	.custom-time input {
		flex: 1;
		padding: 10px;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 0.875rem;
		appearance: textfield;
		-moz-appearance: textfield;
	}

	.custom-time input.error {
		border-color: #f44336;
	}

	.custom-time input::-webkit-outer-spin-button,
	.custom-time input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.set-btn,
	.cancel-btn {
		border: none;
		border-radius: 4px;
		padding: 10px 15px;
		cursor: pointer;
		font-size: 0.875rem;
		white-space: nowrap;
	}

	.set-btn {
		background-color: #4caf50;
		color: white;
	}

	.cancel-btn {
		background-color: #f44336;
		color: white;
	}

	.error-message {
		color: #f44336;
		font-size: 0.75rem;
		margin-top: 5px;
		margin-bottom: 10px;
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

	.custom-time-buttons {
		display: flex;
		gap: 10px;
	}

	@media (max-width: 424px) {
		.custom-time {
			flex-direction: column;
		}

		.custom-time input {
			width: 100%;
		}

		.custom-time-buttons {
			width: 100%;
		}

		.set-btn,
		.cancel-btn {
			flex: 1;
		}
	}
</style>
