import type { ReactElement } from "react";
import { Button } from "./Button";

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
			{([1, 2, 3, 4, 5] as const).map((score) => (
				<Button
					key={score}
					aria-label={`${fieldName}: ${score} out of 5`}
					aria-pressed={value === score}
					className="h-9 w-9 px-0! py-0!"
					color={value === score ? "primary" : "secondary"}
					size="sm"
					type="button"
					onClick={() => {
						onChange(score);
					}}
				>
					{score}
				</Button>
			))}
		</div>
		{error && (
			<p className="text-xs text-red-500" role="alert">
				{error}
			</p>
		)}
	</div>
);
