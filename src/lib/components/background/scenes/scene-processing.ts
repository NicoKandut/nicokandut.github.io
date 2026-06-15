import { Circle, copy, Rectangle, Triangle } from '$lib/components/background/scenes/primitive';
import { type Scene } from '$lib/components/background/scenes/scenes.svelte';

export const prepareScenes = (scenes: Scene[]) => {
	const result: Scene[] = scenes.map((scene) => {
		return scene.map(copy);
	});

	for (const scene of Object.values(result)) {
		let circleIndex = 0;
		let rectIndex = 0;
		let triIndex = 0;

		for (const s of scene) {
			if (s instanceof Circle) {
				s.id = `circle_${circleIndex++}`;
			} else if (s instanceof Rectangle) {
				s.id = `rect_${rectIndex++}`;
			} else if (s instanceof Triangle) {
				s.id = `tri_${triIndex++}`;
			}
		}
	}

	return result;
};
