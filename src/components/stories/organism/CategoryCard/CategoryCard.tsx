import React from "react";
import CategoryBtn from "@/components/stories/atoms/buttons/CategoryBtn";
import styles from "./CategoryCard.module.scss";

export interface CategoryCardProps {
  amount: number;
  category: string;
  categoryName: string;
  type?: "expense" | "income";
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  onClick,
  amount,
  type,
  categoryName,
  category,
}) => {
  return (
    <div className={styles.itemCategoryWp}>
      <CategoryBtn iconName={category} readOnly={true} onClick={onClick} />

      <div className={styles.data}>
        <p>{categoryName}</p>
        <p className={`${styles.amount} ${styles[`amount--${type}`]}`}>
          {amount}€
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
