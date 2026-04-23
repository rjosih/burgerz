import type { Control, FieldErrors } from "react-hook-form";
import { ScoreField } from "./ScoreField";
import type { FormValues } from "../helperFunctions/types";
import type { ReactElement } from "react";

interface Props {
	control: Control<FormValues>;
	errors: FieldErrors<FormValues>;
	overallScore: number | null;
}

export const ReviewScores = ({
	control,
	errors,
	overallScore,
}: Props): ReactElement => (
	<fieldset className="flex flex-col gap-4 rounded-lg border border-slate-200 p-4">
		<legend className="px-1 text-sm font-medium text-slate-700">Scores</legend>
		<ScoreField
			control={control}
			error={errors.scores?.taste?.message}
			label="Taste"
			name="scores.taste"
		/>
		<ScoreField
			control={control}
			error={errors.scores?.texture?.message}
			label="Texture"
			name="scores.texture"
		/>
		<ScoreField
			control={control}
			error={errors.scores?.visual?.message}
			label="Visual"
			name="scores.visual"
		/>
		{overallScore !== null && (
			<p className="text-sm text-slate-500">
				Overall:{" "}
				<span className="font-medium text-slate-700">
					{overallScore.toFixed(1)} / 5.0
				</span>
			</p>
		)}
	</fieldset>
);
