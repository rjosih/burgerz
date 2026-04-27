import { useNavigate } from "@tanstack/react-router";
import { type ReactElement, useState } from "react";
import { Button } from "../components/Button";
import { Restaurant } from "../components/Restaurant";
import { restaurantsApi } from "../mocks/api";

export const Restaurants = (): ReactElement => {
	const navigate = useNavigate();
	const [query, setQuery] = useState("");

	const { items, total } = restaurantsApi.list({ search: query });

	return (
		<div className="p-8">
			<h1 className="mb-6 text-2xl font-bold">Restaurants</h1>
			<div className="mb-6 flex flex-col gap-3">
				<label className="sr-only" htmlFor="restaurant-search">
					Search restaurants
				</label>
				<input
					className="w-full max-w-sm rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-slate-500"
					id="restaurant-search"
					placeholder="Search restaurants..."
					type="search"
					value={query}
					onChange={(event) => {
						setQuery(event.target.value);
					}}
				/>
				<Button
					className="w-fit"
					color="secondary"
					size="md"
					type="button"
					onClick={() => {
						alert(
							"Found 3 nearby restaurants serving burgers within 1 km. (Mocked — real geolocation arrives with the backend in 2.0.)",
						);
					}}
				>
					Find nearby restaurants
				</Button>
				<p aria-atomic="true" aria-live="polite" className="sr-only">
					{total} restaurant{total !== 1 ? "s" : ""} found
				</p>
			</div>
			<ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{items.map((restaurant) => (
					<li key={restaurant.id}>
						<Restaurant
							averageRating={restaurant.averageRating ?? undefined}
							restaurant={restaurant}
							reviewCount={restaurant.reviewCount}
							onClick={() => {
								void navigate({
									to: "/restaurants/$restaurantId",
									params: { restaurantId: restaurant.id },
								});
							}}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};
