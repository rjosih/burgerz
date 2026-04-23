// Simulates AWS Rekognition API calls with artificial network delay

export type ImageModerationResult =
	| { safe: true }
	| { safe: false; label: string };

export type TextModerationResult =
	| { safe: true }
	| { safe: false; reason: string };

const delay = (ms: number): Promise<void> =>
	new Promise((resolve) => {
		setTimeout(resolve, ms);
	});

const UNSAFE_LABELS = [
	"Explicit Nudity",
	"Violence",
	"Disturbing Content",
	"Hate Symbols",
	"Graphic Content",
];

const FLAGGED_KEYWORDS = [
	"hate",
	"violence",
	"spam",
	"abuse",
	"explicit",
	"nsfw",
	"inappropriate",
];

export const moderateImage = async (
	_file: File
): Promise<ImageModerationResult> => {
	// Simulate DetectModerationLabels API latency
	await delay(1200 + Math.random() * 800);

	// 50% chance to flag — enough to demonstrate the flow without being too disruptive
	if (Math.random() < 0.5) {
		const label = UNSAFE_LABELS[
			Math.floor(Math.random() * UNSAFE_LABELS.length)
		] as string;
		console.log(typeof label);
		return { safe: false, label };
	}

	return { safe: true };
};

export const moderateText = async (
	text: string
): Promise<TextModerationResult> => {
	// Simulate DetectModerationLabels (text) API latency
	await delay(700 + Math.random() * 400);

	const lower = text.toLowerCase();
	const found = FLAGGED_KEYWORDS.find((kw) => lower.includes(kw));

	if (found) {
		return { safe: false, reason: "Inappropriate content detected" };
	}

	return { safe: true };
};
