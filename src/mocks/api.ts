import type { ModerationStatus, Restaurant } from "./restaurants/types";
import type { Review } from "./reviews/types";
import { restaurantDb } from "./restaurants/db";
import { reviewDb } from "./reviews/db";

export interface RestaurantWithStats extends Restaurant {
	averageRating: number | null;
	reviewCount: number;
}

export interface ReviewWithRestaurant extends Review {
	restaurantName: string;
}

export interface ListResult<T> {
	items: Array<T>;
	total: number;
}

export interface RestaurantListParameters {
	search?: string;
	limit?: number;
	offset?: number;
}

export interface ReviewListParameters {
	search?: string;
	rating?: number;
	restaurantId?: string;
	moderationStatus?: ModerationStatus;
	limit?: number;
	offset?: number;
}

const computeStats = (
	restaurantId: string
): { averageRating: number | null; reviewCount: number } => {
	const approved = reviewDb
		.getByRestaurantId(restaurantId)
		.filter((r) => r.moderationStatus === "approved");
	if (approved.length === 0) return { averageRating: null, reviewCount: 0 };
	const sum = approved.reduce((total, r) => total + r.overallScore, 0);
	return {
		averageRating: sum / approved.length,
		reviewCount: approved.length,
	};
};

const paginate = <T,>(
	items: Array<T>,
	limit: number | undefined,
	offset: number
): Array<T> =>
	typeof limit === "number"
		? items.slice(offset, offset + limit)
		: items.slice(offset);

export const restaurantsApi = {
	list({
		search,
		limit,
		offset = 0,
	}: RestaurantListParameters = {}): ListResult<RestaurantWithStats> {
		const all = restaurantDb.getAll();
		const query = search?.trim().toLowerCase() ?? "";
		const filtered = query
			? all.filter((r) => r.name.toLowerCase().includes(query))
			: all;
		const paged = paginate(filtered, limit, offset);
		const items = paged.map((r) => ({ ...r, ...computeStats(r.id) }));
		return { items, total: filtered.length };
	},

	getById(id: string): RestaurantWithStats | undefined {
		const restaurant = restaurantDb.getById(id);
		if (!restaurant) return undefined;
		return { ...restaurant, ...computeStats(id) };
	},
};

export const reviewsApi = {
	list({
		search,
		rating,
		restaurantId,
		moderationStatus,
		limit,
		offset = 0,
	}: ReviewListParameters = {}): ListResult<ReviewWithRestaurant> {
		let records = reviewDb.getAll();
		if (restaurantId) {
			records = records.filter((r) => r.restaurantId === restaurantId);
		}
		if (moderationStatus) {
			records = records.filter((r) => r.moderationStatus === moderationStatus);
		}
		if (typeof rating === "number") {
			records = records.filter((r) => Math.round(r.overallScore) === rating);
		}
		const query = search?.trim().toLowerCase() ?? "";
		if (query) {
			records = records.filter((r) => r.name.toLowerCase().includes(query));
		}
		const paged = paginate(records, limit, offset);
		const items = paged.map((r) => {
			const restaurant = restaurantDb.getById(r.restaurantId);
			return {
				...r,
				restaurantName: restaurant?.name ?? "Unknown restaurant",
			};
		});
		return { items, total: records.length };
	},
};
