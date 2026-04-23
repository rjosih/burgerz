import type { UseFormRegister } from "react-hook-form";
import type { FormValues } from "../helperFunctions/types";
import type { ReactElement } from "react";

interface Props {
	register: UseFormRegister<FormValues>;
	error?: string;
}

export const ChooseName = ({ register, error }: Props): ReactElement => (
	<div className="flex flex-col gap-1">
		<label className="text-sm font-medium text-slate-700" htmlFor="name">
			Name
		</label>
		<input
			aria-describedby={error ? "name-error" : undefined}
			aria-invalid={!!error}
			aria-required="true"
			className="rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-slate-500"
			id="name"
			placeholder="Your name or username"
			type="text"
			{...register("name")}
		/>
		{error && (
			<p className="text-xs text-red-500" id="name-error" role="alert">
				{error}
			</p>
		)}
	</div>
);
