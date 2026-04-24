import type { PhotoEntry } from "./types";

// Revokes the blob URL for the photo at the given index and removes it from the list
export const removePhoto = (
	index: number,
	setPhotos: (updater: (previous: Array<PhotoEntry>) => Array<PhotoEntry>) => void
): void => {
	setPhotos((previous) => {
		URL.revokeObjectURL(previous[index]!.url);
		return previous.filter((_, index_) => index_ !== index);
	});
};
