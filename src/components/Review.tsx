import type {  ReactElement } from "react";
import type { Review as ReviewType } from "../mocks/reviews/types";

interface Props {
	review: ReviewType;
	restaurantName: string;
	isExpanded: boolean;
	onToggle: () => void;
}

export const Review = ({ review, restaurantName, isExpanded, onToggle }: Props) : ReactElement => {
	const { name, overallScore, content, photos, createdAt } = review;
	const photo = photos[0] ?? null;
	const date = new Date(createdAt).toLocaleDateString("sv-SE", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});

	return (
		<div
			className="flex cursor-pointer flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
			role="button"
			tabIndex={0}
			onClick={onToggle}
			onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") onToggle(); }}
		>
			{photo ? (
				<img
					alt={photo.altText}
					className="h-48 w-full object-cover"
					src={photo.renditions.medium.includes("://") ? photo.renditions.medium : `/${photo.renditions.medium}`}
				/>
			) : (
				<div className="flex h-48 w-full items-center justify-center bg-slate-100 text-sm text-slate-400">
					No photo
				</div>
			)}
			<div className="flex flex-col gap-1 p-4">
				<p className="text-xs text-slate-500">
					<span className="font-medium">Name </span>{name}
				</p>
				<p className="text-sm text-slate-500">{restaurantName}</p>
				<p className="text-xs text-slate-500">
					<span className="font-medium">Rating </span>{overallScore.toFixed(1)} / 5.0
				</p>
				<p className={`text-sm text-slate-600 ${isExpanded ? "" : "line-clamp-3"}`}>{content}</p>
				<p className="mt-1 text-xs text-slate-400">{date}</p>
			</div>
		</div>
	);
};
