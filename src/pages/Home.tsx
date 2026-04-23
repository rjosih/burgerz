import { useTranslation } from "react-i18next";
import { Button } from "../components/Button";
import type { FunctionComponent } from "../common/types";

export const Home = (): FunctionComponent => {
	const { t, i18n } = useTranslation();
	const isEnglish = i18n.resolvedLanguage === "en";

	const onTranslateButtonClick = async (): Promise<void> => {
		if (i18n.resolvedLanguage === "en") {
			await i18n.changeLanguage("se");
		} else {
			await i18n.changeLanguage("en");
		}
	};

	return (
		<div className="flex h-full flex-col items-center justify-center gap-8 bg-blue-700 px-6 py-12">
			<div className="flex flex-col items-center gap-3 text-center">
				<h1 className="text-4xl font-bold text-black sm:text-6xl">
					{t("home.greeting")}
				</h1>
				<p className="text-base font-normal text-blue-100 sm:text-lg">
					Discover and review burger restaurants near you.
				</p>
			</div>
			<Button
				aria-label={isEnglish ? "Switch to Swedish" : "Switch to English"}
				className="min-h-11 min-w-40"
				color="secondary"
				size="lg"
				type="button"
				onClick={onTranslateButtonClick}
			>
				{isEnglish ? "Switch to Swedish" : "Switch to English"}
			</Button>
		</div>
	);
};
