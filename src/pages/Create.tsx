import { type ReactElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/Button";
import { ChooseName } from "../components/ChooseName";
import { ChooseRestaurantReview } from "../components/ChooseRestaurantReview";
import { ReviewContent, type TextModerationStatus } from "../components/ReviewContent";
import { ReviewScores } from "../components/ReviewScores";
import { ReviewSent } from "../components/ReviewSent";
import { UploadPhotos } from "../components/UploadPhotos";
import { calculateOverallScore } from "../helperFunctions/overallScore";
import { onSubmit } from "../helperFunctions/onSubmit";
import { handleReset } from "../helperFunctions/handleReset";
import { moderateText } from "../helperFunctions/rekognitionService";
import { schema, type FormValues, type PhotoEntry } from "../helperFunctions/types";

export const Create = (): ReactElement => {
	const [restaurantQuery, setRestaurantQuery] = useState("");
	const [photos, setPhotos] = useState<Array<PhotoEntry>>([]);
	const [submitted, setSubmitted] = useState(false);
	const [textModeration, setTextModeration] = useState<TextModerationStatus>("idle");

	const {
		register,
		handleSubmit,
		control,
		setValue,
		watch,
		reset,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: { name: "", restaurantId: "", content: "" },
	});

	const content = watch("content", "");
	const overallScore = calculateOverallScore(
		watch("scores.taste"),
		watch("scores.texture"),
		watch("scores.visual"),
	);

	// Reset moderation status when content changes after a scan
	useEffect(() => {
		if (textModeration === "safe" || textModeration === "flagged") {
			setTextModeration("idle");
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [content]);

	const handleContentBlur = (): void => {
		if (!content.trim() || textModeration === "scanning") return;
		setTextModeration("scanning");
		void moderateText(content).then((result) => {
			setTextModeration(result.safe ? "safe" : "flagged");
		});
	};

	const hasBlockingPhotos = photos.some(
		(p) => p.moderationStatus === "scanning" || p.moderationStatus === "flagged",
	);
	const isSubmitBlocked = hasBlockingPhotos || textModeration === "scanning" || textModeration === "flagged";

	if (submitted) {
		return (
			<ReviewSent
				onReset={() => { handleReset(reset, setRestaurantQuery, photos, setPhotos, setSubmitted); }}
			/>
		);
	}

	return (
		<div className="p-8">
			<h1 className="mb-8 text-2xl font-bold">Write a Review</h1>
			<form
				className="flex max-w-2xl flex-col gap-6"
				onSubmit={handleSubmit((data) => { onSubmit(data, photos, setSubmitted); })}
			>
				{/* Name */}
				<ChooseName error={errors.name?.message} register={register} />

				{/* Restaurant */}
				<ChooseRestaurantReview
					error={errors.restaurantId?.message}
					register={register}
					restaurantQuery={restaurantQuery}
					setRestaurantQuery={setRestaurantQuery}
					setValue={setValue}
				/>

				{/* Scores */}
				<ReviewScores control={control} errors={errors} overallScore={overallScore} />

				{/* Content */}
				<ReviewContent
					contentLength={content.length}
					error={errors.content?.message}
					moderationStatus={textModeration}
					register={register}
					onContentBlur={handleContentBlur}
				/>

				{/* Photos */}
				<UploadPhotos photos={photos} setPhotos={setPhotos} />

				<div className="flex flex-col gap-2">
					<Button
						className="w-fit"
						color="primary"
						disabled={isSubmitBlocked}
						size="lg"
						type="submit"
					>
						Submit review
					</Button>
					{isSubmitBlocked && (
						<p className="text-xs text-slate-500">
							{textModeration === "flagged" || photos.some((p) => p.moderationStatus === "flagged")
								? "Fix flagged content before submitting."
								: "Waiting for content scan to complete…"}
						</p>
					)}
				</div>
			</form>
		</div>
	);
};
