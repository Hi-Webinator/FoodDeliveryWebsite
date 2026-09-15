import React, { useCallback, useMemo } from 'react';

import SectionHeading from '../shared/SectionHeading';
import CategoryShowcase from './CategoryShowcase';
import MenuFilters from './MenuFilters';
import MenuGrid from './MenuGrid';
import MenuState from './MenuState';
import MenuCardSkeleton from '../MenuCard/MenuCardSkeleton';
import { useMenu } from '../../hooks/useMenu';
import { useCart } from '../../hooks/useCart';
import { ALL_CATEGORIES } from '../../constants/categories';
import { MESSAGES, SECTION_IDS } from '../../constants/config';
import styles from './Menu.module.scss';

const SKELETON_COUNT = 6;

/**
 * The menu section: category showcase, filter chips and the dish grid.
 * All data lives in useMenu; all cart writes go through useCart.
 *
 * TS: this component takes no props — no interface needed.
 */
const Menu = () => {
  const { items, isLoading, error, isFallback, category, setCategory, refetch } = useMenu();
  const { items: cartItems, add, open } = useCart();

  /** id -> quantity, built once per cart change so each card is O(1) to look up. */
  // TS: `Record<string, number>`
  const quantities = useMemo(
    () => Object.fromEntries(cartItems.map((item) => [item.id, item.quantity])),
    [cartItems],
  );

  const handleAdd = useCallback(
    (item) => {
      add(item);
      open();
    },
    [add, open],
  );

  const renderBody = () => {
    if (isLoading) {
      return (
        <div className={styles.grid} aria-busy="true" aria-label="Loading menu">
          {Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <MenuCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    // A hard failure with no fallback data is the only true error state.
    if (error && items.length === 0) {
      return (
        <MenuState
          icon="⚠️"
          title="We could not load the menu"
          text={error}
          actionLabel="Try again"
          onAction={refetch}
        />
      );
    }

    if (items.length === 0) {
      return (
        <MenuState
          icon="🍽️"
          title={category === ALL_CATEGORIES ? MESSAGES.MENU_EMPTY : MESSAGES.MENU_EMPTY_FILTERED}
          text={
            category === ALL_CATEGORIES
              ? ''
              : 'Pick a different category to see what else is cooking.'
          }
          actionLabel={category === ALL_CATEGORIES ? '' : 'Show everything'}
          onAction={category === ALL_CATEGORIES ? undefined : () => setCategory(ALL_CATEGORIES)}
        />
      );
    }

    return <MenuGrid items={items} quantities={quantities} onAdd={handleAdd} />;
  };

  return (
    <section id={SECTION_IDS.MENU} className={styles.menu}>
      <div className="container">
        <SectionHeading
          eyebrow="Our menu"
          title="more than"
          highlight="10,000"
          trailing="dishes to order!"
          subtitle="Welcome to The Biggest Network of Food Ordering & Delivery"
        />

        <CategoryShowcase />

        {/* Fallback data is a degraded state, not a failure — say so quietly. */}
        {isFallback ? <p className={styles.notice}>{MESSAGES.MENU_ERROR}</p> : null}

        <MenuFilters active={category} onChange={setCategory} />

        {renderBody()}
      </div>
    </section>
  );
};

export default Menu;
