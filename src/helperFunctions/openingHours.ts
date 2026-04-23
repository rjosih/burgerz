import type { OpeningHours, TimeSlot } from "../mocks/restaurants/types";

const DAY_KEYS: Array<keyof OpeningHours> = [
	"sun",
	"mon",
	"tue",
	"wed",
	"thu",
	"fri",
	"sat",
];

const toMinutes = (time: string): number => {
	const [h, m] = time.split(":").map(Number);
	return (h ?? 0) * 60 + (m ?? 0);
};

export const getTodayOpeningHours = (
	openingHours: OpeningHours,
	now?: Date
): Array<TimeSlot> => {
	const day = (now ?? new Date()).getDay();
	return openingHours[DAY_KEYS[day]!];
};

export const isOpenNow = (openingHours: OpeningHours, now?: Date): boolean => {
	const date = now ?? new Date();
	const slots = getTodayOpeningHours(openingHours, date);
	const current = date.getHours() * 60 + date.getMinutes();
	return slots.some(
		(slot) => current >= toMinutes(slot.open) && current < toMinutes(slot.close)
	);
};
