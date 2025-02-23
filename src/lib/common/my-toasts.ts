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
