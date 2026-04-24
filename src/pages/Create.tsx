import { type ReactElement, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/Button";
import { ChooseName } from "../components/ChooseName";
import { ChooseRestaurantReview } from "../components/ChooseRestaurantReview";
import {
	ReviewContent,
	type TextModerationStatus,
} from "../components/ReviewContent";
import { ReviewScores } from "../components/ReviewScores";
import { ReviewSent } from "../components/ReviewSent";
import { UploadPhotos } from "../components/UploadPhotos";
import { calculateOverallScore } from "../helperFunctions/overallScore";
import { onSubmit } from "../helperFunctions/onSubmit";
import { handleReset } from "../helperFunctions/handleReset";
import { moderateText } from "../helperFunctions/rekognitionService";
import { restaurantDb } from "../mocks/restaurants/db";
import {
	schema,
	type FormValues,
	type PhotoEntry,
} from "../helperFunctions/types";

export const Create = (): ReactElement => {
	const [restaurantQuery, setRestaurantQuery] = useState("");
	const [photos, setPhotos] = useState<Array<PhotoEntry>>([]);
	const [submitted, setSubmitted] = useState(false);
	const [textModeration, setTextModeration] =
		useState<TextModerationStatus>("idle");

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
		defaultValues: {
			name: "",
			restaurantId: "",
			content: "",
			photoAltText: "",
		},
	});

	const content = watch("content", "");
	const restaurantId = watch("restaurantId");

	const selectedRestaurant = useMemo(
		() => restaurantDb.getById(restaurantId),
		[restaurantId]
	);

	useEffect(() => {
		setValue(
			"photoAltText",
			selectedRestaurant ? `Burger photo from ${selectedRestaurant.name}` : "",
			{ shouldDirty: false }
		);
	}, [restaurantId, selectedRestaurant, setValue]);

	const overallScore = calculateOverallScore(
		watch("scores.taste"),
		watch("scores.texture"),
		watch("scores.visual")
	);

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
		(p) => p.moderationStatus === "scanning" || p.moderationStatus === "flagged"
	);
	const isSubmitBlocked =
		hasBlockingPhotos ||
		textModeration === "scanning" ||
		textModeration === "flagged";

	if (submitted) {
		return (
			<ReviewSent
				onReset={() => {
					handleReset(
						reset,
						setRestaurantQuery,
						photos,
						setPhotos,
						setSubmitted
					);
				}}
			/>
		);
	}

	return (
		<div className="p-8">
			<h1 className="mb-8 text-2xl font-bold">Write a Review</h1>
			<form
				noValidate
				className="flex max-w-2xl flex-col gap-6"
				onSubmit={handleSubmit((data) => {
					onSubmit(data, photos, setSubmitted);
				})}
			>
				<ChooseName error={errors.name?.message} register={register} />

				<ChooseRestaurantReview
					error={errors.restaurantId?.message}
					register={register}
					restaurantQuery={restaurantQuery}
					setRestaurantQuery={setRestaurantQuery}
					setValue={setValue}
				/>

				<ReviewScores
					control={control}
					errors={errors}
					overallScore={overallScore}
				/>

				<ReviewContent
					contentLength={content.length}
					error={errors.content?.message}
					moderationStatus={textModeration}
					register={register}
					onContentBlur={handleContentBlur}
				/>

				<UploadPhotos photos={photos} setPhotos={setPhotos} />

				{photos.length > 0 && (
					<div className="flex flex-col gap-1">
						<label
							className="text-sm font-medium text-slate-700"
							htmlFor="photo-alt-text"
						>
							Photo description
						</label>
						<input
							className="rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-slate-500"
							id="photo-alt-text"
							placeholder="e.g. Burger photo from Smash Station"
							type="text"
							{...register("photoAltText")}
						/>
						<p className="text-xs text-slate-500">
							Describes your photos for screen readers and assistive technology.
						</p>
					</div>
				)}

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
						<p
							aria-live="assertive"
							className="text-xs text-slate-500"
							role="alert"
						>
							{textModeration === "flagged" ||
							photos.some((p) => p.moderationStatus === "flagged")
								? "Fix flagged content before submitting."
								: "Waiting for content scan to complete…"}
						</p>
					)}
				</div>
			</form>
		</div>
	);
};
