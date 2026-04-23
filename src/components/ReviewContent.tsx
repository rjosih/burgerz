import type { UseFormRegister } from "react-hook-form";
import type { FormValues } from "../helperFunctions/types";

export type TextModerationStatus = "idle" | "scanning" | "safe" | "flagged";

interface Props {
	register: UseFormRegister<FormValues>;
	contentLength: number;
	error?: string;
	moderationStatus: TextModerationStatus;
	onContentBlur: () => void;
}

const moderationIndicator: Record<Exclude<TextModerationStatus, "idle">, { text: string; className: string }> = {
	scanning: {
		text: "Checking content…",
		className: "text-slate-400",
	},
	safe: {
		text: "✓ Content verified",
		className: "text-green-600",
	},
	flagged: {
		text: "⚠ Inappropriate content detected",
		className: "text-red-500",
	},
};

export const ReviewContent = ({ register, contentLength, error, moderationStatus, onContentBlur }: Props) => (
	<div className="flex flex-col gap-1">
		<div className="flex items-center gap-2">
			<label className="text-sm font-medium text-slate-700" htmlFor="content">
				Review
			</label>
			<span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 tracking-wide">
				AWS Rekognition
			</span>
		</div>
		<textarea
			className={`min-h-48 rounded-lg border px-4 py-2 text-sm outline-none transition-colors focus:border-slate-500 ${
				moderationStatus === "flagged"
					? "border-red-400 bg-red-50"
					: "border-slate-300"
			}`}
			id="content"
			placeholder="Write your review (max 500 characters)..."
			{...register("content", { onBlur: onContentBlur })}
		/>
		<div className="flex items-center justify-between gap-2">
			<div className="flex items-center gap-2">
				{error && <p className="text-xs text-red-500">{error}</p>}
				{!error && moderationStatus !== "idle" && (
					<div className="flex items-center gap-1">
						{moderationStatus === "scanning" && (
							<span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-slate-300 border-t-slate-500" />
						)}
						<p className={`text-xs ${moderationIndicator[moderationStatus].className}`}>
							{moderationIndicator[moderationStatus].text}
						</p>
					</div>
				)}
			</div>
			<p className={`shrink-0 text-xs ${contentLength >= 500 ? "text-green-600" : "text-slate-400"}`}>
				{contentLength} / 500
			</p>
		</div>
	</div>
);
