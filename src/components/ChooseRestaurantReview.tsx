import { useRef, useState } from "react";
import type { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { getFilteredRestaurants } from "../helperFunctions/filteredRestaurants";
import { handleRestaurantSelect } from "../helperFunctions/handleRestaurantSelect";
import { restaurantDb } from "../mocks/restaurants/db";
import type { FormValues } from "../helperFunctions/types";

interface Props {
	register: UseFormRegister<FormValues>;
	setValue: UseFormSetValue<FormValues>;
	restaurantQuery: string;
	setRestaurantQuery: (query: string) => void;
	error?: string;
}

export const ChooseRestaurantReview = ({
	register,
	setValue,
	restaurantQuery,
	setRestaurantQuery,
	error,
}: Props) => {
	const restaurants = restaurantDb.getAll();
	const [showDropdown, setShowDropdown] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const filteredRestaurants = getFilteredRestaurants(restaurants, restaurantQuery);

	return (
		<div className="flex flex-col gap-1">
			<label className="text-sm font-medium text-slate-700" htmlFor="restaurant-search">
				Restaurant
			</label>
			<input type="hidden" {...register("restaurantId")} />
			<div ref={dropdownRef} className="relative">
				<input
					autoComplete="off"
					className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-slate-500"
					id="restaurant-search"
					placeholder="Search for a restaurant..."
					type="text"
					value={restaurantQuery}
					onBlur={() => { setTimeout(() => { setShowDropdown(false); }, 150); }}
					onChange={(e) => {
						setRestaurantQuery(e.target.value);
						setShowDropdown(true);
						if (!e.target.value) setValue("restaurantId", "", { shouldValidate: false });
					}}
					onFocus={() => { setShowDropdown(true); }}
				/>
				{showDropdown && filteredRestaurants.length > 0 && (
					<ul className="absolute z-10 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-md">
						{filteredRestaurants.map((r) => (
							<li
								key={r.id}
								className="cursor-pointer px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
								onMouseDown={() => {
									handleRestaurantSelect(r.id, r.name, setValue, setRestaurantQuery, setShowDropdown);
								}}
							>
								{r.name}
							</li>
						))}
					</ul>
				)}
			</div>
			{error && <p className="text-xs text-red-500">{error}</p>}
		</div>
	);
};
