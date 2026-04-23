import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Restaurant } from "../components/Restaurant";
import { reviewDb } from "../mocks/reviews/db";
import { restaurantDb } from "../mocks/restaurants/db";

export const Restaurants = () => {
	const navigate = useNavigate();
	const restaurants = restaurantDb.getAll();
	const allReviews = reviewDb.getAll();
	const [query, setQuery] = useState("");

	const filtered = restaurants.filter((r) =>
		r.name.toLowerCase().includes(query.toLowerCase())
	);

	const approvedByRestaurant = allReviews.filter(
		(r) => r.moderationStatus === "approved"
	);

	return (
		<div className="p-8">
			<h1 className="mb-6 text-2xl font-bold">Restaurants</h1>
			<div className="mb-6 flex flex-col gap-1">
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
				<p aria-live="polite" aria-atomic="true" className="sr-only">
					{filtered.length} restaurant{filtered.length !== 1 ? "s" : ""} found
				</p>
			</div>
			<ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{filtered.map((restaurant) => {
					const reviews = approvedByRestaurant.filter(
						(r) => r.restaurantId === restaurant.id
					);
					const averageRating =
						reviews.length > 0
							? reviews.reduce((sum, r) => sum + r.overallScore, 0) /
								reviews.length
							: undefined;
					return (
						<li key={restaurant.id}>
							<Restaurant
								averageRating={averageRating}
								restaurant={restaurant}
								reviewCount={reviews.length}
								onClick={() => {
									void navigate({
										to: "/restaurants/$restaurantId",
										params: { restaurantId: restaurant.id },
									});
								}}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
