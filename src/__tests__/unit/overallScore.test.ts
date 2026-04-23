import { describe, expect, it } from "vitest";
import { calculateOverallScore } from "../../helperFunctions/overallScore";

// Returns the average of taste, texture, and visual rounded to one decimal place;
describe("calculateOverallScore", () => {
	describe("valid scores", () => {
		it("returns the same value when all three scores are equal", () => {
			expect(calculateOverallScore(1, 1, 1)).toBe(1.0);
			expect(calculateOverallScore(5, 5, 5)).toBe(5.0);
		});

		it("returns a whole number when the mean is exact", () => {
			expect(calculateOverallScore(3, 4, 5)).toBe(4.0);
		});

		it("rounds to one decimal place", () => {
			expect(calculateOverallScore(4, 5, 4)).toBe(4.3);
			expect(calculateOverallScore(4, 4, 3)).toBe(3.7);
		});
	});

	// Returns null if any score is missing
	describe("missing scores", () => {
		it("returns null when taste is undefined", () => {
			expect(calculateOverallScore(undefined, 4, 5)).toBeNull();
		});

		it("returns null when texture is undefined", () => {
			expect(calculateOverallScore(4, undefined, 5)).toBeNull();
		});

		it("returns null when visual is undefined", () => {
			expect(calculateOverallScore(4, 4, undefined)).toBeNull();
		});
	});
});