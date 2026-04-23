import { Button } from "./Button";

interface Props {
	value: number | undefined;
	onChange: (n: number) => void;
	error?: string;
}

export const ScoreButton = ({ value, onChange, error }: Props) => (
	<div className="flex flex-col gap-1">
		<div className="flex gap-2">
			{([1, 2, 3, 4, 5] as const).map((n) => (
				<Button
					key={n}
					className="h-9 w-9 !px-0 !py-0"
					color={value === n ? "primary" : "secondary"}
					size="sm"
					type="button"
					onClick={() => { onChange(n); }}
				>
					{n}
				</Button>
			))}
		</div>
		{error && <p className="text-xs text-red-500">{error}</p>}
	</div>
);
