import { useShallowEqualSelector, RootState } from "store";
import { formatUsername, GameID, suffixImage } from "utils";
import Styles from "./index.module.css";
import PrizeImage from "assets/icons/score-table/prize.webp";
import { times, uniq } from "lodash";
import { Row } from "./row";
import { GameButton } from "components";
import { GalacticColors } from "enums/galactic-backgrounds";
import { useUserIsHost } from "hooks/use-user-is-host";
import { useTranslation } from "react-i18next";
import { roomService } from "services";

class Props {
  orderBy!: "asc" | "desc";
}

export const ScoreTable = (props: Props) => {
  const { t } = useTranslation();
  const { gameId, counter, usersIdsOrder, hostUsername, roomPin } = useShallowEqualSelector(
    (state: RootState) => ({
      gameId: state.room.gameId,
      counter: state.room.gameState?.counter || {},
      usersIdsOrder: state.room.usersIdsOrder,
      hostUsername: state.room.hostUsername,
      roomPin: state.room.pin,
    }),
  );

  const isHostUser = useUserIsHost();

  const scores = usersIdsOrder.map(userId => ({
    userId,
    score: counter[userId] || 0,
  }));

  if (props.orderBy === "desc") {
    scores.sort((a, b) => (a.score - b.score > 0 ? -1 : 1));
  } else {
    scores.sort((a, b) => (a.score - b.score > 0 ? 1 : -1));
  }

  const distinctScores = uniq(scores.map(s => s.score));
  const scorePlaces = new Map<number, number>();

  times(3).forEach((_, index) => {
    const score = distinctScores.shift();
    if (score !== undefined) {
      scorePlaces.set(score, index + 1);
    }
  });

  const label = isHostUser
    ? t("common.go_back")
    : `${t("common.waiting_for")} ${formatUsername(hostUsername)} ${t("common.to_continue")}`;
  return (
    <>
      <div className={Styles.tableContainer}>
        <table className={Styles.table}>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>
                <img
                  className={Styles.particle}
                  src={suffixImage(gameId as GameID)}
                  alt="particle"
                />
              </th>
              <th>
                <img className={Styles.prize} src={PrizeImage} alt="prize" />
              </th>
            </tr>
          </thead>
          <tbody>
            {scores.map(score => (
              <Row key={score.userId} score={score} scorePlaces={scorePlaces} />
            ))}
          </tbody>
        </table>
      </div>
      <GameButton
        label={label}
        onClick={() => roomService.goToRoomHome(roomPin as string)}
        backgroundImage={GalacticColors.BLUE}
        isDisabled={!isHostUser}
      />
    </>
  );
};
