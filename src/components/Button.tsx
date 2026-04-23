import type { ButtonHTMLAttributes, ReactElement } from "react";
import { cn } from "../common/cn";

type Color = "primary" | "secondary";
type Size = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	color?: Color;
	size?: Size;
}

const colorClasses: Record<Color, string> = {
	primary: "bg-slate-700 text-white border-transparent hover:bg-slate-800",
	secondary:
		"bg-white text-slate-600 border-slate-300 hover:bg-slate-100 hover:border-slate-500",
};

const sizeClasses: Record<Size, string> = {
	sm: "px-3 py-1 text-xs",
	md: "px-4 py-2 text-sm",
	lg: "px-6 py-2 text-sm",
};

export const Button = ({
	color = "primary",
	size = "md",
	className = "",
	...props
}: Props): ReactElement => (
	<button
		className={cn(
			"rounded-lg border font-medium transition-colors focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40",
			colorClasses[color],
			sizeClasses[size],
			className
		)}
		{...props}
	/>
);
