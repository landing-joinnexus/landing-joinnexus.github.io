import { SpeedDial, SpeedDialAction, Tooltip } from "@mui/material";
import Styles from "./index.module.css";
import languageIcon from "assets/icons/platform/language.svg";
import { useTranslation } from "react-i18next";
import { languageResources } from "lang/languages";
import { keys } from "lodash";

const actions = keys(languageResources).map(language => ({
  name: language,
  // tslint:disable-next-line: no-any
  icon: (languageResources as any)[language].icon,
}));

const ChangeLanguageButton = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className={Styles.container}>
      <Tooltip title={`${t("languages.change_language")}`}>
        <SpeedDial
          className={Styles.changeLanguageButton}
          ariaLabel="Change language button"
          icon={<img src={languageIcon} alt="change language" />}
        >
          {actions.map(action => (
            <SpeedDialAction
              key={action.name}
              data-testid={action.name}
              icon={<img className={Styles.image} src={action.icon} alt={action.name} />}
              tooltipTitle={t(`languages.${action.name}`)}
              onClick={() => i18n.changeLanguage(action.name)}
            />
          ))}
        </SpeedDial>
      </Tooltip>
    </div>
  );
};

export default ChangeLanguageButton;
