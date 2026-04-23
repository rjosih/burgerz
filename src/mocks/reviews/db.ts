import type { Review } from "./types";

const records: Array<Review> = [
	{
		id: "c0d1e2f3-aaaa-4000-b000-000000000001",
		name: "CrunchyBunEnjoyer",
		restaurantId: "9a12b0a1-3f65-4d74-a5a1-1e3d9c1f1001",
		scores: { taste: 5, texture: 5, visual: 5 },
		overallScore: 5.0,
		content:
			"I have eaten at dozens of burger joints across Sweden and Smash Station Halmstad is in a league of its own. The moment the patty hits that screaming-hot flat top and gets smashed down, you can hear the crust forming — a deeply caramelised, lacey edge that no oven-baked patty can ever replicate. The beef blend they use has just the right fat ratio, so every bite is juicy without being greasy. The brioche bun was pillowy but sturdy enough to hold together until the last bite, lightly toasted so it adds a subtle sweetness and crunch. Pickles were thin-cut and properly acidic, cutting through the richness perfectly. The sauce — a smoky house blend — tied every element together. Fries were crispy, well-seasoned, and stayed that way throughout the meal. Service was fast and friendly; our order arrived in under ten minutes despite the place being packed on a Friday evening. I will absolutely be back next time I am in Halmstad. Highly recommended to anyone who takes their burgers seriously.",
		photos: [
			{
				id: "f1a2b3c4-0001-4000-a000-000000000001",
				name: "Smash Station double patty close-up",
				reviewId: "c0d1e2f3-aaaa-4000-b000-000000000001",
				originalKey: "photos/reviews/1.avif",
				renditions: {
					thumbnail: "photos/reviews/1.avif",
					medium: "photos/reviews/1.avif",
					large: "photos/reviews/1.avif",
				},
				moderationStatus: "approved",
				exifStrippedKey: "photos/reviews/1.avif",
				altText: "Close-up of a double smash burger with caramelised crust",
				caption: "The double patty at Smash Station — pure perfection",
				isDecorative: false,
			},
			{
				id: "f1a2b3c4-0002-4000-a000-000000000002",
				name: "Smash Station fries and drink",
				reviewId: "c0d1e2f3-aaaa-4000-b000-000000000001",
				originalKey: "photos/reviews/2.avif",
				renditions: {
					thumbnail: "photos/reviews/2.avif",
					medium: "photos/reviews/2.avif",
					large: "photos/reviews/2.avif",
				},
				moderationStatus: "approved",
				exifStrippedKey: "photos/reviews/2.avif",
				altText: "Crispy fries and a soft drink served alongside the burger",
				caption: "Full meal deal — fries were on point too",
				isDecorative: false,
			},
		],
		moderationStatus: "approved",
		createdAt: "2026-03-15T13:22:00Z",
	},
	{
		id: "c0d1e2f3-aaaa-4000-b000-000000000002",
		name: "Anna",
		restaurantId: "9a12b0a1-3f65-4d74-a5a1-1e3d9c1f1002",
		scores: { taste: 4, texture: 5, visual: 4 },
		overallScore: 4.33,
		content:
			"Brioche Brothers has become my go-to spot in the city centre whenever I want something reliable and genuinely satisfying. The star of the show is obviously the bun — baked in-house, fluffy with a rich eggy flavour and a beautiful golden dome. It never gets soggy, no matter how sauced up your chosen burger is, which is a small miracle. I went for the truffle mushroom burger on this visit: the patty was cooked to a perfect medium, the mushroom duxelles were earthy and deeply savoury, and the truffle mayo added a luxurious finish without being overpowering. Texture throughout was excellent — soft, yielding bun against a slightly charred patty crust. My only slight gripe is that the visual presentation was a little uneven; the toppings had shifted in the wrap and the burger looked a bit lopsided when I opened it. That said, it tasted fantastic and the portion size is generous. Sweet potato fries were a highlight — properly crispy and came with a smoky chipotle dip. Will return without a doubt.",
		photos: [
			{
				id: "f1a2b3c4-0003-4000-a000-000000000003",
				name: "Brioche Brothers truffle mushroom burger",
				reviewId: "c0d1e2f3-aaaa-4000-b000-000000000002",
				originalKey: "photos/reviews/3.avif",
				renditions: {
					thumbnail: "photos/reviews/3.avif",
					medium: "photos/reviews/3.avif",
					large: "photos/reviews/3.avif",
				},
				moderationStatus: "approved",
				exifStrippedKey: "photos/reviews/3.avif",
				altText: "Truffle mushroom burger on a golden brioche bun",
				caption: "The truffle mushroom — worth every krona",
				isDecorative: false,
			},
		],
		moderationStatus: "approved",
		createdAt: "2026-03-20T18:45:00Z",
	},
	{
		id: "c0d1e2f3-aaaa-4000-b000-000000000003",
		name: "PetterFromHalmstad",
		restaurantId: "9a12b0a1-3f65-4d74-a5a1-1e3d9c1f1003",
		scores: { taste: 3, texture: 3, visual: 4 },
		overallScore: 3.33,
		content:
			"Patty Corner is fine. That is probably the most honest way I can describe it. The burger I ordered — a classic cheeseburger with bacon — looked genuinely appealing when it arrived, well stacked and neatly wrapped in branded paper. Points for presentation. But once I took a bite the experience became more ordinary. The patty was cooked through a bit too much for my liking, losing some of that crucial juiciness that makes a great burger. The cheese was melted properly but the flavour was quite mild — I would have preferred something with more character, like a aged cheddar or a blue cheese option. The bacon was crispy which is always a good sign, but there was not enough of it. The bun was just a standard sesame seed variety, soft but not particularly flavourful. Texture overall felt a little one-note. The fries were passable, not especially crispy. The staff were friendly and the place was clean and well presented. For the price point it is not a bad option if you are in the area, but I would not go out of my way to return when there are stronger alternatives in Halmstad.",
		photos: [
			{
				id: "f1a2b3c4-0004-4000-a000-000000000004",
				name: "Patty Corner classic cheeseburger",
				reviewId: "c0d1e2f3-aaaa-4000-b000-000000000003",
				originalKey: "photos/reviews/4.avif",
				renditions: {
					thumbnail: "photos/reviews/4.avif",
					medium: "photos/reviews/4.avif",
					large: "photos/reviews/4.avif",
				},
				moderationStatus: "approved",
				exifStrippedKey: "photos/reviews/4.avif",
				altText: "Classic cheeseburger with bacon at Patty Corner",
				caption: "Looked better than it tasted",
				isDecorative: false,
			},
		],
		moderationStatus: "approved",
		createdAt: "2026-04-02T12:10:00Z",
	},
	{
		id: "c0d1e2f3-aaaa-4000-b000-000000000004",
		name: "FrozenNorthFoodie47",
		restaurantId: "9a12b0a1-3f65-4d74-a5a1-1e3d9c1f1004",
		scores: { taste: 5, texture: 4, visual: 5 },
		overallScore: 4.67,
		content:
			"I was not expecting much when I stumbled into Northern Bun Umeå during a work trip, but this place genuinely surprised me. The menu is short and focused, which is always a good sign — they clearly know what they do and do it well. I ordered the signature Northern Bun: double smash patties, caramelised onions slow-cooked to jammy sweetness, a house-made lingonberry aioli that sounds odd but works brilliantly, and a topping of pickled cucumber that added a sharp Scandinavian edge. The visual presentation was outstanding — everything was layered with obvious care and the cross-section would look great on any food blog. The taste matched the looks: complex, balanced, genuinely exciting. The beef was high quality with a clean, rich flavour. My only minor note is the bun felt slightly denser than I would ideally like, but it held up well and the bite was not tough by any means. Fries were served with a dill dip that was addictive. Atmosphere in the restaurant was warm and unpretentious. Absolutely worth a visit if you find yourself in Umeå.",
		photos: [
			{
				id: "f1a2b3c4-0005-4000-a000-000000000005",
				name: "Northern Bun signature burger",
				reviewId: "c0d1e2f3-aaaa-4000-b000-000000000004",
				originalKey: "photos/reviews/5.avif",
				renditions: {
					thumbnail: "photos/reviews/5.avif",
					medium: "photos/reviews/5.avif",
					large: "photos/reviews/5.avif",
				},
				moderationStatus: "approved",
				exifStrippedKey: "photos/reviews/5.avif",
				altText: "Northern Bun signature double smash burger with lingonberry aioli",
				caption: "The Northern Bun — a Scandinavian smash burger done right",
				isDecorative: false,
			},
		],
		moderationStatus: "approved",
		createdAt: "2026-04-08T19:30:00Z",
	},
	{
		id: "c0d1e2f3-aaaa-4000-b000-000000000005",
		name: "AngryPickle88",
		restaurantId: "9a12b0a1-3f65-4d74-a5a1-1e3d9c1f1001",
		scores: { taste: 2, texture: 3, visual: 2 },
		overallScore: 2.33,
		content:
			"I want to preface this by saying I have had genuinely great experiences at Smash Station in the past, which makes this visit all the more frustrating. Something was clearly off during this particular service. The patty had been overcooked — no pink, no moisture, and the crust that usually forms from the smashing technique was absent, suggesting either the grill was not hot enough or the patty sat for too long before being served. The bun was stale around the edges, hinting that it had been sitting out. The sauce had been applied unevenly, with one side of the burger completely dry. Visually it looked rushed and deflated compared to the carefully assembled burgers I have seen here before. The texture was uniformly dry throughout — not at all what I expected from a smash burger. The fries were the one saving grace, arriving hot and crispy as usual. I spoke to the counter staff about my concerns and they were apologetic, offering a partial refund, which I appreciated. I will likely give them another chance because their best is genuinely excellent, but this visit fell well below their usual standard.",
		photos: [
			{
				id: "f1a2b3c4-0006-4000-a000-000000000006",
				name: "Overcooked patty at Smash Station",
				reviewId: "c0d1e2f3-aaaa-4000-b000-000000000005",
				originalKey: "photos/reviews/6.avif",
				renditions: {
					thumbnail: "photos/reviews/6.avif",
					medium: "photos/reviews/6.avif",
					large: "photos/reviews/6.avif",
				},
				moderationStatus: "approved",
				exifStrippedKey: "photos/reviews/6.avif",
				altText: "Dry, overcooked smash burger patty lacking crust or moisture",
				caption: "Not what I have come to expect from this place",
				isDecorative: false,
			},
		],
		moderationStatus: "approved",
		createdAt: "2026-04-14T20:05:00Z",
	},
	{
		id: "c0d1e2f3-aaaa-4000-b000-000000000006",
		name: "LunchBreakLars",
		restaurantId: "9a12b0a1-3f65-4d74-a5a1-1e3d9c1f1002",
		scores: { taste: 5, texture: 5, visual: 5 },
		overallScore: 5.0,
		content:
			"Midweek visits to restaurants can sometimes feel like a lottery — reduced staff, lower energy — but Brioche Brothers maintained every bit of its quality on this quiet Tuesday lunchtime. I tried the smoked brisket burger this time, and it was exceptional. The brisket was shredded and slow-cooked with a sweetness that balanced perfectly against the tangy house-pickled jalapeños. The brioche bun was, as always, impeccable — lightly glossy, golden, with that distinctive slightly sweet crumb that elevates the whole experience. Every texture was present: soft bun, tender brisket, crunchy jalapeños, creamy smoked mayo. Visually it was plated with real care — cross-cut in half, stacked tall, on a wooden board with the fries in a small side basket. I took a photo because it genuinely looked like something out of a food magazine. The taste lived up to the appearance entirely. Onion rings as a side were phenomenal — thick-cut, light batter, not greasy at all. A near-perfect lunch. This place sets a very high bar.",
		photos: [],
		moderationStatus: "approved",
		createdAt: "2026-04-17T13:00:00Z",
	},
	{
		id: "c0d1e2f3-aaaa-4000-b000-000000000007",
		name: "WildReindeerHunter99",
		restaurantId: "9a12b0a1-3f65-4d74-a5a1-1e3d9c1f1004",
		scores: { taste: 4, texture: 4, visual: 5 },
		overallScore: 4.33,
		content:
			"I made a deliberate trip to Umeå partly to revisit Northern Bun and it did not disappoint. On this occasion I tried the spicy reindeer burger, a seasonal special that I had seen mentioned online. The reindeer patty was leaner than beef but the kitchen had compensated with a generous knob of herb butter melted on top during the final seconds on the grill, keeping everything succulent. The spice came from a fermented chilli paste that had real depth — not just heat for the sake of it. The bun, as before, was slightly denser than the average brioche but it suits the heftier, Nordic-inspired toppings well. Visually this was a showstopper: the burger arrived with a small Swedish flag pick through the top and was surrounded by thin-sliced pickled turnips fanned out on the board. Texture-wise the bite was satisfying but I found the patty slightly firmer than ideal — a touch less cook time and it would have been perfect. Sides were strong: roasted root vegetable crisps with a lingonberry dip. This is a genuinely creative kitchen doing something different with the burger format, and doing it very well.",
		photos: [],
		moderationStatus: "pending",
		createdAt: "2026-04-21T17:55:00Z",
	},
];

export const reviewDb = {
	getAll(): Array<Review> {
		return [...records];
	},

	getById(id: string): Review | undefined {
		return records.find((r) => r.id === id);
	},

	getByRestaurantId(restaurantId: string): Array<Review> {
		return records.filter((r) => r.restaurantId === restaurantId);
	},

	create(data: Omit<Review, "id" | "createdAt">): Review {
		const review: Review = {
			...data,
			id: crypto.randomUUID(),
			createdAt: new Date().toISOString(),
		};
		records.push(review);
		return review;
	},

	update(
		id: string,
		data: Partial<Omit<Review, "id" | "createdAt">>,
	): Review | undefined {
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
