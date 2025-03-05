import { browser } from '$app/environment';
import { LOCAL_STORAGE_ITEM_SelectedTime } from '$lib/common/constants';
import { showNonDismissibleSuccessToast } from '$lib/common/my-toasts';

const DEFAULT_TIME_IN_MINUTES = 0;

export class TimerManager {
	selectedTime = $state(DEFAULT_TIME_IN_MINUTES);
    remainingSeconds = $state(DEFAULT_TIME_IN_MINUTES * 60);
    isRunning = $state(false);
    
    // Track precise start and remaining time
    private startTime = 0;
	private pausedTime = 0;
    private animationFrameId: number | null = null;

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
			// If timer was paused, adjust start time
			if (this.pausedTime > 0) {
				// Adjust start time to account for pause duration
				const pauseDuration = Date.now() - this.pausedTime;
				this.startTime += pauseDuration;
				this.pausedTime = 0;
			} else {
				// Fresh start
				this.startTime = Date.now();
			}
	
			this.isRunning = true;
			this.tick();
		}
	}

	private tick() {
        if (!this.isRunning) return;

        const currentTime = Date.now();
        const elapsedTime = Math.floor((currentTime - this.startTime) / 1000);
        this.remainingSeconds = Math.max(this.selectedTime * 60 - elapsedTime, 0);

        if (this.remainingSeconds > 0) {
            // Use requestAnimationFrame for more precise timing
            this.animationFrameId = requestAnimationFrame(() => this.tick());
        } else {
            this.pauseTimer();
            showNonDismissibleSuccessToast("Time's up!");
        }
    }

	pauseTimer() {
		if (this.isRunning) {
            // Cancel animation frame
            if (this.animationFrameId) {
                cancelAnimationFrame(this.animationFrameId);
                this.animationFrameId = null;
            }
            
            // Record the pause time
            this.pausedTime = Date.now();
            
            // Update remaining time precisely
            const currentTime = Date.now();
            const elapsedTime = Math.floor((currentTime - this.startTime) / 1000);
            this.remainingSeconds = Math.max(this.selectedTime * 60 - elapsedTime, 0);
            
            this.isRunning = false;
        }
	}

	resumeTimer() {
		this.startTimer();
	}

	resetTimer() {
		this.pauseTimer();
    this.remainingSeconds = this.selectedTime * 60;
    this.startTime = 0;
    this.pausedTime = 0;
	}

	saveTime() {
		localStorage.setItem(LOCAL_STORAGE_ITEM_SelectedTime, this.selectedTime.toString());
	}

	loadSavedTime() {
		if (browser) {
            const savedTime = localStorage.getItem(LOCAL_STORAGE_ITEM_SelectedTime);
            if (savedTime) {
                try {
                    this.selectedTime = parseInt(savedTime, 10);
                    this.remainingSeconds = this.selectedTime * 60;
                } catch (error) {
                    console.error('Error loading saved time:', error);
                }
            }
        }	console.debug("Can't load time. Not on browser yet.");
	}
}

export const timerManager = new TimerManager();
