import type { Photo, PhotoRenditions } from "../mocks/restaurants/types";

export type RenditionSize = keyof PhotoRenditions;

export type ViewContext = "list" | "card" | "inline" | "hero" | "detail";

const toSource = (storageKey: string): string =>
	storageKey.includes("://") ? storageKey : `/${storageKey}`;

export const chooseRendition = (context: ViewContext): RenditionSize => {
	if (context === "list" || context === "card") return "thumbnail";
	if (context === "inline") return "medium";
	return "large";
};

export const getRenditionUrl = (photo: Photo, context: ViewContext): string =>
	toSource(photo.renditions[chooseRendition(context)]);
