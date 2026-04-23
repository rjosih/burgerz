import { Link } from "@tanstack/react-router";

const navItems = [
	{ to: "/", label: "Start", exact: true },
	{ to: "/reviews", label: "Reviews", exact: false },
	{ to: "/create", label: "Create", exact: false },
	{ to: "/restaurants", label: "Restaurants", exact: false },
] as const;

const baseClass =
	"flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white";
const activeClass = "bg-slate-700 text-white";

export const SideNav = () => {
	return (
		<nav className="flex h-screen w-56 flex-col bg-slate-800 px-3 py-4">
			<span className="mb-6 px-3 text-lg font-bold text-white">The Burger Frontend</span>
			<ul className="flex flex-col gap-1">
				{navItems.map(({ to, label, exact }) => (
					<li key={to}>
						<Link
							activeOptions={{ exact }}
							activeProps={{ className: `${baseClass} ${activeClass}` }}
							className={baseClass}
							to={to}
						>
							{label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};
