import { ColorId, PaletteId } from "./scene-types";

const COLORS_RED: Record<ColorId, string> = {
	[ColorId.SKY]: '#FFDBC5',
	[ColorId.SUN]: '#FFE9FC',
	[ColorId.MOON]: '#FFE9FC',
	[ColorId.CLOUD]: '#FFE9DC',
	[ColorId.GROUND0]: '#FE7F4A',
	[ColorId.GROUND1]: '#FF6C40',
	[ColorId.GROUND2]: '#f84e34',
	[ColorId.GROUND3]: '#C8293F',
	[ColorId.GROUND4]: '#7C0032',
	[ColorId.GROUND5]: '#530030',
	[ColorId.GROUND6]: '#2E112D',
	[ColorId.GROUND7]: '',
	[ColorId.GROUND8]: '',
	[ColorId.GROUND9]: '#ffff00'
};

const COLORS_GREEN: Record<ColorId, string> = {
	[ColorId.SKY]: '#C8E690',
	[ColorId.SUN]: '#DEE6CF',
	[ColorId.MOON]: '#DEE6CF',
	[ColorId.CLOUD]: '#D6EA93',
	[ColorId.GROUND0]: '#77B188',
	[ColorId.GROUND1]: '#5CA377',
	[ColorId.GROUND2]: '#50936A',
	[ColorId.GROUND3]: '#417755',
	[ColorId.GROUND4]: '#2E644A',
	[ColorId.GROUND5]: '#14473E',
	[ColorId.GROUND6]: '#0B3835',
	[ColorId.GROUND7]: '#06292F',
	[ColorId.GROUND8]: '#0F1E25',
	[ColorId.GROUND9]: '#ffff00'
};

export const PALETTES: Record<PaletteId, Record<ColorId, string>> = {
	[PaletteId.RED]: COLORS_RED,
	[PaletteId.GREEN]: COLORS_GREEN
};
