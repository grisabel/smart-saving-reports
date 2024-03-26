import React from "react";
import styles from "./ContentBase.module.scss";

interface ContentBaseProps {
  children?: React.ReactNode;
}

const ContentBase: React.FC<ContentBaseProps> = ({ children }) => {
  return <div className={styles.contentBaseWp}>{children}</div>;
};

export default ContentBase;
