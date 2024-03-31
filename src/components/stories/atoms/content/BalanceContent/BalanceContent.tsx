import React from "react";
import styles from "./BalanceContent.module.scss";
import ContentBase from "../ContentBase";
import { formatCurrency } from "@/utils/Currency";

interface BalanceContentProps {
  title: string;
  amount: number;
  type?: "expense" | "income";
  className?: string;
}

const BalanceContent: React.FC<BalanceContentProps> = ({
  title,
  amount,
  type,
  className,
}) => {
  const amountClasses = [styles.amount];
  if (type === "income") {
    amountClasses.push(styles["amount--positive"]);
  } else if (type === "expense") {
    amountClasses.push(styles["amount--negative"]);
  }

  return (
    <ContentBase className={className}>
      <div className={styles.balanceContentWp}>
        <p className={styles.title}>{title}</p>
        <p className={amountClasses.join(" ")}>{formatCurrency(amount)}</p>
      </div>
    </ContentBase>
  );
};

export default BalanceContent;
