export class BasePrimitive {
	x: number;
	y: number;
	ci: number;
	id: string;

	constructor(x: number, y: number, ci: number) {
		this.x = x;
		this.y = y;
		this.ci = ci;
		this.id = 'unset';
	}
}

export class Circle extends BasePrimitive {
	r: number;

	constructor(x: number, y: number, r: number, ci: number) {
		super(x, y, ci);
		this.r = r;
	}
}

export class Rectangle extends BasePrimitive {
	w: number;
	h: number;
	a: number;

	constructor(x: number, y: number, w: number, h: number, a: number, ci: number) {
		super(x, y, ci);
		this.w = w;
		this.h = h;
		this.a = a;
	}
}

export class Triangle extends BasePrimitive {
	r: number;
	a: number;

	constructor(x: number, y: number, r: number, a: number, ci: number) {
		super(x, y, ci);
		this.r = r;
		this.a = a;
	}
}

export type Primitive = Circle | Rectangle | Triangle;

export const copy = <T>(p: T): T => {
	const copy = Object.create(Object.getPrototypeOf(p));
	Object.assign(copy, p);
	return copy;
};

export const equals = (p1: Primitive, p2: Primitive): boolean => {
	if (p1.constructor !== p2.constructor) return false;
	if (p1.x !== p2.x || p1.y !== p2.y || p1.ci !== p2.ci) return false;
	if (p1 instanceof Circle && p2 instanceof Circle) {
		return p1.r === p2.r;
	}
	if (p1 instanceof Rectangle && p2 instanceof Rectangle) {
		return p1.w === p2.w && p1.h === p2.h && p1.a === p2.a;
	}
	if (p1 instanceof Triangle && p2 instanceof Triangle) {
		return p1.r === p2.r && p1.a === p2.a;
	}
	return false;
};
