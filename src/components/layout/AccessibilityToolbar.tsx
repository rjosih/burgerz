import { type ReactElement, useState } from "react";
import { SpeakerWaveIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { cn } from "../../common/cn";
import { Button } from "../Button";

export const AccessibilityToolbar = (): ReactElement => {
	const [listening, setListening] = useState(false);
	const { i18n } = useTranslation();
	const isEnglish = i18n.resolvedLanguage === "en";

	return (
		<div
			aria-label="Accessibility controls"
			className="flex items-center justify-end gap-1 border-b border-slate-200 bg-slate-50 px-4 py-1.5"
			role="toolbar"
		>
			<Button
				aria-pressed={listening}
				aria-label={
					listening ? "Stop listening to this page" : "Listen to this page"
				}
				className={cn(
					"flex items-center gap-1.5 rounded! border-transparent! px-2.5!",
					listening
						? "bg-blue-100! text-blue-700! hover:bg-blue-100! hover:border-transparent!"
						: "bg-transparent! text-slate-600 hover:bg-slate-100! hover:border-transparent!"
				)}
				color="secondary"
				size="sm"
				type="button"
				onClick={() => {
					setListening((previous) => !previous);
				}}
			>
				<SpeakerWaveIcon
					aria-hidden="true"
					className={`h-4 w-4 ${listening ? "animate-pulse" : ""}`}
				/>
				<span className="hidden sm:inline">
					{listening ? "Listening…" : "Listen"}
				</span>
			</Button>

			<Button
				aria-label={isEnglish ? "Switch to Swedish" : "Switch to English"}
				className="flex items-center gap-1.5 rounded! border-transparent! bg-transparent! px-2.5! text-slate-600 hover:bg-slate-100! hover:border-transparent!"
				color="secondary"
				size="sm"
				type="button"
				onClick={() => {
					void i18n.changeLanguage(isEnglish ? "se" : "en");
				}}
			>
				<GlobeAltIcon aria-hidden="true" className="h-4 w-4" />
				<span>{isEnglish ? "EN" : "SE"}</span>
			</Button>
		</div>
	);
};
