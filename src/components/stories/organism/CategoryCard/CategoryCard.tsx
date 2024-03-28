import React from "react";
import CategoryBtn from "@/components/stories/atoms/buttons/CategoryBtn";
import styles from "./CategoryCard.module.scss";
import { SmartSavingsIconName } from "../../atoms/Icon/SmartSavingsIcon";

export interface CategoryCardProps {
  amount?: number;
  category?: SmartSavingsIconName;
  categoryName?: string;
  type?: "expense" | "income";
  className?: string;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  onClick = () => null,
  amount,
  type,
  categoryName,
  category,
  className,
}) => {
  return (
    <div className={`${styles.itemCategoryWp} ${className}`}>
      <CategoryBtn
        iconName={category as SmartSavingsIconName}
        readOnly={true}
        onClick={onClick}
      />

      <div className={styles.data}>
        <p className={styles.category}>{categoryName}</p>
        <p className={`${styles.amount} ${styles[`amount--${type}`]}`}>
          {amount}€
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
