<script>
	import MatchDisplay from '$lib/components/MatchDisplay.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import QueueDisplay from '$lib/components/QueueDisplay.svelte';
	import Reset from '$lib/components/Reset.svelte';
	import TeamManagement from '$lib/components/TeamManagement.svelte';
	import UndoRedo from '$lib/components/UndoRedo.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
</script>

<main class="container">
	<Nav page="home" />
	<UndoRedo />
	<MatchDisplay />
	<QueueDisplay />
	<TeamManagement />
	<Reset />
	<SvelteToast />
</main>
