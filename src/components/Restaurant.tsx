import type { Restaurant as RestaurantType } from "../mocks/restaurants/types";

interface Props {
	restaurant: RestaurantType;
}

export const Restaurant = ({ restaurant }: Props) => {
	const { name, address, phone, photo } = restaurant;

	return (
		<div className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
			<img
				alt={photo.altText}
				className="h-48 w-full object-cover"
				src={`/${photo.renditions.medium}`}
			/>
			<div className="flex flex-col gap-1 p-4">
				<h2 className="text-lg font-semibold text-slate-900">{name}</h2>
				<p className="text-sm text-slate-500">{address}</p>
				<p className="text-sm text-slate-500">{phone}</p>
			</div>
		</div>
	);
};
