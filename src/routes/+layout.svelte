<script lang="ts">
	import './font.css';
	import favicon from '$lib/assets/favicon.svg';
	import BackgroundScene from '$lib/components/background/BackgroundScene.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Nico Kandut</title>
</svelte:head>

<BackgroundScene />

{@render children()}

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
