<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import BackgroundScene from '$lib/components/background/BackgroundScene.svelte';
	import { PaletteId, SceneId } from '$lib/components/background/scene-data.svelte';

	let { children } = $props();

	let sceneId = $state(SceneId.LAKE);
	let paletteId = $state(PaletteId.GREEN);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Nico Kandut</title>
</svelte:head>

<BackgroundScene id={sceneId} palette={paletteId}/>

<!-- <h1>WELCOME!</h1> -->

<button
	onclick={() => {
		sceneId = sceneId === SceneId.CABIN ? SceneId.LAKE : SceneId.CABIN;
	}}
>
	Change Scene
</button>

<button
	onclick={() => {
		paletteId = paletteId === PaletteId.GREEN ? PaletteId.RED : PaletteId.GREEN;
	}}
>
	Change Palette
</button>

{@render children()}

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
