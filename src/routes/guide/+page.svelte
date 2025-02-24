<script>
	import { GuidePageSection } from '$lib/common/enums';
	import GuideNav from '$lib/components/guide-page/GuideNav.svelte';
	import StepByStep from '$lib/components/guide-page/StepByStep.svelte';
	import VideoGuide from '$lib/components/guide-page/VideoGuide.svelte';
	import Nav from '$lib/components/Nav.svelte';

	const SITE_URL = 'https://qset.qballxi.com/guide';
	const DESCRIPTION = 'Learn to use QSet.';

	let activePage = $state(GuidePageSection.VideoGuide);
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
	<Nav page="guide" />
	<GuideNav bind:activePage />
	<VideoGuide visible={activePage === GuidePageSection.VideoGuide} />
	<StepByStep visible={activePage === GuidePageSection.StepByStep} />
</main>
