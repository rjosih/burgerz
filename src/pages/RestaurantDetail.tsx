import { Link } from "@tanstack/react-router";
import { type ReactElement, useState } from "react";
import { PhotoImage } from "../components/PhotoImage";
import { Review } from "../components/Review";
import { reviewDb } from "../mocks/reviews/db";
import { restaurantDb } from "../mocks/restaurants/db";

interface Props {
	restaurantId: string;
}

export const RestaurantDetail = ({ restaurantId }: Props): ReactElement => {
	const [expandedId, setExpandedId] = useState<string | null>(null);
	const restaurant = restaurantDb.getById(restaurantId);
	const approvedReviews = reviewDb
		.getByRestaurantId(restaurantId)
		.filter((r) => r.moderationStatus === "approved");

	const averageScore =
		approvedReviews.length > 0
			? approvedReviews.reduce((sum, r) => sum + r.overallScore, 0) /
				approvedReviews.length
			: null;

	if (!restaurant) {
		return (
			<div className="p-8">
				<p className="text-slate-500">Restaurant not found.</p>
				<Link
					className="mt-4 inline-block text-sm text-slate-700 underline"
					to="/restaurants"
				>
					Back to restaurants
				</Link>
			</div>
		);
	}

	return (
		<div className="p-8">
			<Link
				aria-label="Back to Restaurants"
				className="mb-6 inline-block rounded px-2 py-1 text-sm text-slate-500 hover:text-slate-700 focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:outline-none"
				to="/restaurants"
			>
				← Restaurants
			</Link>

			<div className="mb-8 flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm sm:flex-row">
				<PhotoImage
					priority
					className="h-48 w-full object-cover sm:h-auto sm:w-64"
					photo={restaurant.photo}
					sizes="(max-width: 640px) 100vw, 256px"
				/>
				<div className="flex flex-col justify-center gap-2 p-6">
					<h1 className="text-2xl font-bold text-slate-900">
						{restaurant.name}
					</h1>
					<p className="text-sm text-slate-500">{restaurant.address}</p>
					<p className="text-sm text-slate-500">{restaurant.phone}</p>
					{averageScore !== null && (
						<p className="text-sm font-medium text-slate-700">
							Rating: {averageScore.toFixed(1)} / 5.0
							<span className="ml-2 font-normal text-slate-500">
								({approvedReviews.length}{" "}
								{approvedReviews.length === 1 ? "review" : "reviews"})
							</span>
						</p>
					)}
				</div>
			</div>

			<h2 className="mb-4 text-xl font-semibold text-slate-900">Reviews</h2>

			{approvedReviews.length === 0 ? (
				<p className="text-sm text-slate-500">No approved reviews yet.</p>
			) : (
				<div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{approvedReviews.map((review) => (
						<Review
							key={review.id}
							isExpanded={expandedId === review.id}
							restaurantName={restaurant.name}
							review={review}
							onToggle={() => {
								setExpandedId(expandedId === review.id ? null : review.id);
							}}
						/>
					))}
				</div>
			)}
		</div>
	);
};
