import type { UseFormSetValue } from "react-hook-form";
import type { FormValues } from "./types";

// Stores the selected restaurant ID in the form, updates the visible search input, and closes the dropdown
export const handleRestaurantSelect = (
	id: string,
	name: string,
	setValue: UseFormSetValue<FormValues>,
	setRestaurantQuery: (query: string) => void,
	setShowDropdown: (show: boolean) => void
): void => {
	setValue("restaurantId", id, { shouldValidate: true });
	setRestaurantQuery(name);
	setShowDropdown(false);
};
