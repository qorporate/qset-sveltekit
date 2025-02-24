<script>
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import '$lib/styles/main.css';
	import posthog from 'posthog-js';
	import { browser } from '$app/environment';
	import { afterNavigate, beforeNavigate } from '$app/navigation';

	if (browser) {
		beforeNavigate(() => posthog.capture('$pageleave'));
		afterNavigate(() => posthog.capture('$pageview'));
	}

	let { children } = $props();
</script>

{@render children()}
