import Styles from "./index.module.css";

interface Props {
  title: string;
  subtitle: string;
  img: string;
}

export const Banner = (props: Props) => {
  return (
    <div className={Styles.container}>
      <div data-testid="focus" className={Styles.messageContainer}>
        <div className={Styles.message}>
          <div className={`${Styles.title}`}>{props.title}</div>
          <div className={`${Styles.subtitle}`}>
            {props.subtitle}
          </div>
        </div>
      </div>
      <div data-testid="rocket">
        <img className={`${Styles.rocketImg}`} alt="rocket" src={props.img} />
      </div>
    </div>
  );
};
