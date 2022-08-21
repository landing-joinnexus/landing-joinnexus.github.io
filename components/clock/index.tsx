import { CircularProgress } from "@mui/material";
import { useUserIsHost } from "hooks/use-user-is-host";
import { now } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RootState, useShallowEqualSelector } from "store";
import Styles from "./index.module.css";

interface Props {
  nextStep: (roomPin: string, loserId?: number) => void;
}

export const Clock = (props: Props) => {
  const { nextStep } = props;
  const { roomPin, storyTimeEndAt, storyTimeStartAt, storyTimeDuration, userForStoryTime } = useShallowEqualSelector(
    (state: RootState) => ({
      storyTimeEndAt: state.room.gameState?.storyTimeEndAt,
      storyTimeStartAt: state.room.gameState?.storyTimeStartAt,
      roomPin: state.room.pin,
      storyTimeDuration: state.room.gameState?.storyTimeDuration || 1,
      userForStoryTime: state.room.gameState?.userForStoryTime,
    }),
  );

  const { t } = useTranslation();
  const isHostUser = useUserIsHost();

  const [time, setTime] = useState(now());
  const [storyTimeEndAtClient, setStoryTimeEndAtClient] = useState(0);

  const currentPercentage = (Math.abs(storyTimeEndAtClient - time) * 100) / storyTimeDuration;

  useEffect(() => {
    let timeout: unknown;
    if (currentPercentage > 5) {
      timeout = setTimeout(() => {
        setTime(now());
      }, 2000);
    } else if (isHostUser && roomPin) {
      nextStep(roomPin, userForStoryTime);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout as number);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPercentage, isHostUser, time]);

  useEffect(() => {
    if (!storyTimeStartAt) return;
    const lag = storyTimeStartAt - new Date().getTime();
    const endAt = (storyTimeEndAt || 0) + lag;

    setStoryTimeEndAtClient(endAt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyTimeStartAt]);

  return (
    <div className={Styles.container}>
      <p className="neon">{t("common.time_remain")}</p>
      <CircularProgress size={100} variant="determinate" value={currentPercentage} />
    </div>
  );
};
