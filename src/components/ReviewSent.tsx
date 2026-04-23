import { type ReactElement, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "./Button";

interface Props {
	onReset: () => void;
}

export const ReviewSent = ({ onReset }: Props): ReactElement => {
	const headingRef = useRef<HTMLHeadingElement>(null);

	useEffect(() => {
		headingRef.current?.focus();
	}, []);

	return (
		<div className="flex h-full flex-col items-center justify-center gap-4 p-8">
			<div
				className="rounded-lg border border-green-200 bg-green-50 p-8 text-center"
				role="status"
			>
				<p
					ref={headingRef}
					className="mb-1 text-lg font-semibold text-green-800"
					tabIndex={-1}
				>
					Review submitted
				</p>
				<p className="text-sm text-green-700">
					Your review is pending approval and will appear once moderated.
				</p>
			</div>
			<div className="flex gap-3">
				<Button color="secondary" size="md" type="button" onClick={onReset}>
					Write another review
				</Button>
				<Link
					className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
					to="/reviews"
				>
					Go to Reviews
				</Link>
			</div>
		</div>
	);
};
