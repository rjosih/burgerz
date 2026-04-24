import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import type { ReactElement, ReactNode } from "react";
import { RestaurantDetail } from "../../pages/RestaurantDetail";

vi.mock("@tanstack/react-router", () => ({
	Link: ({
		children,
		...props
	}: {
		children: ReactNode;
		to: string;
	}): ReactElement => <a {...props}>{children}</a>,
}));

// Test data
const SMASH_STATION_ID = "9a12b0a1-3f65-4d74-a5a1-1e3d9c1f1001";
const BRIOCHE_BROTHERS_ID = "9a12b0a1-3f65-4d74-a5a1-1e3d9c1f1002";

const smashStationAddress = "Storgatan 12, 302 43 Halmstad, Sweden";
const briocheBrothersAddress = "Köpmansgatan 8, 302 42 Halmstad, Sweden";
const smashStationMondayHours = "11:00 – 21:00";

// User Story 1 - The user should see opening hours, address and open/closed status.
describe("RestaurantDetail – User Story 1", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	// Checks where the restaurant has hours today and is open now.
	describe("Equivalence Partitioning", () => {
		it("shows Open when the restaurant is open today and current time is inside opening hours", () => {
			// Monday 15:00 is inside 11:00–21:00
			vi.setSystemTime(new Date(2026, 0, 5, 15, 0));

			render(<RestaurantDetail restaurantId={SMASH_STATION_ID} />);

			expect(screen.getByTestId("restaurant-status")).toHaveTextContent("Open");
			expect(screen.getByTestId("restaurant-hours")).toHaveTextContent(
				smashStationMondayHours
			);
			expect(screen.getByTestId("restaurant-address")).toHaveTextContent(
				smashStationAddress
			);
		});

		it("shows Closed today when the restaurant has no opening hours today", () => {
			// Sunday has no opening hours for Brioche Brothers
			vi.setSystemTime(new Date(2026, 0, 4, 12, 0));

			render(<RestaurantDetail restaurantId={BRIOCHE_BROTHERS_ID} />);

			expect(screen.getByTestId("restaurant-status")).toHaveTextContent(
				"Closed"
			);
			expect(screen.getByTestId("restaurant-hours")).toHaveTextContent(
				"Closed today"
			);
			expect(screen.getByTestId("restaurant-address")).toHaveTextContent(
				briocheBrothersAddress
			);
		});

		it("shows Closed when the restaurant opens today but current time is before opening", () => {
			// Monday 09:00 is before opening time
			vi.setSystemTime(new Date(2026, 0, 5, 9, 0));

			render(<RestaurantDetail restaurantId={SMASH_STATION_ID} />);

			expect(screen.getByTestId("restaurant-status")).toHaveTextContent(
				"Closed"
			);
			expect(screen.getByTestId("restaurant-hours")).toHaveTextContent(
				smashStationMondayHours
			);
			expect(screen.getByTestId("restaurant-address")).toHaveTextContent(
				smashStationAddress
			);
		});
	});

	// Checks behavior exactly on the opening-hour boundaries.
	describe("Boundary Value Analysis", () => {
		it("shows Open exactly at opening time", () => {
			// Boundary value: 11:00
			vi.setSystemTime(new Date(2026, 0, 5, 11, 0));

			render(<RestaurantDetail restaurantId={SMASH_STATION_ID} />);

			expect(screen.getByTestId("restaurant-status")).toHaveTextContent("Open");
			expect(screen.getByTestId("restaurant-hours")).toHaveTextContent(
				smashStationMondayHours
			);
		});

		it("shows Closed exactly at closing time", () => {
			// Boundary value: 21:00
			vi.setSystemTime(new Date(2026, 0, 5, 21, 0));

			render(<RestaurantDetail restaurantId={SMASH_STATION_ID} />);

			expect(screen.getByTestId("restaurant-status")).toHaveTextContent(
				"Closed"
			);
			expect(screen.getByTestId("restaurant-hours")).toHaveTextContent(
				smashStationMondayHours
			);
		});
	});

	// Checks combinations of opening hours and current time.
	describe("Decision Table Testing", () => {
		it("Rule 1: has hours today and time is inside hours → Open", () => {
			// has hours: yes, inside hours: yes
			vi.setSystemTime(new Date(2026, 0, 5, 15, 0));

			render(<RestaurantDetail restaurantId={SMASH_STATION_ID} />);

			expect(screen.getByTestId("restaurant-status")).toHaveTextContent("Open");
		});

		it("Rule 2: has hours today and time is outside hours → Closed", () => {
			// has hours: yes, inside hours: no
			vi.setSystemTime(new Date(2026, 0, 5, 9, 0));

			render(<RestaurantDetail restaurantId={SMASH_STATION_ID} />);

			expect(screen.getByTestId("restaurant-status")).toHaveTextContent(
				"Closed"
			);
		});

		it("Rule 3: has no hours today = Closed today", () => {
			// has hours: no
			vi.setSystemTime(new Date(2026, 0, 4, 12, 0));

			render(<RestaurantDetail restaurantId={BRIOCHE_BROTHERS_ID} />);

			expect(screen.getByTestId("restaurant-status")).toHaveTextContent(
				"Closed"
			);
			expect(screen.getByTestId("restaurant-hours")).toHaveTextContent(
				"Closed today"
			);
		});
	});
});
