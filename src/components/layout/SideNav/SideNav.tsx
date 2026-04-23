import { Link } from "@tanstack/react-router";
import type { ReactElement } from "react";

const navItems = [
	{ to: "/", label: "Start", exact: true },
	{ to: "/reviews", label: "Reviews", exact: false },
	{ to: "/create", label: "Create", exact: false },
	{ to: "/restaurants", label: "Restaurants", exact: false },
] as const;

type NavItem = (typeof navItems)[number];

const NavLink = ({ to, label, exact }: NavItem): ReactElement => (
	<Link
		activeOptions={{ exact }}
		className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
		to={to}
		activeProps={{
			"aria-current": "page",
			className:
				"flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium bg-slate-700 text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none",
		}}
	>
		{label}
	</Link>
);

export const SideNav = (): ReactElement => (
	<nav
		aria-label="Main navigation"
		className="hidden h-screen w-56 flex-col bg-slate-800 px-3 py-4 sm:flex"
	>
		<span aria-hidden="true" className="mb-6 px-3 text-lg font-bold text-white">
			burgerz
		</span>
		<ul className="flex flex-col gap-1">
			{navItems.map((item) => (
				<li key={item.to}>
					<NavLink {...item} />
				</li>
			))}
		</ul>
	</nav>
);
