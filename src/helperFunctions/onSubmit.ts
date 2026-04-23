import type { Photo } from "../mocks/restaurants/types";
import { reviewDb } from "../mocks/reviews/db";
import type { FormValues, PhotoEntry } from "./types";

// Builds the review object from form data and uploaded photos, persists it to the db with pending moderation status
export const onSubmit = (
	data: FormValues,
	photos: PhotoEntry[],
	setSubmitted: (value: boolean) => void,
): void => {
	const reviewId = crypto.randomUUID();
	const overallScoreValue =
		(data.scores.taste + data.scores.texture + data.scores.visual) / 3;

	const photoModels: Photo[] = photos.map(({ file, url }) => ({
		id: crypto.randomUUID(),
		name: file.name,
		reviewId,
		originalKey: url,
		renditions: { thumbnail: url, medium: url, large: url },
		moderationStatus: "pending",
		exifStrippedKey: url,
		altText: `Photo: ${file.name}`,
		caption: "",
		isDecorative: false,
	}));

	reviewDb.create({
		...data,
		overallScore: Math.round(overallScoreValue * 100) / 100,
		photos: photoModels,
		moderationStatus: "pending",
	});

	setSubmitted(true);
};
