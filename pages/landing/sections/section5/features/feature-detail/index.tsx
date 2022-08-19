import Styles from './index.module.css';

interface Props {
  image: string;
  title: string;
  message: string;
}

export const FeatureDetail = (props: Props) => {
  return (
    <div>
      <div className={Styles.imageContainer}>
        <img className={Styles.image} alt="" src={props.image} />
      </div>
      <div className={Styles.title}>{props.title}</div>
      <p className={Styles.message}>{props.message}</p>
    </div>
  )
}