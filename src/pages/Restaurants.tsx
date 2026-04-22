import { useState } from "react";
import { Restaurant } from "../components/Restaurant";
import { restaurantDb } from "../mocks/restaurants/db";

export const Restaurants = () => {
	const restaurants = restaurantDb.getAll();
	const [query, setQuery] = useState("");

	const filtered = restaurants.filter((r) =>
		r.name.toLowerCase().includes(query.toLowerCase()),
	);

	return (
		<div className="p-8">
			<h1 className="mb-6 text-2xl font-bold">Restaurants</h1>
			<input
				className="mb-6 w-full max-w-sm rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-slate-500"
				placeholder="Search restaurants..."
				type="text"
				value={query}
				onChange={(event) => { setQuery(event.target.value); }}
			/>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{filtered.map((restaurant) => (
					<Restaurant key={restaurant.id} restaurant={restaurant} />
				))}
			</div>
		</div>
	);
};
