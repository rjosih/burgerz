import type { ReactElement } from "react";
import { cn } from "../common/cn";

interface Props {
	fieldName: string;
	value: number | undefined;
	onChange: (number: number) => void;
	error?: string;
}

export const ScoreButton = ({
	fieldName,
	value,
	onChange,
	error,
}: Props): ReactElement => (
	<div className="flex flex-col gap-1">
		<div className="flex gap-2">
			{([1, 2, 3, 4, 5] as const).map((score) => {
				const checked = value === score;
				return (
					<label
						key={score}
						className={cn(
							"relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border text-xs font-medium transition-colors focus-within:ring-2 focus-within:ring-slate-500 focus-within:ring-offset-1",
							checked
								? "border-transparent bg-slate-700 text-white"
								: "border-slate-300 bg-white text-slate-600 hover:border-slate-500 hover:bg-slate-100"
						)}
					>
						<input
							aria-label={`${fieldName}: ${score} out of 5`}
							checked={checked}
							className="absolute inset-0 cursor-pointer opacity-0"
							name={fieldName}
							type="radio"
							value={score}
							onChange={() => {
								onChange(score);
							}}
						/>
						{score}
					</label>
				);
			})}
		</div>
		{error && (
			<p className="text-xs text-red-500" role="alert">
				{error}
			</p>
		)}
	</div>
);
