export type Palette = [
	string,
	string,
	string,
	string,
	string,
	string,
	string,
	string,
	string,
	string,
	string,
	string,
	string
];

export const PALETTE_ID_RED = 0;
export const PALETTE_ID_GREEN = 1;
export const PALETTE_ID_BLUE = 2;
export const PALETTE_ID_PURPLE = 3;
export const PALETTE_ID_YELLOW = 4;

const COLORS_RED: Palette = [
	'#FFDBC5',
	'#FFE9FC',
	'#FFE9DC',
	'#FE7F4A',
	'#FF6C40',
	'#f84e34',
	'#C8293F',
	'#7C0032',
	'#530030',
	'#2E112D',
	'',
	'',
	'#ffff00'
];
const COLORS_GREEN: Palette = [
	'#C8E690',
	'#DEE6CF',
	'#D6EA93',
	'#77B188',
	'#5CA377',
	'#50936A',
	'#417755',
	'#2E644A',
	'#14473E',
	'#0B3835',
	'#06292F',
	'#0F1E25',
	'#ffff00'
];
const COLORS_BLUE: Palette = [
	'#3154A5',
	'#FDFDFD',
	'#375CB4',
	'#21366B',
	'#1D3364',
	'#182A52',
	'#162141',
	'#0C1427',
	'#090D19',
	'#000408',
	'',
	'',
	'#ffff00'
];
const COLORS_PURPLE: Palette = [
	'#764BA7',
	'#FEFEFE',
	'#8759b3',
	'#7440aa',
	'#612f9a',
	'#4e2087',
	'#3c1471',
	'#2b0b58',
	'#1b053d',
	'#0c011f',
	'',
	'',
	'#ffff00'
];
const COLORS_YELLOW: Palette = [
	'#FFAF1C',
	'#FBCF59',
	'#FEBD1B',
	'#FaAa18',
	'#F59316',
	'#D86D1D',
	'#A63F1C',
	'#79271B',
	'#5C1614',
	'#400F12',
	'#280005',
	'#200003',
	'#FBCF59'
];

export const PALETTE_SIZE = COLORS_RED.length;

export const PALETTES = [COLORS_RED, COLORS_GREEN, COLORS_BLUE, COLORS_PURPLE, COLORS_YELLOW];
export const PALETTE_COUNT = Object.keys(PALETTES).length;
