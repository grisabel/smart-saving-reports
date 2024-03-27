import React, { useEffect, useState } from "react";
import CategoryBtn from "@/components/stories/atoms/buttons/CategoryBtn";
import CardBase from "@/components/stories/atoms/card/CardBase";
import styles from "./ItemCategory.module.scss";

interface ItemCategoryProps {
  amount: number;
  category: string;
  categoryName: string;
  type?: "expense" | "income";
  onClick: () => void;
}

const ItemCategory: React.FC<ItemCategoryProps> = ({
  onClick,
  amount,
  type,
  categoryName,
  category,
}) => {
  return (
    <CardBase onClick={onClick} className={styles.cardBase}>
      <div className={styles.itemCategoryWp}>
        <CategoryBtn iconName={category} readOnly={true} onClick={onClick} />

        <div className={styles.data}>
          <p>{categoryName}</p>
          <p className={`${styles.amount} ${styles[`amount--${type}`]}`}>
            {amount}€
          </p>
        </div>
      </div>
    </CardBase>
  );
};

export default ItemCategory;
