import { test, expect } from "@playwright/test";

const SMASH_STATION_ID = "9a12b0a1-3f65-4d74-a5a1-1e3d9c1f1001";

test.describe("Restaurant details - User Story 1", () => {
	// freezes browser’s Date to 2026-01-05 12:00 (Monday)
	test.beforeEach(async ({ page }) => {
		await page.clock.setFixedTime(new Date(2026, 0, 5, 12, 0));
	});

	// Checks that the user can see the required restaurant information.
	test("user can see opening hours, address and open status", async ({
		page,
	}) => {
		await page.goto(`/restaurants/${SMASH_STATION_ID}`);

		await expect(page.getByTestId("restaurant-address")).toHaveText(
			"Storgatan 12, 302 43 Halmstad, Sweden"
		);
		await expect(page.getByTestId("restaurant-status")).toHaveText("Open");
		await expect(page.getByTestId("restaurant-hours")).toHaveText(
			"11:00 – 21:00"
		);
	});
});
