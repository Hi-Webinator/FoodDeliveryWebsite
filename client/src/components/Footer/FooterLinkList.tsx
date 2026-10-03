import React from 'react';


interface FooterLinkListProps {
  /** Column heading. */
  title: string;
  /** Link labels, rendered in order. */
  items: string[];
  /** Makes each item a button and receives its label on click. */
  onSelect?: (item: string) => void;
}

/**
 * One titled column of footer links.
 */
const FooterLinkList = ({ title, items, onSelect = undefined }: FooterLinkListProps) => (
  <nav className="column" aria-label={title}>
    <h3 className="column__title">{title}</h3>
    <ul className="column__list">
      {items.map((item) => (
        // Labels are unique within a column, so they are stable keys here.
        <li key={item}>
          {onSelect ? (
            <button type="button" className="column__link" onClick={() => onSelect(item)}>
              {item}
            </button>
          ) : (
            <span className="column__text">{item}</span>
          )}
        </li>
      ))}
    </ul>
  </nav>
);

export default React.memo(FooterLinkList);
