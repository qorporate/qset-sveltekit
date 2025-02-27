import { toast } from '@zerodevx/svelte-toast';

export function showErrorToast(m: string) {
	return toast.push(m, {
		theme: {
			'--toastColor': 'white',
			'--toastBackground': '#f44336',
			'--toastBarHeight': 0
		}
	});
}

export function showSuccessToast(message: string, callback?: () => void, duration: number = 3000) {
	return toast.push(message, {
		theme: {
			'--toastColor': 'white',
			'--toastBackground': '#059A1D',
			'--toastBarHeight': 0
		},
		duration,
		onpop: callback ? callback : undefined
	});
}
