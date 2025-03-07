<script lang="ts">
	import { truncate } from '$lib/common/util';
	import { game } from '$lib/main/game.svelte';

	// Calculate points (3 for win, 1 for draw)
	function calculatePoints(wins: number, draws: number): number {
		return wins * 3 + draws * 1;
	}

	// Get all teams from both match slots and queue
	function getAllTeams() {
		const teams = [...game.queue.items];

		if (game.slotA.team) {
			teams.push(game.slotA.team);
		}

		if (game.slotB.team) {
			teams.push(game.slotB.team);
		}

		return teams;
	}

	// Sort teams by points (descending), then by the streak (descending)
	let sortedTeams = $derived(
		getAllTeams().sort((a, b) => {
			const pointsA = calculatePoints(a.wins, a.draws);
			const pointsB = calculatePoints(b.wins, b.draws);

			if (pointsB !== pointsA) {
				return pointsB - pointsA;
			}

			return b.currentStreak - a.currentStreak;
		})
	);
</script>

<div class="league-table">
	{#if sortedTeams.length === 0}
		<p class="no-teams">No teams added yet</p>
	{:else}
		<div class="table-container">
			<table>
				<thead>
					<tr>
						<th>#</th>
						<th class="team-name">Team</th>
						<th>P</th>
						<th class="win">W</th>
						<th class="draw">D</th>
						<th class="loss">L</th>
						<th><i class="fa fa-fire" id="streak-icon" aria-hidden="true"></i></th>
						<th>Pts</th>
					</tr>
				</thead>
				<tbody>
					{#each sortedTeams as team, index}
						<tr>
							<td>
								{#if index === 0}
									<i class="fa fa-trophy" id="trophy" aria-hidden="true"></i>
								{:else}
									{index + 1}
								{/if}
							</td>
							<td class="team-name">{truncate(team.name)} </td>
							<td>{team.wins + team.draws + team.losses}</td>
							<td class="win">{team.wins}</td>
							<td class="draw">{team.draws}</td>
							<td class="loss">{team.losses}</td>
							<td>{team.currentStreak}</td>
							<td class="points">{calculatePoints(team.wins, team.draws)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<style>
	.league-table {
		padding: 10px;
	}

	.no-teams {
		text-align: center;
		color: #666;
		padding: 20px 0;
	}

	.table-container {
		overflow-x: auto;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 1rem;
	}

	th,
	td {
		padding: 8px;
		text-align: center;
		border-bottom: 1px solid #eee;
	}

	th {
		background-color: #f5f5f5;
		font-weight: bold;
	}

	#streak-icon {
		color: orange;
	}

	.win {
		color: green;
	}

	.draw {
		color: gray;
	}

	.loss {
		color: rgb(203, 8, 8);
	}

	.team-name {
		text-align: left;
		min-width: 50px;
		font-weight: bold;
	}

	#trophy {
		color: gold;
	}

	.points {
		font-weight: bold;
	}

	tr:nth-child(1) {
		background-color: rgba(76, 175, 80, 0.1);
	}

	tr:nth-child(2) {
		background-color: rgba(76, 175, 80, 0.05);
	}

	tr:last-child {
		border-bottom: none;
	}
</style>
