import { round } from "lodash";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Styles from "./index.module.css";

export interface IStatistic {
  prefix: string;
  suffix: string;
  value: number;
  link: string;
  index?: number;
}

const goToPage = (link: string) => () => {
  if (link) {
    window.open(link, "_blank");
  }
};

const easeOutQuad = (t: number) => t * (2 - t);

const duration = 1500;

const frameDuration = 2000 / 60;

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};

export const Statistic = (props: IStatistic) => {
  const { t } = useTranslation();
  const { prefix, suffix, value, index, link } = props;
  const [count, setCount] = useState(0);
  const [isAlreadyShow, setIsAlreadyShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const callbackFunction = (entries: Array<{ isIntersecting: boolean }>) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    let observerRefValue: HTMLDivElement | null = null;
    const observer = new IntersectionObserver(callbackFunction, options);
    if (containerRef.current) {
      observer.observe(containerRef.current);
      observerRefValue = containerRef.current;
    }

    return () => {
      if (observerRefValue) observer.unobserve(observerRefValue);
    };
  }, [containerRef]);

  useEffect(() => {
    if (!isVisible || isAlreadyShow) {
      return;
    }

    let frame = 0;
    const totalFrames = Math.round(duration / frameDuration);
    const counter = setInterval(() => {
      frame++;
      const progress = easeOutQuad(frame / totalFrames);
      setCount(value * progress);

      if (frame === totalFrames) {
        clearInterval(counter);
        setIsAlreadyShow(true);
      }
    }, frameDuration);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      role="contentinfo"
      className={Styles.container}
      onClick={goToPage(link)}
    >
      <div className={Styles.title}>
        {prefix}
        {round(count, 2)}
        {suffix}
      </div>
      <p className={Styles.description}>
        {t(`landing.statistics.statistics_${(index as number) + 1}`)}
      </p>
    </div>
  );
};
