<script lang="ts">
	import { CurrentState, Slot } from '$lib/common/enums';
	import { game } from '$lib/main/game.svelte';
	import MatchButtons from './MatchButtons.svelte';
	import MatchSlotComponent from './MatchSlotComponent.svelte';
	import Timer from './Timer.svelte';

	const isMatchInProgress = $derived(game.currentState === CurrentState.MATCH_IN_PROGRESS);

	const teamA = $derived(game.slotA.team!);
	const teamB = $derived(game.slotB.team!);
</script>

<div>
	{#if isMatchInProgress}
		<div class="current-match">
			<MatchSlotComponent team={teamA} slot={Slot.A} />
			<Timer />
			<MatchSlotComponent team={teamB} slot={Slot.B} />
		</div>
		<MatchButtons {teamA} {teamB} />
	{:else}
		<div class="current-match">
			<p>Waiting for teams...</p>
		</div>
	{/if}
</div>

<style>
	.current-match {
		display: flex;
		justify-content: space-around;
		align-items: center;

		margin: 20px 0;
		padding: 20px;

		background-color: #f8f8f8;
		border-radius: 8px;
	}
</style>
