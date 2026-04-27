import { PhotoImage } from "./PhotoImage";
import { Button } from "./Button";
import type { Restaurant as RestaurantType } from "../mocks/restaurants/types";
import type { ReactElement } from "react";

interface Props {
	restaurant: RestaurantType;
	averageRating?: number;
	reviewCount?: number;
	onClick?: () => void;
}

export const Restaurant = ({
	restaurant,
	averageRating,
	reviewCount,
	onClick,
}: Props): ReactElement => {
	const { name, address, phone, photo } = restaurant;

	return (
		<article className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
			<PhotoImage
				className="h-48 w-full object-cover"
				photo={photo}
				sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
			/>
			<div className="flex flex-col gap-1 p-4">
				<h2 className="text-lg font-semibold text-slate-900">
					<Button
						className="rounded! border-transparent! bg-transparent! px-0! py-0! text-lg! font-semibold! text-slate-900! text-left hover:border-transparent! hover:bg-transparent! hover:underline focus-visible:underline"
						color="secondary"
						size="md"
						type="button"
						onClick={onClick}
					>
						{name}
					</Button>
				</h2>
				<p className="text-sm text-slate-500">{address}</p>
				<p className="text-sm text-slate-500">{phone}</p>
				{averageRating !== undefined && (
					<p
						aria-label={`Rating: ${averageRating.toFixed(1)} out of 5, ${reviewCount ?? 0} ${reviewCount === 1 ? "review" : "reviews"}`}
						className="mt-1 text-sm font-medium text-slate-700"
					>
						<span aria-hidden="true">
							<span className="font-normal text-slate-500">Rating </span>
							{averageRating.toFixed(1)} / 5.0
							<span className="ml-2 font-normal text-slate-500">
								({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
							</span>
						</span>
					</p>
				)}
			</div>
		</article>
	);
};
