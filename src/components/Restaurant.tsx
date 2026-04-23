import { Button } from "./Button";
import type { Restaurant as RestaurantType } from "../mocks/restaurants/types";

interface Props {
	restaurant: RestaurantType;
	averageRating?: number;
	reviewCount?: number;
	onClick?: () => void;
}

export const Restaurant = ({ restaurant, averageRating, reviewCount, onClick }: Props) => {
	const { name, address, phone, photo } = restaurant;

	return (
		<div
			className="flex cursor-pointer flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
			role="button"
			tabIndex={0}
			onClick={onClick}
			onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick?.(); }}
		>
			<img
				alt={photo.altText}
				className="h-48 w-full object-cover"
				src={`/${photo.renditions.medium}`}
			/>
			<div className="flex flex-col gap-1 p-4">
				<h2 className="text-lg font-semibold text-slate-900">{name}</h2>
				<p className="text-sm text-slate-500">{address}</p>
				<p className="text-sm text-slate-500">{phone}</p>
				{averageRating !== undefined && (
					<p className="mt-1 text-sm font-medium text-slate-700">
						<span className="font-normal text-slate-500">Rating </span>
						{averageRating.toFixed(1)} / 5.0
						<span className="ml-2 font-normal text-slate-400">
							({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
						</span>
					</p>
				)}
				<Button
					className="mt-2 w-fit"
					color="secondary"
					size="sm"
					type="button"
					onClick={(e) => { e.stopPropagation(); onClick?.(); }}
				>
					Go to restaurant profile
				</Button>
			</div>
		</div>
	);
};
