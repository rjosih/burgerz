import { createFileRoute } from "@tanstack/react-router";
import { RestaurantDetail } from "../pages/RestaurantDetail";

export const Route = createFileRoute("/restaurants_/$restaurantId")({
	component: function RestaurantDetailRoute() {
		const { restaurantId } = Route.useParams();
		return <RestaurantDetail restaurantId={restaurantId} />;
	},
});
