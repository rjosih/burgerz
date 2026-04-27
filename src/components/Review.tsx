import type { ReactElement } from "react";
import { Button } from "./Button";
import { PhotoImage } from "./PhotoImage";
import type { Review as ReviewType } from "../mocks/reviews/types";

interface Props {
	review: ReviewType;
	restaurantName: string;
	isExpanded: boolean;
	onToggle: () => void;
}

export const Review = ({
	review,
	restaurantName,
	isExpanded,
	onToggle,
}: Props): ReactElement => {
	const { id, name, overallScore, content, photos, createdAt } = review;
	const photo = photos[0] ?? null;
	const date = new Date(createdAt).toLocaleDateString("sv-SE", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
	const bodyId = `review-body-${id}`;

	return (
		<article className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
			{photo ? (
				<PhotoImage
					className="h-48 w-full object-cover"
					photo={photo}
					sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
				/>
			) : (
				<div className="flex h-48 w-full items-center justify-center bg-slate-100 text-sm text-slate-600">
					No photo
				</div>
			)}
			<div className="flex flex-col gap-1 p-4">
				<p className="text-xs text-slate-500">
					<span className="font-medium">By </span>
					{name}
				</p>
				<p className="text-sm text-slate-500">{restaurantName}</p>
				<p
					aria-label={`Overall rating: ${overallScore.toFixed(1)} out of 5`}
					className="text-xs text-slate-500"
				>
					<span aria-hidden="true">
						<span className="font-medium">Rating </span>
						{overallScore.toFixed(1)} / 5.0
					</span>
				</p>
				<div id={bodyId}>
					<p
						className={`text-sm text-slate-600 ${isExpanded ? "" : "line-clamp-3"}`}
					>
						{content}
					</p>
				</div>
				<div className="mt-1 flex items-center justify-between">
					<time className="text-xs text-slate-500" dateTime={createdAt}>
						{date}
					</time>
					<Button
						aria-controls={bodyId}
						aria-expanded={isExpanded}
						className="rounded! border-transparent! bg-transparent! px-0! py-0! font-normal! text-slate-500 hover:border-transparent! hover:bg-transparent! hover:text-slate-700 hover:underline focus-visible:underline"
						color="secondary"
						size="sm"
						type="button"
						onClick={onToggle}
					>
						{isExpanded ? "Show less" : "Read more"}
					</Button>
				</div>
			</div>
		</article>
	);
};
