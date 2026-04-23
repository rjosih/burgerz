import { Controller, type Control } from "react-hook-form";
import { ScoreButton } from "./ScoreButton";
import type { FormValues } from "../helperFunctions/types";
import type { ReactElement } from "react";

interface Props {
	label: string;
	name: "scores.taste" | "scores.texture" | "scores.visual";
	control: Control<FormValues>;
	error?: string;
}

export const ScoreField = ({
	label,
	name,
	control,
	error,
}: Props): ReactElement => (
	<fieldset className="flex flex-col gap-1">
		<legend className="text-sm text-slate-600">{label}</legend>
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<ScoreButton
					error={error}
					fieldName={label}
					value={field.value}
					onChange={field.onChange}
				/>
			)}
		/>
	</fieldset>
);
