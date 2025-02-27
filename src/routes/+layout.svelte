<script>
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import '$lib/styles/main.css';
	import posthog from 'posthog-js';
	import { browser } from '$app/environment';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { onMount } from 'svelte';

	async function detectSWUpdate() {
		const registration = await navigator.serviceWorker.ready;

		registration.addEventListener('updatefound', () => {
			const newWorker = registration.installing;
			newWorker?.addEventListener('statechange', () => {
				if (newWorker.state === 'installed') {
					if (confirm('New update available! Reload to update?')) {
						newWorker.postMessage({ type: 'SKIP_WAIT' });
						window.location.reload();
					}
				}
			});
		});
	}

	if (browser) {
		beforeNavigate(() => posthog.capture('$pageleave'));
		afterNavigate(() => posthog.capture('$pageview'));
	}

	onMount(() => {
		detectSWUpdate();
	});

	let { children } = $props();
</script>

{@render children()}
