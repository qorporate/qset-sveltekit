<script lang="ts">
	interface Props {
		color: string;
		disabled?: boolean;
		ariaLabel: string;
		icon: string;
		onClick?: () => void;
	}

	const { color, disabled, ariaLabel, icon, onClick }: Props = $props();
</script>

<button
	class="action-button"
	{disabled}
	aria-label={ariaLabel}
	style:background-color={disabled ? '#ccc' : color}
	onclick={onClick}
>
	<i class="fas {icon}"></i>
</button>

<style>
	.action-button {
		color: white;
		padding: 5px 10px;
		font-size: 14px;
		width: 34px;
		height: 34px;
	}
</style>
