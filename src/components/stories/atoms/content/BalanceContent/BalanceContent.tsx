import React from "react";
import styles from "./BalanceContent.module.scss";
import ContentBase from "../ContentBase";

interface BalanceContentProps {
  title: string;
  amount: string;
  type?: "expense" | "income";
}

const BalanceContent: React.FC<BalanceContentProps> = ({
  title,
  amount,
  type,
}) => {
  const amountClasses = [styles.amount];
  if (type === "income") {
    amountClasses.push(styles["amount--positive"]);
  } else if (type === "expense") {
    amountClasses.push(styles["amount--negative"]);
  }

  return (
    <ContentBase>
      <div className={styles.balanceContentWp}>
        <p className={styles.title}>{title}</p>
        <p className={amountClasses.join(" ")}>{amount} €</p>
      </div>
    </ContentBase>
  );
};

export default BalanceContent;
