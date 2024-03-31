import React, { useState, useEffect } from "react";
import styles from "./GraphicCard.module.scss";

import CardBase from "@/components/stories/atoms/card/CardBase";
import Icon from "@/components/stories/atoms/Icon";
import { formatCurrency } from "@/utils/Currency";

export interface GraphicCardProps {
  amount?: number;
  description?: string;
  type?: "expense" | "income";
  children?: React.ReactNode;
  onClick?: () => void;
}

const GraphicCard: React.FC<GraphicCardProps> = ({
  onClick = () => null,
  amount = 0,
  type,
  description,
  children,
}) => {
  type SmartSavingsIconName = "arrow-up" | "arrow-down" | "";
  const [icon, setIcon] = useState<SmartSavingsIconName>("");
  useEffect(() => {
    setIcon(type === "expense" ? "arrow-down" : "arrow-up");
  }, [type]);

  return (
    <CardBase onClick={onClick}>
      <div className={styles.graphicCardWp}>
        <div className={styles.data}>
          <p className={styles.amount}>{formatCurrency(amount)}</p>
          <div className={styles.description}>
            <Icon
              name={icon}
              className={`${styles.icon} ${styles[`icon--${type}`]}`}
            />
            <p>{description}</p>
          </div>
        </div>
        {children}
      </div>
    </CardBase>
  );
};

export default GraphicCard;
