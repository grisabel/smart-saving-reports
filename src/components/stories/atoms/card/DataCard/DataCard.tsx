import React from "react";
import styles from "./DataCard.module.scss";

export interface DataCardProps {
  date: string;
  comment: string;
  amount: number;
  className?: string;
  key?: string;
  type?: "expense" | "income";
}

const DataCard: React.FC<DataCardProps> = ({
  date,
  comment,
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
    <div className={`${styles.dataCardWp} ${className}`}>
      <div className={styles.data}>
        <p>{date}</p>
        <p className={styles.comment}>{comment}</p>
      </div>
      <p className={amountClasses.join(" ")}>{amount}€</p>
    </div>
  );
};

export default DataCard;
