<script lang="ts">
	import { onMount } from 'svelte';
	import {
		CircleStructure,
		COLOR_IDS,
		COLOR_NAMES,
		ColorId,
		PaletteId,
		PALETTES,
		prepareScenes,
		RectStructure,
		SCENE_DATA,
		TriStructure,
		type SceneId
	} from './scene-data.svelte';
	import { on } from 'svelte/events';
	import { fade } from 'svelte/transition';

	interface Props {
		id: SceneId;
		palette: PaletteId;
	}

	/**
	 * Converts cursor coordinates to viewBox coordinates.
	 * The viewbox is 320x180, but the screen can be of any size.
	 * The viewbox is centered on the screen, and scaled to fit the screen while maintaining its aspect ratio.
	 * @param x
	 * @param y
	 */
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

	let { id, palette }: Props = $props();

	let preparedScenes = $derived(prepareScenes(SCENE_DATA));

	let scene = $derived(preparedScenes[id]);
	let colors = $derived(PALETTES[palette]);

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
			ci: ColorId.GROUND0
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
		let s!: CircleStructure | RectStructure | TriStructure;

		switch (newStructure.type) {
			case 'circle':
				s = new CircleStructure(newStructure.x, newStructure.y, newStructure.r, newStructure.ci);
				break;
			case 'rect':
				s = new RectStructure(
					newStructure.x,
					newStructure.y,
					newStructure.w,
					newStructure.h,
					newStructure.a,
					newStructure.ci
				);
				break;
			case 'tri':
				s = new TriStructure(
					newStructure.x,
					newStructure.y,
					newStructure.r,
					newStructure.a,
					newStructure.ci
				);
				break;
			default:
				throw new Error('Invalid structure type');
		}

		SCENE_DATA[id].structure.push(s);
		resetNewStructure();
	}

	let deleteMode = $state(false);

	const formatCurrentState = () => {
		const strings: string[] = [];

		for (const s of scene.structure) {
			if (s instanceof CircleStructure) {
				strings.push(
					`new CircleStructure(${s.x}, ${s.y}, ${s.r}, ColorId.${COLOR_IDS[s.ci as ColorId]}),`
				);
			} else if (s instanceof RectStructure) {
				strings.push(
					`new RectStructure(${s.x}, ${s.y}, ${s.w}, ${s.h}, ${s.a}, ColorId.${COLOR_IDS[s.ci as ColorId]}),`
				);
			} else if (s instanceof TriStructure) {
				strings.push(
					`new TriStructure(${s.x}, ${s.y}, ${s.r}, ${s.a}, ColorId.${COLOR_IDS[s.ci as ColorId]}),`
				);
			}
		}

		return strings.join('\n');
	};

	let circleCount = $derived(scene.structure.filter((s) => s instanceof CircleStructure).length);
	let rectCount = $derived(scene.structure.filter((s) => s instanceof RectStructure).length);
	let triCount = $derived(scene.structure.filter((s) => s instanceof TriStructure).length);

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

	{#each Object.values(colors) as c, i (i)}
		<button
			class:active={newStructure.ci === i}
			class="color-btn"
			style:background-color={c}
			onclick={() => {
				newStructure.ci = i;
			}}
		>
			{COLOR_NAMES[i as ColorId]}
		</button>
	{/each}

	<span>{scene.structure.length} Shapes, C: {circleCount}, R: {rectCount}, T: {triCount}</span>
</div>

<textarea>{formatCurrentState()}</textarea>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<svg
	class:delete-mode={deleteMode}
	viewBox="0 0 320 180"
	width="320"
	height="180"
	xmlns="http://www.w3.org/2000/svg"
	style:background-color={colors[ColorId.SKY]}
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
	{#each scene.structure as structure (structure.id)}
		{#if structure instanceof CircleStructure}
			<circle
				cx={structure.x}
				cy={structure.y}
				r={structure.r}
				id={structure.id}
				class={COLOR_IDS[structure.ci as ColorId]}
				fill={colors[structure.ci]}
				transform-origin="{structure.x} {structure.y}"
				onclick={() => {
					if (deleteMode) {
						let index = SCENE_DATA[id].structure.findIndex(
							(s) =>
								s.x === structure.x &&
								s.y === structure.y &&
								(s instanceof CircleStructure ? s.r === structure.r : false)
						);
						SCENE_DATA[id].structure = SCENE_DATA[id].structure.filter((_, i) => i !== index);
					}
				}}
				style:--seed={structure.x}
				transition:fade
			/>
		{:else if structure instanceof RectStructure}
			<rect
				x={structure.x}
				y={structure.y}
				width={structure.w}
				height={structure.h}
				id={structure.id}
				class={COLOR_IDS[structure.ci as ColorId]}
				transform-origin="{structure.x} {structure.y}"
				transform="rotate({structure.a} 0 0)"
				fill={colors[structure.ci]}
				onclick={() => {
					if (deleteMode) {
						let index = SCENE_DATA[id].structure.findIndex(
							(s) =>
								s.x === structure.x &&
								s.y === structure.y &&
								(s instanceof RectStructure
									? s.w === structure.w && s.h === structure.h && s.a === structure.a
									: false)
						);
						SCENE_DATA[id].structure = SCENE_DATA[id].structure.filter((_, i) => i !== index);
					}
				}}
				style:--seed={structure.x}
				transition:fade
			/>
		{:else if structure instanceof TriStructure}
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
				id={structure.id}
				class={COLOR_IDS[structure.ci as ColorId]}
				fill={colors[structure.ci]}
				transform-origin="{structure.x} {structure.y}"
				transform="rotate({structure.a} 0 0) scale({structure.r} {structure.r}) translate({structure.x} {structure.y})"
				onclick={() => {
					if (deleteMode) {
						let index = SCENE_DATA[id].structure.findIndex(
							(s) =>
								s.x === structure.x &&
								s.y === structure.y &&
								(s instanceof TriStructure ? s.r === structure.r && s.a === structure.a : false)
						);
						SCENE_DATA[id].structure = SCENE_DATA[id].structure.filter((_, i) => i !== index);
					}
				}}
				style:--seed={structure.x}
				transition:fade
			/>
		{/if}
	{/each}

	{#if newStructure.type === 'circle'}
		<circle
			id="new"
			cx={newStructure.x}
			cy={newStructure.y}
			r={newStructure.r}
			fill={colors[newStructure.ci]}
		/>
	{:else if newStructure.type === 'rect'}
		<rect
			id="new"
			x={newStructure.x}
			y={newStructure.y}
			width={newStructure.w}
			height={newStructure.h}
			fill={colors[newStructure.ci]}
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
		<polygon id="new" points="{x1},{y1} {x2},{y2} {x3},{y3}" fill={colors[newStructure.ci]} />
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

	@keyframes a {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
