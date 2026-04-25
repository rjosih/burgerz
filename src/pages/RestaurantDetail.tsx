import { Link } from "@tanstack/react-router";
import { type ReactElement, useState } from "react";
import { PhotoImage } from "../components/PhotoImage";
import { Review } from "../components/Review";
import {
	isOpenNow,
	getTodayOpeningHours,
} from "../helperFunctions/openingHours";
import { restaurantsApi, reviewsApi } from "../mocks/api";

interface Props {
	restaurantId: string;
}

export const RestaurantDetail = ({ restaurantId }: Props): ReactElement => {
	const [expandedId, setExpandedId] = useState<string | null>(null);
	const restaurant = restaurantsApi.getById(restaurantId);
	const { items: approvedReviews } = reviewsApi.list({
		restaurantId,
		moderationStatus: "approved",
	});

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

	const openNow = isOpenNow(restaurant.openingHours);
	const todaySlots = getTodayOpeningHours(restaurant.openingHours);
	const todayHours =
		todaySlots.length > 0
			? todaySlots.map((s) => `${s.open} – ${s.close}`).join(", ")
			: "Closed today";

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
					<div className="flex items-center gap-2">
						<span
							data-testid="restaurant-status"
							className={`rounded-full px-2 py-0.5 text-xs font-medium ${
								openNow
									? "bg-green-100 text-green-700"
									: "bg-slate-100 text-slate-500"
							}`}
						>
							{openNow ? "Open" : "Closed"}
						</span>

						<span
							className="text-sm text-slate-500"
							data-testid="restaurant-hours"
						>
							{todayHours}
						</span>
					</div>
					<p
						className="text-sm text-slate-500"
						data-testid="restaurant-address"
					>
						{restaurant.address}
					</p>
					<p className="text-sm text-slate-500">{restaurant.phone}</p>
					{restaurant.averageRating !== null && (
						<p className="text-sm font-medium text-slate-700">
							Rating: {restaurant.averageRating.toFixed(1)} / 5.0
							<span className="ml-2 font-normal text-slate-500">
								({restaurant.reviewCount}{" "}
								{restaurant.reviewCount === 1 ? "review" : "reviews"})
							</span>
						</p>
					)}
				</div>
			</div>

			<section className="mb-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
				<h2 className="mb-2 text-xl font-semibold text-slate-900">
					About this location
				</h2>
				<p className="text-sm text-slate-600">
					Located in the heart of downtown, a 5-minute walk from Central
					Station and close to several bus stops. Outdoor seating is available
					in summer, and the venue is wheelchair accessible. Free street
					parking is usually available after 6 PM. (Mocked — real per-location
					info arrives with the backend in 2.0.)
				</p>
			</section>

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
