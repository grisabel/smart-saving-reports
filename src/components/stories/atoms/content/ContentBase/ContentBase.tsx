import React from "react";
import styles from "./ContentBase.module.scss";

interface ContentBaseProps {
  children?: React.ReactNode;
  className?: string;
}

const ContentBase: React.FC<ContentBaseProps> = ({ children, className }) => {
  return (
    <div className={`${styles.contentBaseWp} ${className}`}>{children}</div>
  );
};

export default ContentBase;
