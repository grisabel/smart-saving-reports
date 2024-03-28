import React, { useState, useEffect } from "react";
import styles from "./GraphicCard.module.scss";

import CardBase from "@/components/stories/atoms/card/CardBase";
import Icon from "@/components/stories/atoms/Icon";

interface GraphicCardProps {
  amount: number;
  description: string;
  type?: "expense" | "income";
  onClick: () => void;
}

const GraphicCard: React.FC<GraphicCardProps> = ({
  onClick,
  amount,
  type,
  description,
}) => {
  type SmartSavingsIconName = "arrow-up" | "arrow-down" | "";
  const [icon, setIcon] = useState<SmartSavingsIconName>("");
  useEffect(() => {
    setIcon(type === "expense" ? "arrow-down" : "arrow-up");
  }, [type]);

  return (
    <CardBase onClick={onClick}>
      <div className={styles.graphicCardWp}>
        <div className={styles.amount}>
          <p>{amount}€</p>
          <div className={styles.description}>
            <Icon
              name={icon}
              className={`${styles.icon} ${styles[`icon--${type}`]}`}
            />
            <p>{description}</p>
          </div>
        </div>
      </div>
    </CardBase>
  );
};

export default GraphicCard;
