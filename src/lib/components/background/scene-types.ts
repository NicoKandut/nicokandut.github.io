export enum SceneId {
	CABIN,
	COAST
}

export enum PaletteId {
	RED,
	GREEN
}

export enum ColorId {
	SKY = 0,
	SUN,
	MOON,
	CLOUD,
	GROUND0,
	GROUND1,
	GROUND2,
	GROUND3,
	GROUND4,
	GROUND5,
	GROUND6,
	GROUND7,
	GROUND8,
	GROUND9
}

export class Structure {
	x: number;
	y: number;
	ci: ColorId;
	id: string;

	constructor(x: number, y: number, ci: ColorId) {
		this.x = x;
		this.y = y;
		this.ci = ci;
		this.id = 'unset';
	}
}

export class CircleStructure extends Structure {
	r: number;

	constructor(x: number, y: number, r: number, ci: ColorId) {
		super(x, y, ci);
		this.r = r;
	}
}

export class RectStructure extends Structure {
	w: number;
	h: number;
	a: number;

	constructor(x: number, y: number, w: number, h: number, a: number, ci: ColorId) {
		super(x, y, ci);
		this.w = w;
		this.h = h;
		this.a = a;
	}
}

export class TriStructure extends Structure {
	r: number;
	a: number;

	constructor(x: number, y: number, r: number, a: number, ci: ColorId) {
		super(x, y, ci);
		this.r = r;
		this.a = a;
	}
}

export interface Scene {
	structure: Array<CircleStructure | RectStructure | TriStructure>;
}

export const COLOR_IDS: Record<ColorId, string> = {
	[ColorId.SKY]: 'SKY',
	[ColorId.SUN]: 'SUN',
	[ColorId.MOON]: 'MOON',
	[ColorId.CLOUD]: 'CLOUD',
	[ColorId.GROUND0]: 'GROUND0',
	[ColorId.GROUND1]: 'GROUND1',
	[ColorId.GROUND2]: 'GROUND2',
	[ColorId.GROUND3]: 'GROUND3',
	[ColorId.GROUND4]: 'GROUND4',
	[ColorId.GROUND5]: 'GROUND5',
	[ColorId.GROUND6]: 'GROUND6',
	[ColorId.GROUND7]: 'GROUND7',
	[ColorId.GROUND8]: 'GROUND8',
	[ColorId.GROUND9]: 'GROUND9'
};

export const COLOR_NAMES: Record<ColorId, string> = {
	[ColorId.SKY]: 'S',
	[ColorId.SUN]: 'S',
	[ColorId.MOON]: 'M',
	[ColorId.CLOUD]: 'C',
	[ColorId.GROUND0]: '0',
	[ColorId.GROUND1]: '1',
	[ColorId.GROUND2]: '2',
	[ColorId.GROUND3]: '3',
	[ColorId.GROUND4]: '4',
	[ColorId.GROUND5]: '5',
	[ColorId.GROUND6]: '6',
	[ColorId.GROUND7]: '7',
	[ColorId.GROUND8]: '8',
	[ColorId.GROUND9]: '9'
};
