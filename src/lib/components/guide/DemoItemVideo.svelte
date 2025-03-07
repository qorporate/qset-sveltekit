<script lang="ts">
	interface Props {
		videoSrc: string;
	}

	const { videoSrc }: Props = $props();
</script>

<div class="gif-container">
	<!-- svelte-ignore a11y_media_has_caption -->
	<video class="responsive-gif" src={videoSrc} autoplay loop></video>
</div>

<style>
	.gif-container {
		width: 100%;
		height: auto;
		max-width: 400px;
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.responsive-gif {
		width: 100%;
		height: auto;
		object-fit: contain;
	}
</style>
