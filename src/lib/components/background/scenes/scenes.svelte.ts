import { CABIN_SCENE } from '$lib/components/background/scenes/cabin';
import { COAST_SCENE } from '$lib/components/background/scenes/coast';
import type { Primitive } from '$lib/components/background/scenes/primitive';

export type Scene = Primitive[];

export const SCENE_ID_CABIN = 0;
export const SCENE_ID_COAST = 1;

export const SCENE_DATA = $state([CABIN_SCENE, COAST_SCENE] as Scene[]);
export const SCENE_COUNT = Object.keys(SCENE_DATA).length;
