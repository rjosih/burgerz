import type { PhotoEntry } from "./types";

// Revokes the blob URL for the photo at the given index and removes it from the list
export const removePhoto = (
	index: number,
	setPhotos: (updater: (prev: PhotoEntry[]) => PhotoEntry[]) => void
): void => {
	setPhotos((previous) => {
		URL.revokeObjectURL(previous[index]!.url);
		return previous.filter((_, i) => i !== index);
	});
};
