import { describe, expect, it } from "vitest";
import { getFilteredRestaurants } from "../../helperFunctions/filteredRestaurants";
import type { Restaurant } from "../../mocks/restaurants/types";

const stub = (id: string, name: string): Restaurant =>
	({ id, name }) as unknown as Restaurant;

const restaurants = [
	stub("1", "Smash Station Halmstad"),
	stub("2", "Brioche Brothers"),
	stub("3", "Patty Corner"),
	stub("4", "Northern Bun Umeå"),
	stub("5", "Burger Bun Express"),
];

// Filters restaurants by name substring.
describe("getFilteredRestaurants", () => {
	describe("empty query", () => {
		it("returns all restaurants in original order", () => {
			const result = getFilteredRestaurants(restaurants, "");

			expect(result.map((r) => r.id)).toEqual(["1", "2", "3", "4", "5"]);
		});
	});

	describe("matching query", () => {
		it("returns one restaurant for an exact match", () => {
			const result = getFilteredRestaurants(restaurants, "Patty Corner");

			expect(result.map((r) => r.name)).toEqual(["Patty Corner"]);
		});

		it("returns one restaurant for a substring match", () => {
			const result = getFilteredRestaurants(restaurants, "Station");

			expect(result.map((r) => r.name)).toEqual(["Smash Station Halmstad"]);
		});

		it("returns multiple restaurants when the substring is shared", () => {
			const result = getFilteredRestaurants(restaurants, "Bun");

			expect(result.map((r) => r.name)).toEqual([
				"Northern Bun Umeå",
				"Burger Bun Express",
			]);
		});
	});

	describe("case insensitivity", () => {
		it("matches regardless of query casing", () => {
			const result = getFilteredRestaurants(restaurants, "sMaSh");

			expect(result.map((r) => r.name)).toEqual(["Smash Station Halmstad"]);
		});
	});

	describe("no matches", () => {
		it("returns an empty array when nothing matches", () => {
			expect(getFilteredRestaurants(restaurants, "xyz")).toEqual([]);
		});

		it("returns an empty array for an empty input list", () => {
			expect(getFilteredRestaurants([], "smash")).toEqual([]);
		});
	});
});