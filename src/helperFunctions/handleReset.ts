import type { UseFormReset } from "react-hook-form";
import type { FormValues, PhotoEntry } from "./types";

// Revokes all photo blob URLs, clears the photo list, resets the form fields, and returns to the initial state
export const handleReset = (
	reset: UseFormReset<FormValues>,
	setRestaurantQuery: (query: string) => void,
	photos: Array<PhotoEntry>,
	setPhotos: (photos: Array<PhotoEntry>) => void,
	setSubmitted: (value: boolean) => void
): void => {
	reset();
	setRestaurantQuery("");
	photos.forEach(({ url }) => {
		URL.revokeObjectURL(url);
	});
	setPhotos([]);
	setSubmitted(false);
};
