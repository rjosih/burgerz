import { createRootRoute, Outlet } from "@tanstack/react-router";
import { SideNav } from "../components/layout/SideNav";

export const Route = createRootRoute({
	component: () => (
		<div className="flex h-screen">
			<SideNav />
			<main className="flex-1 overflow-auto">
				<Outlet />
			</main>
		</div>
	),
});
