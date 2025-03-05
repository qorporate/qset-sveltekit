import { browser } from '$app/environment';
import { LOCAL_STORAGE_ITEM_SelectedTime } from '$lib/common/constants';
import { showNonDismissibleSuccessToast } from '$lib/common/my-toasts';

const DEFAULT_TIME_IN_MINUTES = 0;

export class TimerManager {
	selectedTimeInMinutes = $state(DEFAULT_TIME_IN_MINUTES);
	remainingSeconds = $state(DEFAULT_TIME_IN_MINUTES * 60);

	startTimeInMs: number | null = $state(null);
	endTimeInMs: number | null = $state(null);

	isRunning = $state(false);
	intervalId: number | null = $state(null);

	constructor() {
		this.loadSavedTime();

		// Add event listener for page visibility change
		if (browser) {
			document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
		}
	}

	get formattedTime() {
		const minutes = Math.floor(this.remainingSeconds / 60);
		const seconds = this.remainingSeconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	}

	setTime(minutes: number) {
		this.pauseTimer();
		this.selectedTimeInMinutes = minutes;
		this.remainingSeconds = minutes * 60;
		this.saveTime();
	}

	startTimer() {
		if (!this.isRunning && this.remainingSeconds > 0) {
			this.isRunning = true;
			this.startTimeInMs = Date.now();
			this.endTimeInMs = this.startTimeInMs + this.remainingSeconds * 1000;

			// Clear any existing interval
			if (this.intervalId) {
				clearInterval(this.intervalId);
			}

			this.intervalId = setInterval(() => {
				this.updateRemainingTime();
			}, 250) as unknown as number; // More frequent updates for responsiveness
		}
	}

	updateRemainingTime() {
		if (!this.endTimeInMs) {
			return;
		}

		const currentTime = Date.now();
		const remainingTime = Math.max(0, Math.ceil((this.endTimeInMs - currentTime) / 1000));

		this.remainingSeconds = remainingTime;

		if (remainingTime <= 0) {
			this.pauseTimer();
			showNonDismissibleSuccessToast("Time's up!");
		}
	}

	pauseTimer() {
		if (this.isRunning) {
			clearInterval(this.intervalId!);
			this.intervalId = null;
			this.isRunning = false;

			// Recalculate remaining time when pausing
			if (this.endTimeInMs && this.startTimeInMs) {
				const currentTime = Date.now();
				this.remainingSeconds = Math.max(0, Math.ceil((this.endTimeInMs - currentTime) / 1000));
			}
		}
	}

	resumeTimer() {
		if (!this.isRunning && this.remainingSeconds > 0) {
			this.startTimeInMs = Date.now();
			this.endTimeInMs = this.startTimeInMs + this.remainingSeconds * 1000;
			this.startTimer();
		}
	}

	resetTimer() {
		this.pauseTimer();
		this.remainingSeconds = this.selectedTimeInMinutes * 60;
		this.startTimeInMs = null;
		this.endTimeInMs = null;
	}

	// Handle page visibility changes to ensure accurate timing
	handleVisibilityChange() {
		if (this.isRunning) {
			if (document.hidden) {
				// Page is hidden, stop interval and rely on timestamps
				clearInterval(this.intervalId!);
				this.intervalId = null;
			} else {
				// Page is visible again, update remaining time
				this.updateRemainingTime();

				// Restart interval updates
				this.intervalId = setInterval(() => {
					this.updateRemainingTime();
				}, 250);
			}
		}
	}

	saveTime() {
		localStorage.setItem(LOCAL_STORAGE_ITEM_SelectedTime, this.selectedTimeInMinutes.toString());
	}

	loadSavedTime() {
		if (browser) {
			const savedTime = localStorage.getItem(LOCAL_STORAGE_ITEM_SelectedTime);
			if (savedTime) {
				this.selectedTimeInMinutes = parseInt(savedTime, 10);
				this.remainingSeconds = this.selectedTimeInMinutes * 60;
			}
		}
	}
}

export const timerManager = new TimerManager();
