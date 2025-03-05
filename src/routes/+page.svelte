<script>
	import PageContent from '$lib/components/main-page/PageContent.svelte';

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
	<PageContent />
</main>
