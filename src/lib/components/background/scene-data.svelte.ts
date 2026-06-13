import { CABIN_SCENE } from './cabin';
import { COAST_SCENE } from './coast';
import {
	CircleStructure,
	ColorId,
	RectStructure,
	SceneId,
	TriStructure,
	type Scene
} from './scene-types';

const shapeToInt = (shape: CircleStructure | RectStructure | TriStructure): number => {
	if (shape instanceof CircleStructure) {
		return 0;
	} else if (shape instanceof RectStructure) {
		return 1;
	} else if (shape instanceof TriStructure) {
		return 2;
	} else {
		throw new Error('Invalid structure type');
	}
};

export const prepareScenes = (scenes: Record<SceneId, Scene>) => {
	const result: Record<SceneId, Scene> = {
		[SceneId.CABIN]: {
			structure: []
		},
		[SceneId.COAST]: {
			structure: []
		}
	};

	for (const key in scenes) {
		const id = key as unknown as SceneId;

		for (const s of scenes[id].structure) {
			if (s instanceof CircleStructure) {
				result[id].structure.push(new CircleStructure(s.x, s.y, s.r, s.ci));
			} else if (s instanceof RectStructure) {
				result[id].structure.push(new RectStructure(s.x, s.y, s.w, s.h, s.a, s.ci));
			} else if (s instanceof TriStructure) {
				result[id].structure.push(new TriStructure(s.x, s.y, s.r, s.a, s.ci));
			} else {
				throw new Error('Invalid structure type');
			}
		}
	}

	for (const scene of Object.values(result)) {
		let circleIndex = 0;
		let rectIndex = 0;
		let triIndex = 0;

		for (const s of scene.structure) {
			if (s instanceof CircleStructure) {
				s.id = `circle_${circleIndex++}`;
			} else if (s instanceof RectStructure) {
				s.id = `rect_${rectIndex++}`;
			} else if (s instanceof TriStructure) {
				s.id = `tri_${triIndex++}`;
			}
		}
	}

	return result;
};

export const SCENE_DATA = $state({
	[SceneId.CABIN]: CABIN_SCENE,
	[SceneId.COAST]: COAST_SCENE
} as Record<SceneId, Scene>);
