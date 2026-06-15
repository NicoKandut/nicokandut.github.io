<script lang="ts">
	import { COLOR_ABBREVIATIONS, COLOR_ID_SKY, COLOR_IDS } from '$lib/components/background/scenes/color';
	import { PALETTE_COUNT, PALETTES } from '$lib/components/background/scenes/palettes.svelte';
	import { Circle, equals, Rectangle, Triangle, type Primitive } from '$lib/components/background/scenes/primitive';
	import { prepareScenes } from '$lib/components/background/scenes/scene-processing';
	import { SCENE_COUNT, SCENE_DATA, type Scene } from '$lib/components/background/scenes/scenes.svelte';
	import { onMount } from 'svelte';
	import { on } from 'svelte/events';

	let currentSceneIndex = $state(0);
	const preparedScenes = $derived(prepareScenes(SCENE_DATA));
	const currentScene = $derived(SCENE_DATA[currentSceneIndex]);
	const currentPreparedScene = $derived(preparedScenes[currentSceneIndex]);

	let currentPaletteIndex = $state(0);
	const currentPalette = $derived(PALETTES[currentPaletteIndex]);

	const replaceCurrentScene = (scene: Scene) => {
		SCENE_DATA[currentSceneIndex] = scene;
	};

	const nextScene = () => {
		currentSceneIndex += 1;
		currentSceneIndex %= SCENE_COUNT;
	};

	const nextPalette = () => {
		currentPaletteIndex += 1;
		currentPaletteIndex %= PALETTE_COUNT;
		console.log('Current palette index:', currentPaletteIndex);
	};

	const cursorCoordinatesToViewBoxCoordinates = (x: number, y: number) => {
		const viewBoxWidth = 320;
		const viewBoxHeight = 180;

		const screenWidth = window.innerWidth;
		const screenHeight = window.innerHeight;

		const scale = Math.min(screenWidth / viewBoxWidth, screenHeight / viewBoxHeight);

		const offsetX = (screenWidth - viewBoxWidth * scale) / 2;
		const offsetY = (screenHeight - viewBoxHeight * scale) / 2;

		const viewBoxX = (x - offsetX) / scale;
		const viewBoxY = (y - offsetY) / scale;

		return { x: viewBoxX, y: viewBoxY };
	};

	const initialStructure = () => {
		return {
			stage: 'none',
			type: 'none',
			previousType: 'none',
			x: 0,
			y: 0,
			r: 10,
			w: 10,
			h: 10,
			a: 0,
			ci: 0
		};
	};

	let newStructure = $state(initialStructure());

	const resetNewStructure = () => {
		if (newStructure.previousType === 'none') {
			newStructure = initialStructure();
		} else {
			newStructure.stage = 'moving';
		}
	};

	function addNewStructureToScene() {
		let s!: Primitive;

		switch (newStructure.type) {
			case 'circle':
				s = new Circle(newStructure.x, newStructure.y, newStructure.r, newStructure.ci);
				break;
			case 'rect':
				s = new Rectangle(newStructure.x, newStructure.y, newStructure.w, newStructure.h, newStructure.a, newStructure.ci);
				break;
			case 'tri':
				s = new Triangle(newStructure.x, newStructure.y, newStructure.r, newStructure.a, newStructure.ci);
				break;
			default:
				throw new Error('Invalid structure type');
		}

		currentScene.push(s);
		resetNewStructure();
	}

	let deleteMode = $state(false);

	const formatCurrentState = () => {
		const strings: string[] = [];

		for (const s of currentScene) {
			if (s instanceof Circle) {
				strings.push(`new Circle(${s.x}, ${s.y}, ${s.r}, COLOR_ID_${COLOR_IDS[s.ci]}),`);
			} else if (s instanceof Rectangle) {
				strings.push(`new Rectangle(${s.x}, ${s.y}, ${s.w}, ${s.h}, ${s.a}, COLOR_ID_${COLOR_IDS[s.ci]}),`);
			} else if (s instanceof Triangle) {
				strings.push(`new Triangle(${s.x}, ${s.y}, ${s.r}, ${s.a}, COLOR_ID_${COLOR_IDS[s.ci]}),`);
			}
		}

		return strings.join('\n');
	};

	let circleCount = $derived(currentScene.filter((s) => s instanceof Circle).length);
	let rectCount = $derived(currentScene.filter((s) => s instanceof Rectangle).length);
	let triCount = $derived(currentScene.filter((s) => s instanceof Triangle).length);

	onMount(() => {
		return on(window, 'keydown', (e) => {
			if (e.key === 'Escape') {
				if (newStructure.stage === 'rotating' || newStructure.stage === 'scaling') {
					newStructure.stage = 'moving';
				} else if (newStructure.stage === 'moving') {
					newStructure.stage = 'none';
					newStructure.type = 'none';
					newStructure.previousType = 'none';
				}
			}
		});
	});
</script>

<div>
	<button onclick={() => nextScene()}> Change Scene </button>
	<button onclick={() => nextPalette()}> Change Palette </button>
	<span>MODE: {newStructure.stage}</span>
	<button
		onclick={() => {
			newStructure.type = 'circle';
			newStructure.stage = 'moving';
			newStructure.previousType = 'circle';
			deleteMode = false;
		}}
	>
		Circle
	</button>

	<button
		onclick={() => {
			newStructure.type = 'rect';
			newStructure.stage = 'moving';
			newStructure.previousType = 'rect';
			deleteMode = false;
		}}
	>
		Rectangle
	</button>

	<button
		onclick={() => {
			newStructure.type = 'tri';
			newStructure.stage = 'moving';
			newStructure.previousType = 'tri';
			deleteMode = false;
		}}
	>
		Triangle
	</button>

	<button
		onclick={() => {
			deleteMode = !deleteMode;
			newStructure.stage = 'none';
			newStructure.type = 'none';
			newStructure.previousType = 'none';
		}}
		class:active={deleteMode}
	>
		Delete
	</button>

	{#each Object.values(currentPalette) as c, i (i)}
		<button
			class:active={newStructure.ci === i}
			class="color-btn"
			style:background-color={c}
			onclick={() => {
				newStructure.ci = i;
			}}
		>
			{COLOR_ABBREVIATIONS[i]}
		</button>
	{/each}

	<span>{currentScene.length} Primitives, Circle: {circleCount}, Rectangle: {rectCount}, Triangle: {triCount}</span>
</div>

<!-- <textarea>{formatCurrentState()}</textarea> -->

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<svg
	class:delete-mode={deleteMode}
	viewBox="0 0 320 180"
	width="320"
	height="180"
	xmlns="http://www.w3.org/2000/svg"
	style:background-color={currentPalette[COLOR_ID_SKY]}
	onmousemove={(e) => {
		if (newStructure.stage === 'moving') {
			const { x, y } = cursorCoordinatesToViewBoxCoordinates(e.clientX, e.clientY);
			newStructure.x = x;
			newStructure.y = y;
		} else if (newStructure.stage === 'scaling') {
			const { x, y } = cursorCoordinatesToViewBoxCoordinates(e.clientX, e.clientY);
			const dx = x - newStructure.x;
			const dy = y - newStructure.y;
			if (newStructure.type === 'rect') {
				console.log(dx, dy);
				newStructure.w = dx;
				newStructure.h = dy;
			} else {
				newStructure.r = Math.sqrt(dx * dx + dy * dy);
			}
		} else if (newStructure.stage === 'rotating') {
			const { x, y } = cursorCoordinatesToViewBoxCoordinates(e.clientX, e.clientY);
			const dx = x - newStructure.x;
			const dy = y - newStructure.y;
			newStructure.a = (Math.atan2(dy, dx) * 180) / Math.PI;
		}
	}}
	onclick={() => {
		if (newStructure.stage === 'moving') {
			newStructure.stage = 'scaling';
		} else if (newStructure.stage === 'scaling') {
			if (newStructure.type === 'circle') {
				addNewStructureToScene();
				resetNewStructure();
			} else {
				newStructure.stage = 'rotating';
			}
		} else if (newStructure.stage === 'rotating') {
			addNewStructureToScene();
			resetNewStructure();
		}
	}}
>
	{#each currentPreparedScene as primitive (primitive.id)}
		{#if primitive instanceof Circle}
			<circle
				cx={primitive.x}
				cy={primitive.y}
				r={primitive.r}
				id={primitive.id}
				class={COLOR_IDS[primitive.ci]}
				fill={currentPalette[primitive.ci]}
				transform-origin="{primitive.x} {primitive.y}"
				onclick={() => {
					if (deleteMode) {
						let i = currentScene.findIndex((s) => equals(s, primitive));
						replaceCurrentScene(currentScene.splice(i));
					}
				}}
				style:--seed={primitive.x}
			/>
		{:else if primitive instanceof Rectangle}
			<rect
				x={primitive.x}
				y={primitive.y}
				width={primitive.w}
				height={primitive.h}
				id={primitive.id}
				class={COLOR_IDS[primitive.ci]}
				transform-origin="{primitive.x} {primitive.y}"
				transform="rotate({primitive.a} 0 0)"
				fill={currentPalette[primitive.ci]}
				onclick={() => {
					if (deleteMode) {
						let i = currentScene.findIndex((s) => equals(s, primitive));
						replaceCurrentScene(currentScene.splice(i));
					}
				}}
				style:--seed={primitive.x}
			/>
		{:else if primitive instanceof Triangle}
			{@const angle1 = 0}
			{@const angle2 = 120}
			{@const angle3 = 240}
			{@const x1 = Math.cos((angle1 * Math.PI) / 180)}
			{@const y1 = Math.sin((angle1 * Math.PI) / 180)}
			{@const x2 = Math.cos((angle2 * Math.PI) / 180)}
			{@const y2 = Math.sin((angle2 * Math.PI) / 180)}
			{@const x3 = Math.cos((angle3 * Math.PI) / 180)}
			{@const y3 = Math.sin((angle3 * Math.PI) / 180)}
			<polygon
				points="{x1},{y1} {x2},{y2} {x3},{y3}"
				id={primitive.id}
				class={COLOR_IDS[primitive.ci]}
				fill={currentPalette[primitive.ci]}
				transform-origin="{primitive.x} {primitive.y}"
				transform="rotate({primitive.a} 0 0) scale({primitive.r} {primitive.r}) translate({primitive.x} {primitive.y})"
				onclick={() => {
					if (deleteMode) {
						let i = currentScene.findIndex((s) => equals(s, primitive));
						replaceCurrentScene(currentScene.splice(i));
					}
				}}
				style:--seed={primitive.x}
			/>
		{/if}
	{/each}

	{#if newStructure.type === 'circle'}
		<circle id="new" cx={newStructure.x} cy={newStructure.y} r={newStructure.r} fill={currentPalette[newStructure.ci]} />
	{:else if newStructure.type === 'rect'}
		<rect
			id="new"
			x={newStructure.x}
			y={newStructure.y}
			width={newStructure.w}
			height={newStructure.h}
			fill={currentPalette[newStructure.ci]}
			transform-origin="{newStructure.x} {newStructure.y}"
			transform="rotate({newStructure.a} 0 0)"
		/>
	{:else if newStructure.type === 'tri'}
		{@const angle1 = newStructure.a}
		{@const angle2 = newStructure.a + 120}
		{@const angle3 = newStructure.a + 240}
		{@const x1 = newStructure.x + newStructure.r * Math.cos((angle1 * Math.PI) / 180)}
		{@const y1 = newStructure.y + newStructure.r * Math.sin((angle1 * Math.PI) / 180)}
		{@const x2 = newStructure.x + newStructure.r * Math.cos((angle2 * Math.PI) / 180)}
		{@const y2 = newStructure.y + newStructure.r * Math.sin((angle2 * Math.PI) / 180)}
		{@const x3 = newStructure.x + newStructure.r * Math.cos((angle3 * Math.PI) / 180)}
		{@const y3 = newStructure.y + newStructure.r * Math.sin((angle3 * Math.PI) / 180)}
		<polygon id="new" points="{x1},{y1} {x2},{y2} {x3},{y3}" fill={currentPalette[newStructure.ci]} />
	{/if}

	<!-- <rect id="frame" x="0" y="0" width="320" height="180" fill="none" stroke-width="1" stroke="red" />
	<line x1="160" y1="0" x2="160" y2="180" stroke-width="0.5" stroke="red" />
	<line x1="0" y1="90" x2="320" y2="90" stroke-width="0.5" stroke="red" /> -->
</svg>

<style>
	svg {
		position: absolute;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;

		z-index: -1;

		overflow: hidden;
	}

	svg,
	svg * {
		transition: all 0.5s ease;
		transition-delay: calc(var(--seed) * 2ms);
	}

	svg :global(*:not(.GROUND9):not(.CLOUD):not(.SUN)) {
		mix-blend-mode: darken;
	}

	textarea {
		position: fixed;
		top: 40px;
		left: 10px;
		min-width: 300px;
		min-height: 150px;
		z-index: 1;
		background-color: transparent;
	}

	#new {
		transition: unset;
	}

	div {
		position: fixed;
		bottom: 0px;
		display: flex;
		gap: 4px;
		padding: 4px;
		background-color: rgba(0, 0, 0, 0.8);
	}

	.color-btn {
		width: 20px;
		height: 20px;
		border: none;
		cursor: pointer;
	}

	.active {
		outline: 2px solid red;
	}

	svg.delete-mode *:hover {
		transition: none !important;
		fill: red !important;
	}

	span {
		color: white;
		font-size: 14px;
		font-family: sans-serif;
	}
</style>
