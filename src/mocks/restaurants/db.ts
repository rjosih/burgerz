import type { Restaurant } from "./types";

const records: Array<Restaurant> = [
	{
		id: "9a12b0a1-3f65-4d74-a5a1-1e3d9c1f1001",
		name: "Smash Station Halmstad",
		address: "Storgatan 12, 302 43 Halmstad, Sweden",
		photo: {
			id: "e8c1d2a3-1111-4c44-9b11-aaaabbbb0001",
			name: "Smash Station Front",
			reviewId: null,
			originalKey:
				"photos/restaurants/smash-station-halmstad/original/smashstationhalmstad.avif",
			renditions: {
				thumbnail:
					"photos/restaurants/smash-station-halmstad/renditions/smashstationhalmstad-thumb.avif",
				medium: "photos/restaurants/smash-station-halmstad/renditions/smashstationhalmstad-medium.avif",
				large:
					"photos/restaurants/smash-station-halmstad/renditions/smashstationhalmstad-large.avif",
			},
			moderationStatus: "approved",
			exifStrippedKey:
				"photos/restaurants/smash-station-halmstad/clean/smashstationhalmstad-clean.avif",
			altText: "Exterior of Smash Station Halmstad with outdoor seating",
			caption: "Front entrance of Smash Station Halmstad",
			isDecorative: false,
		},
		location: { lat: 56.6749, lng: 12.8576, geohash: "u62823a" },
		phone: "+46 35 100 101",
		openingHours: {
			mon: [{ open: "11:00", close: "21:00" }],
			tue: [{ open: "11:00", close: "21:00" }],
			wed: [{ open: "11:00", close: "21:00" }],
			thu: [{ open: "11:00", close: "22:00" }],
			fri: [
				{ open: "11:00", close: "14:00" },
				{ open: "17:00", close: "23:00" },
			],
			sat: [{ open: "12:00", close: "23:00" }],
			sun: [{ open: "12:00", close: "20:00" }],
		},
		servesBurger: true,
		createdAt: "2026-04-22T10:00:00Z",
	},
	{
		id: "9a12b0a1-3f65-4d74-a5a1-1e3d9c1f1002",
		name: "Brioche Brothers",
		address: "Köpmansgatan 8, 302 42 Halmstad, Sweden",
		photo: {
			id: "e8c1d2a3-2222-4c44-9b11-aaaabbbb0002",
			name: "Brioche Brothers Interior",
			reviewId: null,
			originalKey: "photos/restaurants/brioche-brothers/original/briocheburgers.avif",
			renditions: {
				thumbnail:
					"photos/restaurants/brioche-brothers/renditions/briochebrothers-thumb.avif",
				medium: "photos/restaurants/brioche-brothers/renditions/briochebrothers-medium.avif",
				large:
					"photos/restaurants/brioche-brothers/renditions/briochebrothers-large.avif",
			},
			moderationStatus: "approved",
			exifStrippedKey: "photos/restaurants/brioche-brothers/clean/briochebrothers-clean.avif",
			altText: "Interior of Brioche Brothers burger restaurant",
			caption: "Dining area at Brioche Brothers",
			isDecorative: false,
		},
		location: { lat: 56.6754, lng: 12.8582, geohash: "u62823b" },
		phone: "+46 35 100 102",
		openingHours: {
			mon: [{ open: "10:30", close: "20:30" }],
			tue: [{ open: "10:30", close: "20:30" }],
			wed: [{ open: "10:30", close: "20:30" }],
			thu: [{ open: "10:30", close: "21:30" }],
			fri: [{ open: "10:30", close: "22:30" }],
			sat: [{ open: "11:00", close: "22:30" }],
			sun: [],
		},
		servesBurger: true,
		createdAt: "2026-04-22T10:05:00Z",
	},
	{
		id: "9a12b0a1-3f65-4d74-a5a1-1e3d9c1f1003",
		name: "Patty Corner",
		address: "Fredsgatan 3, 302 46 Halmstad, Sweden",
		photo: {
			id: "e8c1d2a3-3333-4c44-9b11-aaaabbbb0003",
			name: "Patty Corner Burger Plate",
			reviewId: null,
			originalKey: "photos/restaurants/patty-corner/original/pattycorner.avif",
			renditions: {
				thumbnail:
					"photos/restaurants/patty-corner/renditions/pattycorner-thumb.avif",
				medium: "photos/restaurants/patty-corner/renditions/pattycorner-medium.avif",
				large:
					"photos/restaurants/patty-corner/renditions/pattycorner-large.avif",
			},
			moderationStatus: "approved",
			exifStrippedKey: "photos/restaurants/patty-corner/clean/pattycorner-clean.avif",
			altText: "Burger plate with fries served at Patty Corner",
			caption: "Signature burger meal at Patty Corner",
			isDecorative: false,
		},
		location: { lat: 56.6738, lng: 12.8591, geohash: "u62823c" },
		phone: "+46 35 100 103",
		openingHours: {
			mon: [{ open: "11:30", close: "20:00" }],
			tue: [{ open: "11:30", close: "20:00" }],
			wed: [{ open: "11:30", close: "20:00" }],
			thu: [{ open: "11:30", close: "21:00" }],
			fri: [{ open: "11:30", close: "22:00" }],
			sat: [{ open: "12:00", close: "22:00" }],
			sun: [{ open: "12:00", close: "19:00" }],
		},
		servesBurger: true,
		createdAt: "2026-04-22T10:10:00Z",
	},
	{
		id: "9a12b0a1-3f65-4d74-a5a1-1e3d9c1f1004",
		name: "Northern Bun Umeå",
		address: "Rådhusesplanaden 14, 903 28 Umeå, Sweden",
		photo: {
			id: "e8c1d2a3-4444-4c44-9b11-aaaabbbb0004",
			name: "Northern Bun Exterior",
			reviewId: null,
			originalKey: "photos/restaurants/northern-bun-umea/original/northernbunumea.avif",
			renditions: {
				thumbnail:
					"photos/restaurants/northern-bun-umea/renditions/northernbunumea-thumb.avif",
				medium: "photos/restaurants/northern-bun-umea/renditions/northernbunumea-medium.avif",
				large:
					"photos/restaurants/northern-bun-umea/renditions/northernbunumea-large.avif",
			},
			moderationStatus: "approved",
			exifStrippedKey:
				"photos/restaurants/northern-bun-umea/clean/northernbunumea-clean.avif",
			altText: "Exterior of Northern Bun Umeå on a snowy street",
			caption: "Northern Bun Umeå entrance",
			isDecorative: false,
		},
		location: { lat: 63.8258, lng: 20.263, geohash: "u4pruyd" },
		phone: "+46 90 200 404",
		openingHours: {
			mon: [{ open: "11:00", close: "20:00" }],
			tue: [{ open: "11:00", close: "20:00" }],
			wed: [{ open: "11:00", close: "20:00" }],
			thu: [{ open: "11:00", close: "21:00" }],
			fri: [{ open: "11:00", close: "22:00" }],
			sat: [{ open: "12:00", close: "22:00" }],
			sun: [{ open: "12:00", close: "19:00" }],
		},
		servesBurger: true,
		createdAt: "2026-04-22T10:15:00Z",
	},
];

export const restaurantDb = {
	getAll(): Array<Restaurant> {
		return [...records];
	},

	getById(id: string): Restaurant | undefined {
		return records.find((r) => r.id === id);
	},

	create(data: Omit<Restaurant, "id" | "createdAt">): Restaurant {
		const restaurant: Restaurant = {
			...data,
			id: crypto.randomUUID(),
			createdAt: new Date().toISOString(),
		};
		records.push(restaurant);
		return restaurant;
	},

	update(
		id: string,
		data: Partial<Omit<Restaurant, "id" | "createdAt">>,
	): Restaurant | undefined {
		const index = records.findIndex((r) => r.id === id);
		if (index === -1) return undefined;
		records[index] = { ...records[index]!, ...data };
		return records[index];
	},

	delete(id: string): boolean {
		const index = records.findIndex((r) => r.id === id);
		if (index === -1) return false;
		records.splice(index, 1);
		return true;
	},
};
