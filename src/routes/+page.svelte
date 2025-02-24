<script>
	import MatchDisplay from '$lib/components/main-page/MatchDisplay.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import QueueDisplay from '$lib/components/main-page/QueueDisplay.svelte';
	import Reset from '$lib/components/main-page/Reset.svelte';
	import TeamManagement from '$lib/components/main-page/TeamManagement.svelte';
	import UndoRedo from '$lib/components/main-page/UndoRedo.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';

	const SITE_URL = 'https://qset.qballxi.com';
	const DESCRIPTION = "Manage sets when playing sports. Add as many teams as you'd like.";
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
	<Nav page="home" />
	<UndoRedo />
	<MatchDisplay />
	<QueueDisplay />
	<TeamManagement />
	<Reset />
	<SvelteToast />
</main>
