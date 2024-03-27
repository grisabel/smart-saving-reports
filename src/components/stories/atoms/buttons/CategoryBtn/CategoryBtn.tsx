import React, { useState, useEffect } from "react";
import Icon from "@/components/stories/atoms/Icon";
import styles from "./CategoryBtn.module.scss";
import { SmartSavingsIconName } from "../../Icon/SmartSavingsIcon";

interface CategoryBtnProps {
  iconName: string;
  readOnly?: boolean;
  onClick: (data: { icon: string; background: string }) => void;
}

const CategoryBtn: React.FC<CategoryBtnProps> = ({
  iconName,
  readOnly,
  onClick,
}) => {
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  useEffect(() => {
    if (!iconName) return;
    setBackgroundColor(generateContrastingColor(iconName));
  }, [iconName]);

  const generateContrastingColor = (iconName: string) => {
    const iconHash = Array.from(iconName).reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    );
    const highValue = Math.floor(iconHash % (256 - 129)) + 129;

    const midValueBase = Math.floor(iconHash % 256);
    const lowValueBase = Math.floor(iconHash % 128);

    const midValue = midValueBase;
    const lowValue = lowValueBase;

    let [r, g, b] = [midValue, midValue, midValue];
    const highComponent = iconName.length % 3;
    switch (highComponent) {
      case 0:
        r = highValue;
        g = iconName.length % 2 === 0 ? lowValue : midValue;
        b = g === midValue ? lowValue : midValue;
        break;
      case 1:
        g = highValue;
        r = iconName.length % 2 === 0 ? lowValue : midValue;
        b = r === midValue ? lowValue : midValue;
        break;
      case 2:
        b = highValue;
        r = iconName.length % 2 === 0 ? lowValue : midValue;
        g = r === midValue ? lowValue : midValue;
        break;
    }

    const toHex = (c: number) => c.toString(16).padStart(2, "0");
    return "#" + toHex(r) + toHex(g) + toHex(b);
  };

  const handleClick = () => {
    if (readOnly) return;
    onClick({
      icon: iconName,
      background: backgroundColor,
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{ background: backgroundColor }}
      className={`${styles.categoryBtn} ${readOnly ? styles.readOnly : ""}`}
    >
      <Icon
        name={iconName as SmartSavingsIconName}
        className={`${styles.icon} ${styles[iconName] || ""}`}
      />
    </button>
  );
};

export default CategoryBtn;
