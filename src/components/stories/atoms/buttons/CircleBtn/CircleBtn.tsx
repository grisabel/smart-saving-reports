import Icon from "../../Icon";
import { SmartSavingsIconName } from "../../Icon/SmartSavingsIcon";
import styles from "./CircleBtn.module.scss";

interface CircleBtnProps {
  iconName: SmartSavingsIconName;
  disabled?: boolean;
  onClick: () => void;
}

const CircleBtn: React.FC<CircleBtnProps> = ({
  iconName,
  disabled,
  onClick,
}) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={styles.CircleBtnWp}
      aria-label="arrow-change"
    >
      <Icon name={iconName} className={`${styles.icon} ${styles[iconName]}`} />
    </button>
  );
};

export default CircleBtn;
