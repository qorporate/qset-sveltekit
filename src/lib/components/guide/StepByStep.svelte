<script lang="ts">
	import type { StepByStepItem } from '$lib/common/types';
	import DemoItem from './DemoItem.svelte';
	import DemoItemVideo from './DemoItemVideo.svelte';

	interface Props {
		visible: boolean;
	}

	const { visible }: Props = $props();
	const demoItems: StepByStepItem[] = [
		{
			title: '1. Adding Teams',
			description: 'Type team names and use Add Team button to build your queue',
			videoSrc: './assets/mp4/1-add-team.mp4'
		},
		{
			title: '2. Edit Teams',
			description: 'Click the pencil button to change the names of teams in your session.',
			videoSrc: './assets/mp4/2-edit-team.mp4'
		},
		{
			title: '3. Removing Teams',
			description: 'Click the trash button to remove a team from the session.',
			videoSrc: './assets/mp4/3-remove-team.mp4'
		},
		{
			title: '4. Team Wins',
			description: 'Record a win for a team by tapping the button with their name on it.',
			videoSrc: './assets/mp4/4-team-wins.mp4',
			additionalDescription:
				'If there are teams in the queue, the losing team will be swapped with the first team in line.'
		},
		// todo: need to add the video for  when a team wins with users in the queue
		{
			title: '5. Teams Draw',
			description:
				'Click the draw button to record a draw for both teams in the match. When teams draw, they are both swapped out for the first two teams in the queue.',
			videoSrc: './assets/mp4/6-teams-draw.mp4',
			additionalDescription:
				'<em>Note:</em> The draw button only appears when there are 2 or more teams in the queue.'
		},
		{
			title: '6. Reorder teams in the queue',
			description:
				'Click the up and down arrows to move teams around in the queue. The first team in the queue is the team that will play next.',
			videoSrc: './assets/mp4/7-move-team-in-queue.mp4'
		},
		{
			title: '7. Swap teams out of the match',
			description:
				'Click the swap button to swap a team out of the match. The team will be replaced by the first team in the queue.',
			videoSrc: './assets/mp4/8-swap-teams-out.mp4'
		},
		{
			title: '8. Use undo/redo to fix mistakes',
			description:
				'Click the undo and redo buttons to undo or redo actions in your session and fix mistakes.',
			videoSrc: './assets/mp4/9-undo-redo.mp4'
		},
		{
			title: '9. Reset the session',
			description:
				'Click the reset button to clear the session and start afresh. Note that this action cannot be undone.',
			videoSrc: './assets/mp4/10-reset-game.mp4'
		}
	];
</script>

{#if visible}
	<div class="card">
		<h2 class="section-title">Step-by-Step Guide</h2>
		<div class="demo-grid">
			{#each demoItems as item, index}
				<DemoItem {...item} />

				{#if index === 3}
					<DemoItemVideo videoSrc="/assets/mp4/5-team-wins-with-queue.mp4" />
				{/if}
			{/each}
		</div>
	</div>
{/if}

<style>
	.card {
		background: white;
		border-radius: 8px;
		border: 1px solid #eee;
		padding: 1.5rem;
		margin-bottom: 1rem;
	}

	.demo-grid {
		display: grid;
		gap: 1rem;
		margin-top: 1rem;
	}
</style>
