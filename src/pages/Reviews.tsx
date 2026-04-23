import { type ReactElement, useState } from "react";
import { Button } from "../components/Button";
import { Review } from "../components/Review";
import { reviewDb } from "../mocks/reviews/db";
import { restaurantDb } from "../mocks/restaurants/db";

const RATINGS = [1, 2, 3, 4, 5] as const;

export const Reviews = (): ReactElement => {
	const reviews = reviewDb.getAll();
	const restaurants = restaurantDb.getAll();
	const [query, setQuery] = useState("");
	const [ratingFilter, setRatingFilter] = useState<number | null>(null);
	const [expandedId, setExpandedId] = useState<string | null>(null);

	const filtered = reviews.filter((r) => {
		const matchesQuery = r.name.toLowerCase().includes(query.toLowerCase());
		const matchesRating = ratingFilter === null || Math.round(r.overallScore) === ratingFilter;
		return matchesQuery && matchesRating;
	});

	return (
		<div className="p-8">
			<h1 className="mb-6 text-2xl font-bold">Reviews</h1>
			<div className="mb-6 flex flex-wrap items-center gap-3">
				<input
					className="w-full max-w-sm rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-slate-500"
					placeholder="Search reviews..."
					type="text"
					value={query}
					onChange={(event) => { setQuery(event.target.value); }}
				/>
				<div className="flex items-center gap-2">
					{RATINGS.map((rating) => (
						<Button
							key={rating}
							color={ratingFilter === rating ? "primary" : "secondary"}
							size="md"
							type="button"
							onClick={() => { setRatingFilter(ratingFilter === rating ? null : rating); }}
						>
							{rating}
						</Button>
					))}
				</div>
			</div>
			<div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{filtered.map((review) => {
					const restaurant = restaurants.find((r) => r.id === review.restaurantId);
					return (
						<Review
							key={review.id}
							isExpanded={expandedId === review.id}
							restaurantName={restaurant?.name ?? "Unknown restaurant"}
							review={review}
							onToggle={() => { setExpandedId(expandedId === review.id ? null : review.id); }}
						/>
					);
				})}
			</div>
		</div>
	);
};
