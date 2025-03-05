<script lang="ts">
	import { formatTeamStats } from '$lib/common/util';
	import { Team } from '$lib/main/game.svelte';

	interface Props {
		team: Team;
	}

	const { team }: Props = $props();
</script>

<span class="team-info">
	<b>{team.name}</b>
	<br />
	<em>{formatTeamStats(team)}</em>
</span>

<style>
	.team-info {
		font-size: 0.95rem;
	}
</style>
