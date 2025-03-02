import { showNonDismissibleSuccessToast } from '$lib/common/my-toasts';

const DEFAULT_TIME_IN_MINUTES = 0;

export class TimerManager {
	selectedTime = $state(DEFAULT_TIME_IN_MINUTES);
	remainingSeconds = $state(DEFAULT_TIME_IN_MINUTES * 60);
	isRunning = $state(false);
	intervalId: number | null = $state(null);

	get formattedTime() {
		const minutes = Math.floor(this.remainingSeconds / 60);
		const seconds = this.remainingSeconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	}

	setTime(minutes: number) {
		this.pauseTimer();
		this.selectedTime = minutes;
		this.remainingSeconds = minutes * 60;
	}

	startTimer() {
		if (!this.isRunning && this.remainingSeconds > 0) {
			this.isRunning = true;
			this.intervalId = setInterval(() => {
				if (this.remainingSeconds > 0) {
					this.remainingSeconds--;
				} else {
					this.pauseTimer();
					showNonDismissibleSuccessToast('Times up!');
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
}

export const timerManager = new TimerManager();
