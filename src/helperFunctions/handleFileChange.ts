import type { PhotoEntry } from "./types";

// Converts selected image files into preview entries with blob URLs and appends them to the photos list
export const handleFileChange = (
	files: FileList | null,
	setPhotos: (updater: (previous: Array<PhotoEntry>) => Array<PhotoEntry>) => void,
	clearInput: () => void,
): void => {
	const entries: Array<PhotoEntry> = Array.from(files ?? []).map((file) => ({
		file,
		url: URL.createObjectURL(file),
		moderationStatus: "scanning" as const,
	}));
	setPhotos((previous) => [...previous, ...entries]);
	clearInput();
};
