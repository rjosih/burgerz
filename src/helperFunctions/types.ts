import { z } from "zod";

export const schema = z.object({
	name: z.string().min(1, "Name is required"),
	restaurantId: z.string().min(1, "Please select a restaurant"),
	scores: z.object({
		taste: z
			.number({ error: "Please select a score 1-5 based on taste" })
			.min(1)
			.max(5),
		texture: z
			.number({ error: "Please select a score 1-5 based on texture" })
			.min(1)
			.max(5),
		visual: z
			.number({ error: "Please select a score 1-5 based on visuals" })
			.min(1)
			.max(5),
	}),
	content: z.string().max(500, "Review must be at most 500 characters"),
	photoAltText: z.string(),
});

export type FormValues = z.infer<typeof schema>;

export type PhotoModerationStatus = "scanning" | "safe" | "flagged";

export interface PhotoEntry {
	file: File;
	url: string;
	moderationStatus: PhotoModerationStatus;
	moderationLabel?: string;
}
