import React from "react";
import styles from "./LinkBack.module.scss";
import Icon from "@/components/stories/atoms/Icon";

export interface LinkBackProps {
  label: string;
  onClick: () => void;
}

const LinkBack: React.FC<LinkBackProps> = ({ label, onClick }) => {
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    onClick();
  };

  return (
    <a className={styles.link} onClick={handleClick}>
      <Icon name="back" className={styles.icon} />
      {label}
    </a>
  );
};

export default LinkBack;
