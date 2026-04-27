import { test, expect } from "@playwright/test";

// Test data
const validReview = {
	reviewer: "Burger Tester",
	restaurant: {
		query: "Smash Station",
		fullName: "Smash Station Halmstad",
	},
	scores: {
		taste: 5,
		texture: 4,
		visual: 5,
		expectedOverall: "4.7 / 5.0",
	},
	// One typical valid review. Edge cases (too short, too long, etc.)
	// are covered in integration tests, not here.
	content:
		"Great smash burger, crispy edges and a soft brioche bun. The patty was juicy and well seasoned.",
} as const;

test.describe("US-2: Submit a review", () => {
	test.beforeEach(async ({ page }, testInfo) => {
		// Tags help link this test back to the user story in reports
		testInfo.annotations.push(
			{ type: "user-story", description: "US-2" },
			{ type: "priority", description: "P2 — mandatory user story" },
			{ type: "risk", description: "Submission flow: high business impact" }
		);

		// Always start from a clean slate
		await page.goto("/create");
		await expect(
			page.getByRole("heading", { name: /write a review/i })
		).toBeVisible();
	});

	test("submits a valid review with all three scores and review text", async ({
		page,
	}) => {
		// Backend is out of scope for 1.0 (see README). Submissions are persisted to
		// an in-app mock (`reviewDb`), so there's no HTTP call to intercept here —
		// we assert the resulting UI state instead.

		await test.step("Reviewer fills in their name", async () => {
			await page.getByLabel("Name").fill(validReview.reviewer);
		});

		await test.step("Reviewer selects a restaurant", async () => {
			const search = page.getByRole("combobox", { name: "Restaurant" });
			await search.fill(validReview.restaurant.query);
			await page
				.getByRole("option", { name: validReview.restaurant.fullName })
				.click();
			await expect(search).toHaveValue(validReview.restaurant.fullName);
		});

		await test.step("Reviewer rates taste, texture, and visual", async () => {
			await page
				.getByRole("radio", {
					name: `Taste: ${validReview.scores.taste} out of 5`,
				})
				.check();
			await page
				.getByRole("radio", {
					name: `Texture: ${validReview.scores.texture} out of 5`,
				})
				.check();
			await page
				.getByRole("radio", {
					name: `Visual: ${validReview.scores.visual} out of 5`,
				})
				.check();

			// Overall score should be the average of the three
			await expect(
				page.getByText(`Overall: ${validReview.scores.expectedOverall}`)
			).toBeVisible();
		});

		await test.step("Reviewer writes the review and it passes moderation", async () => {
			const content = page.getByRole("textbox", { name: "Review" });
			await content.fill(validReview.content);
			await content.blur(); // triggers the mocked content moderation check
			await expect(page.getByText("Content verified")).toBeVisible();
		});

		await test.step("Reviewer submits the form", async () => {
			const submit = page.getByRole("button", { name: "Submit review" });
			await expect(submit).toBeEnabled();
			await submit.click();
		});

		await test.step("Review is accepted and queued for moderation", async () => {
			// Success view (`<ReviewSent />`)
			await expect(page.getByText("Review submitted")).toBeVisible();
			await expect(
				page.getByText(
					"Your review is pending approval and will appear once moderated."
				)
			).toBeVisible();

			await expect(
				page.getByRole("button", { name: "Submit review" })
			).toBeHidden();
			await expect(
				page.getByRole("button", { name: "Write another review" })
			).toBeVisible();
			await expect(page.getByRole("link", { name: "Go to Reviews" })).toBeVisible();
		});
	});

	// Best practice - If the test fails, save a screenshot and the page HTML so we can debug it later. Otherwise, playwright has great tools
	test.afterEach(async ({ page }, testInfo) => {
		if (testInfo.status !== testInfo.expectedStatus) {
			await testInfo.attach("page-screenshot", {
				body: await page.screenshot({ fullPage: true }),
				contentType: "image/png",
			});
			await testInfo.attach("page-html", {
				body: await page.content(),
				contentType: "text/html",
			});
		}
	});
});