import { createRootRoute, Outlet } from "@tanstack/react-router";
import { AccessibilityToolbar } from "../components/layout/AccessibilityToolbar";
import { MobileNav } from "../components/layout/MobileNav";
import { SideNav } from "../components/layout/SideNav";

export const Route = createRootRoute({
	component: () => (
		<div className="flex h-screen">
			<SideNav />
			<main className="flex flex-1 flex-col overflow-auto pb-16 sm:pb-0">
				<AccessibilityToolbar />
				<div className="flex-1">
					<Outlet />
				</div>
			</main>
			<MobileNav />
		</div>
	),
});
