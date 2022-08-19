import { CircularProgress } from "@mui/material";
import NeonBox from "components/neon-box/neon-box";
import { GalacticWallpaper } from "hoc";
import { useTranslation } from "react-i18next";

export const Loading = () => {
  const { t } = useTranslation();
  return (
    <GalacticWallpaper isContentHorizontallyCentered={true} isContentVerticallyCentered={true}>
      <NeonBox className="center" style={{ minWidth: "700px" }}>
        <h1 className="neon">{t("room.loading_account")}</h1>
        <CircularProgress />
      </NeonBox>
    </GalacticWallpaper>
  );
};
