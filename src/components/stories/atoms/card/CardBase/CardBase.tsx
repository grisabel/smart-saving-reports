import React from "react";
import styles from "./CardBase.module.scss";

interface CardBaseProps {
  disabled?: boolean;
  children?: React.ReactNode;
  onClick: () => void;
}

const CardBase: React.FC<CardBaseProps> = ({ disabled, children, onClick }) => {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <div
      className={`${styles.cardBaseWp} ${
        disabled ? styles["cardBaseWp--disabled"] : ""
      }`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default CardBase;
