import { Link } from "@tanstack/react-router";
import {
	HomeIcon,
	StarIcon,
	PlusCircleIcon,
	BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, ReactElement, SVGProps } from "react";

type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>;

const navItems: Array<{
	to: string;
	label: string;
	Icon: HeroIcon;
	exact: boolean;
}> = [
	{ to: "/", label: "Start", Icon: HomeIcon, exact: true },
	{ to: "/reviews", label: "Reviews", Icon: StarIcon, exact: false },
	{ to: "/create", label: "Create", Icon: PlusCircleIcon, exact: false },
	{
		to: "/restaurants",
		label: "Restaurants",
		Icon: BuildingStorefrontIcon,
		exact: false,
	},
];

type NavItem = (typeof navItems)[number];

const NavTab = ({ to, label, Icon, exact }: NavItem): ReactElement => (
	<Link
		activeOptions={{ exact }}
		className="flex w-full flex-col items-center justify-center gap-1 text-slate-400 transition-colors hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
		to={to}
		activeProps={{
			"aria-current": "page",
			className:
				"flex w-full flex-col items-center justify-center gap-1 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
		}}
	>
		<Icon aria-hidden="true" className="h-6 w-6" />
		<span className="text-2xs font-medium">{label}</span>
	</Link>
);

export const MobileNav = (): ReactElement => (
	<nav
		aria-label="Mobile navigation"
		className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-700 bg-slate-800 sm:hidden"
	>
		<ul className="flex h-16">
			{navItems.map((item) => (
				<li key={item.to} className="flex flex-1">
					<NavTab {...item} />
				</li>
			))}
		</ul>
	</nav>
);
