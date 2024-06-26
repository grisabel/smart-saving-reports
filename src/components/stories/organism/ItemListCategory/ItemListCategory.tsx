import React from "react";
import ItemCategory from "@/components/stories/organism/ItemCategory";
import styles from "./ItemListCategory.module.scss";
import { SmartSavingsIconName } from "../../atoms/Icon/SmartSavingsIcon";

export interface ItemProps {
  amount: number;
  category: SmartSavingsIconName | undefined;
  categoryName: string;
  type: "expense" | "income";
  onClick: () => void;
}

export interface ItemListProps {
  items: ItemProps[];
}

const ItemListCategory: React.FC<ItemListProps> = ({ items }) => {
  return (
    <div className={styles.itemList}>
      {items.map((item, index) => (
        <ItemCategory
          key={index}
          amount={item.amount}
          category={item.category ?? ""}
          categoryName={item.categoryName}
          type={item.type}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
};

export default ItemListCategory;
