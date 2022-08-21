import { Clock } from "components/clock";
import { thinkFastService } from "services/think-fast.service";
import { Carrousel } from "./carrousel";
import { NextButton } from "./next-button";
import { Question } from "./question";

export const SayWord = () => {
  return (
    <>
      <Question />
      <Carrousel />
      <Clock
        nextStep={
          thinkFastService.addFail as unknown as (
            roomPin: string,
            loserId?: number | undefined,
          ) => void
        }
      />
      <NextButton />
    </>
  );
};
