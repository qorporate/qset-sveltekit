import { browser } from '$app/environment';
import {
	LOCAL_STORAGE_ITEM_SelectedTime,
	LOCAL_STORAGE_ITEM_RemainingSeconds,
	LOCAL_STORAGE_ITEM_EndTime
} from '$lib/common/constants';
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

			// add event listener for before unload to save state. this will hit on accidental reloads
			window.addEventListener('beforeunload', () => {
				if (this.isRunning) {
					// save the remaining time to localStorage
					localStorage.setItem(
						LOCAL_STORAGE_ITEM_RemainingSeconds,
						this.remainingSeconds.toString()
					);
					localStorage.setItem(LOCAL_STORAGE_ITEM_EndTime, this.endTimeInMs?.toString() || '');
				}
			});
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
			clearInterval(this.intervalId!);

			// Only show non-dismissible toast when page is visible
			if (!document.hidden) {
				showNonDismissibleSuccessToast("Time's up!");
			}
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
				// page is hidden, stop interval and rely on timestamps
				clearInterval(this.intervalId!);
				this.intervalId = null;
			} else {
				// page is visible again, update remaining time
				this.updateRemainingTime();

				// Check if timer completed while page was hidden
				if (this.remainingSeconds <= 0) {
					this.pauseTimer();
					return;
				}

				// restart interval updates
				this.intervalId = setInterval(() => {
					this.updateRemainingTime();
				}, 250) as unknown as number;
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
				try {
					this.selectedTimeInMinutes = parseInt(savedTime, 10);
					this.remainingSeconds = this.selectedTimeInMinutes * 60;

					// check if there was a running timer when the page was closed
					const savedEndTime = localStorage.getItem(LOCAL_STORAGE_ITEM_EndTime);
					if (savedEndTime) {
						const endTimeInMs = parseInt(savedEndTime, 10);
						const nowInMs = Date.now();

						// if the end time is in the future, resume the timer
						if (endTimeInMs > nowInMs) {
							this.endTimeInMs = endTimeInMs;
							this.remainingSeconds = Math.ceil((endTimeInMs - nowInMs) / 1000);
							this.startTimer();
						}

						// clear the saved end time
						localStorage.removeItem(LOCAL_STORAGE_ITEM_EndTime);
						localStorage.removeItem(LOCAL_STORAGE_ITEM_RemainingSeconds);
					}
				} catch (error) {
					console.error('Error loading saved time:', error);
				}
			}
		} else {
			console.debug("Can't load time. Not on browser yet.");
		}
	}
}

export const timerManager = new TimerManager();
