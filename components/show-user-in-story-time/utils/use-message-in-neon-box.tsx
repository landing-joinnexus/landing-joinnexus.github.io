import { sanitizeLanguage } from "lang/i18";
import { size } from "lodash";
import { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { RootState, useShallowEqualSelector } from "store";

export const useMessageInNeonBox = (
  questionPrefix: string,
  questionSuffix: string,
  storyUserIsTheSameUserInSession: boolean,
  userNameFormatted: string,
  storyTimePrefix?: string,
  storyTimeSuffix?: string,
  underline?: string,
) => {
  const { t, i18n } = useTranslation();

  const { questionLanguages } = useShallowEqualSelector((state: RootState) => ({
    questionLanguages: state.room.gameState?.question?.questionLanguages,
  }));

  const currentLanguage = sanitizeLanguage(i18n.language);
  const style: CSSProperties = {};

  if (underline) {
    style.borderBottom = `2px solid ${underline}`;
  }

  let question = questionLanguages?.find(ql => ql.languageId === currentLanguage)?.label;

  question = `${questionPrefix} ${question} ${questionSuffix}`;

  if (storyUserIsTheSameUserInSession) {
    const prefix = storyTimePrefix
      ? t(storyTimePrefix)
      : t("story_time.hey_lets_tell_us_your_story_with");
    const message = `${prefix} ${question}`;
    const messageSplit = message.split(": ");
    const preMessage = messageSplit.shift();

    let suffixLabel = null;
    if (size(messageSplit)) {
      suffixLabel = (
        <>
          :<label style={style}> {messageSplit.join(": ")}</label>
        </>
      );
    }

    return (
      <>
        <label>{preMessage}</label>
        {suffixLabel}
      </>
    );
  }

  const suffix = storyTimeSuffix
    ? t(storyTimeSuffix)
    : t("story_time.is_going_to_tell_us_his_her_story_with");

  return (
    <>
      <label> {userNameFormatted}</label>
      <label style={style}>
        {" "}
        {suffix}: {question}
      </label>
    </>
  );
};
