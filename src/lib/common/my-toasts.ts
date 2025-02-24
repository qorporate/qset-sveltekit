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

export function showSuccessToast(message: string) {
	return toast.push(message, {
		theme: {
			'--toastColor': 'white',
			'--toastBackground': '#059A1D',
			'--toastBarHeight': 0
		}
	});
}
