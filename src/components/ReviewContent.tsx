import type { UseFormRegister } from "react-hook-form";
import type { FormValues } from "../helperFunctions/types";
import type { ReactElement } from "react";

export type TextModerationStatus = "idle" | "scanning" | "safe" | "flagged";

interface Props {
	register: UseFormRegister<FormValues>;
	contentLength: number;
	error?: string;
	moderationStatus: TextModerationStatus;
	onContentBlur: () => void;
}

const moderationIndicator: Record<
	Exclude<TextModerationStatus, "idle">,
	{ text: string; className: string }
> = {
	scanning: { text: "Checking content…", className: "text-slate-500" },
	safe: { text: "Content verified", className: "text-green-600" },
	flagged: {
		text: "Inappropriate content detected",
		className: "text-red-500",
	},
};

export const ReviewContent = ({
	register,
	contentLength,
	error,
	moderationStatus,
	onContentBlur,
}: Props): ReactElement => (
	<div className="flex flex-col gap-1">
		<div className="flex items-center gap-2">
			<label className="text-sm font-medium text-slate-700" htmlFor="content">
				Review
			</label>
			<span className="rounded bg-slate-100 px-1.5 py-0.5 text-2xs font-medium text-slate-600 tracking-wide">
				AWS Rekognition
			</span>
		</div>
		<textarea
			aria-describedby={error ? "content-error" : "content-count"}
			aria-invalid={!!error}
			aria-required="true"
			id="content"
			placeholder="Write your review (max 500 characters)..."
			className={`min-h-48 rounded-lg border px-4 py-2 text-sm outline-none transition-colors focus:border-slate-500 ${
				moderationStatus === "flagged"
					? "border-red-400 bg-red-50"
					: "border-slate-300"
			}`}
			{...register("content", { onBlur: onContentBlur })}
		/>
		<div className="flex items-center justify-between gap-2">
			<div className="flex items-center gap-2">
				{error && (
					<p className="text-xs text-red-500" id="content-error" role="alert">
						{error}
					</p>
				)}
				<div
					aria-atomic="true"
					aria-live="polite"
					className="flex items-center gap-1"
				>
					{!error && moderationStatus !== "idle" && (
						<>
							{moderationStatus === "scanning" && (
								<span
									aria-hidden="true"
									className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-slate-300 border-t-slate-500 will-change-transform"
								/>
							)}
							<p
								className={`text-xs ${moderationIndicator[moderationStatus].className}`}
							>
								{moderationIndicator[moderationStatus].text}
							</p>
						</>
					)}
				</div>
			</div>
			<output
				aria-label={`${contentLength} of 500 characters used`}
				className={`shrink-0 text-xs ${contentLength >= 500 ? "text-green-600" : "text-slate-500"}`}
				id="content-count"
			>
				{contentLength} / 500
			</output>
		</div>
	</div>
);
