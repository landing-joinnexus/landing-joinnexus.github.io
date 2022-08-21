import { User } from "models";
import AstronautImg from 'assets/icons/platform/astronaut.svg';
import Styles from './index.module.css';

interface Props {
  user: User;
}
export const UserColumn = (props: Props) => {
  return (
    <div className={Styles.container}>
      <div>
        <img className={Styles.icon} src={AstronautImg} alt="player"/>
      </div>
      <div className={Styles.informationContainer}>
        <label className={Styles.name}>{props.user.name}</label>
        <label className={Styles.email}>{props.user.email}</label>
      </div>
    </div>
  );
};
