import type { Restaurant } from "../mocks/restaurants/types";

// Returns all restaurants when query is empty, otherwise filters by name (case-insensitive)
export const getFilteredRestaurants = (
	restaurants: Array<Restaurant>,
	query: string
): Array<Restaurant> => {
	if (query.length === 0) return restaurants;
	return restaurants.filter((r) =>
		r.name.toLowerCase().includes(query.toLowerCase())
	);
};
