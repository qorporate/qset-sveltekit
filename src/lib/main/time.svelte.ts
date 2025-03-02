import { browser } from '$app/environment';
import { LOCAL_STORAGE_ITEM_SelectedTime } from '$lib/common/constants';
import { showNonDismissibleSuccessToast } from '$lib/common/my-toasts';

const DEFAULT_TIME_IN_MINUTES = 0;

export class TimerManager {
	selectedTime = $state(DEFAULT_TIME_IN_MINUTES);
	remainingSeconds = $state(DEFAULT_TIME_IN_MINUTES * 60);
	isRunning = $state(false);
	intervalId: number | null = $state(null);

	constructor() {
		this.loadSavedTime();
	}

	get formattedTime() {
		const minutes = Math.floor(this.remainingSeconds / 60);
		const seconds = this.remainingSeconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	}

	setTime(minutes: number) {
		this.pauseTimer();
		this.selectedTime = minutes;
		this.remainingSeconds = minutes * 60;
		this.saveTime();
	}

	startTimer() {
		if (!this.isRunning && this.remainingSeconds > 0) {
			this.isRunning = true;
			this.intervalId = setInterval(() => {
				if (this.remainingSeconds > 0) {
					this.remainingSeconds--;
				} else {
					this.pauseTimer();
					showNonDismissibleSuccessToast("Time's up!");
				}
			}, 1000) as unknown as number;
		}
	}

	pauseTimer() {
		if (this.isRunning) {
			clearInterval(this.intervalId!);
			this.intervalId = null;
			this.isRunning = false;
		}
	}

	resumeTimer() {
		this.startTimer();
	}

	resetTimer() {
		this.pauseTimer();
		this.remainingSeconds = this.selectedTime * 60;
	}

	saveTime() {
		localStorage.setItem(LOCAL_STORAGE_ITEM_SelectedTime, this.selectedTime.toString());
	}

	loadSavedTime() {
		if (browser) {
			const savedTime = localStorage.getItem(LOCAL_STORAGE_ITEM_SelectedTime);
			if (savedTime) {
				this.selectedTime = parseInt(savedTime, 10);
				this.remainingSeconds = this.selectedTime * 60;
			}
		}

		console.debug("Can't load time. Not on browser yet.");
	}
}

export const timerManager = new TimerManager();
