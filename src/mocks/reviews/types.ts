import type { ModerationStatus, Photo } from "../restaurants/types";

export type { ModerationStatus };

export interface ReviewScores {
	taste: 1 | 2 | 3 | 4 | 5;
	texture: 1 | 2 | 3 | 4 | 5;
	visual: 1 | 2 | 3 | 4 | 5;
}

export interface Review {
	id: string;
	name: string;
	restaurantId: string;
	scores: ReviewScores;
	overallScore: number;
	content: string;
	photos: Array<Photo>;
	moderationStatus: ModerationStatus;
	createdAt: string;
}
AA