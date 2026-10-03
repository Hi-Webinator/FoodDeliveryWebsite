import React from "react";

import MenuCard from "../MenuCard/MenuCard";
import type { MenuItem } from "../../store/types";

interface MenuGridProps {
  items: MenuItem[];
  /** Cart quantity per menu-item id. */
  quantities: Record<string, number>;
  onAdd: (item: MenuItem) => void;
}

/**
 * Responsive grid of dishes: one column on phones, two on tablets, three up.
 */
const MenuGrid = ({ items, quantities, onAdd }: MenuGridProps) => (
  <div className="grid">
    {items.map((item) => (
      <div key={item.id} className="grid__cell">
        <MenuCard
          item={item}
          quantity={quantities[item.id] ?? 0}
          onAdd={onAdd}
        />
      </div>
    ))}
  </div>
);

export default React.memo(MenuGrid);
