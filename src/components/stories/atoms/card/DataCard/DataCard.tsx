import React from "react";
import styles from "./DataCard.module.scss";

interface DataCardProps {
  date: string;
  comment: string;
  amount: string;
  type?: "expense" | "income";
}

const DataCard: React.FC<DataCardProps> = ({ date, comment, amount, type }) => {
  const amountClasses = [styles.amount];
  if (type === "income") {
    amountClasses.push(styles["amount--positive"]);
  } else if (type === "expense") {
    amountClasses.push(styles["amount--negative"]);
  }
  return (
    <div className={styles.dataCardWp}>
      <div>
        <p>{date}</p>
        <p className={styles.comment}>{comment}</p>
      </div>
      <p className={amountClasses.join(" ")}>{amount}€</p>
    </div>
  );
};

export default DataCard;
