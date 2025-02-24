<script>
	import FeedbackForm from '$lib/components/feedback-page/FeedbackForm.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';

	const SITE_URL = 'https://qset.qballxi.com/feedback';
	const DESCRIPTION = 'Learn to use QSet.';
</script>

<svelte:head>
	<meta name="description" content={DESCRIPTION} />

	<!-- Open Graph  -->
	<meta property="og:title" content="QSet" />
	<meta property="og:description" content={DESCRIPTION} />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:type" content="website" />

	<title>QSet</title>
</svelte:head>

<main class="container">
	<Nav page="feedback" />
	<FeedbackForm />
	<SvelteToast />
</main>
