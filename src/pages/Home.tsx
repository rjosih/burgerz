import { useTranslation } from "react-i18next";
import { Button } from "../components/Button";
import type { FunctionComponent } from "../common/types";

export const Home = (): FunctionComponent => {
	const { t, i18n } = useTranslation();

	const onTranslateButtonClick = async (): Promise<void> => {
		if (i18n.resolvedLanguage === "en") {
			await i18n.changeLanguage("es");
		} else {
			await i18n.changeLanguage("en");
		}
	};

	return (
		<div className="bg-blue-300 font-bold flex-1 flex flex-col justify-center items-center h-full">
			<p className="text-white text-6xl">{t("home.greeting")}</p>
			<Button color="secondary" size="md" type="button" onClick={onTranslateButtonClick}>
				translate
			</Button>
		</div>
	);
};