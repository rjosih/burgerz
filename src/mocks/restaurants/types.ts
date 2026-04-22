export interface TimeSlot {
	open: string;
	close: string;
}

export interface OpeningHours {
	mon: Array<TimeSlot>;
	tue: Array<TimeSlot>;
	wed: Array<TimeSlot>;
	thu: Array<TimeSlot>;
	fri: Array<TimeSlot>;
	sat: Array<TimeSlot>;
	sun: Array<TimeSlot>;
}

export interface PhotoRenditions {
	thumbnail: string;
	medium: string;
	large: string;
}

export type ModerationStatus = "pending" | "approved" | "flagged" | "rejected";

export interface Photo {
	id: string;
	name: string;
	reviewId: string | null;
	originalKey: string;
	renditions: PhotoRenditions;
	moderationStatus: ModerationStatus;
	exifStrippedKey: string;
	altText: string;
	caption: string;
	isDecorative: boolean;
}

export interface Location {
	lat: number;
	lng: number;
	geohash: string;
}

export interface Restaurant {
	id: string;
	name: string;
	address: string;
	photo: Photo;
	location: Location;
	phone: string;
	openingHours: OpeningHours;
	servesBurger: boolean;
	createdAt: string;
}
