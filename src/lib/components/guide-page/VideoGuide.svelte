<script lang="ts">
	interface Props {
		visible: boolean;
	}

	const { visible }: Props = $props();
</script>

<!-- I prefer to use hidden rather than an if block because i don't want the video to reload each time the section is opened -->
<div class="card" hidden={!visible}>
	<h2 class="section-title">Quick Start Video</h2>
	<div class="video-container">
		<iframe
			width="560"
			height="315"
			src="https://www.youtube.com/embed/BddSKlv6bTo?si=NEnG_Vimd_ZdkGu8"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
		></iframe>
	</div>
</div>

<style>
	.card {
		background: white;
		border-radius: 8px;
		border: 1px solid #eee;
		padding: 1.5rem;
		margin-bottom: 1rem;
	}

	.video-container {
		position: relative;
		padding-bottom: 56.25%;
		height: 0;
		overflow: hidden;
		margin-bottom: 1rem;
	}

	.video-container iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 4px;
	}
</style>
