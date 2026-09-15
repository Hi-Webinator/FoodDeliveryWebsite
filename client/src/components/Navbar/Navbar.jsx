import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import logo from '../../imgs/🍕.png';
import Btn from '../shared/Btn';
import NavLinks from './NavLinks';
import CartButton from './CartButton';
import { useActiveSection } from './useActiveSection';
import { useCart } from '../../hooks/useCart';
import { NAV_LINKS, SECTION_IDS } from '../../constants/config';
import styles from './Navbar.module.scss';

const COLLAPSE_ID = 'primaryNavigation';
const SCROLL_THRESHOLD = 8;

/**
 * Sticky top navigation: logo, smooth-scroll links, and the cart badge.
 *
 * TS: this component takes no props — no interface needed.
 */
const Navbar = () => {
  const { totalQuantity, open } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const sectionIds = useMemo(() => NAV_LINKS.map((link) => link.id), []);
  const activeId = useActiveSection(sectionIds);

  // Frosted glass turns into a raised bar once the page leaves the top.
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /** Scrolls to a section and collapses the mobile menu behind it. */
  // TS: `(sectionId: string) => void`
  const handleNavigate = useCallback((sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    setIsMenuOpen(false);
  }, []);

  const handleOrderNow = useCallback(
    () => handleNavigate(SECTION_IDS.MENU),
    [handleNavigate],
  );

  const toggleMenu = useCallback(() => setIsMenuOpen((isOpen) => !isOpen), []);

  return (
    <nav
      className={`${styles.navbar} ${isScrolled ? styles['navbar--scrolled'] : ''}`}
      aria-label="Primary"
    >
      <div className={`container ${styles.navbar__inner}`}>
        <button
          type="button"
          className={styles.navbar__brand}
          onClick={() => handleNavigate(SECTION_IDS.HERO)}
          aria-label="Back to top"
        >
          <img className={styles.navbar__logo} src={logo} alt="Pizza logo" />
          <span className={styles.navbar__wordmark} aria-hidden="true">
            Pizza
          </span>
        </button>

        <div
          id={COLLAPSE_ID}
          className={`${styles.navbar__menu} ${isMenuOpen ? styles['navbar__menu--open'] : ''}`}
        >
          <NavLinks links={NAV_LINKS} activeId={activeId} onNavigate={handleNavigate} />
          <Btn
            text="order now"
            size="sm"
            icon={faArrowRight}
            onClick={handleOrderNow}
            className={styles.navbar__cta}
          />
        </div>

        <div className={styles.navbar__tools}>
          <CartButton count={totalQuantity} onClick={open} />

          <button
            className={`${styles.toggler} ${isMenuOpen ? styles['toggler--open'] : ''}`}
            type="button"
            onClick={toggleMenu}
            aria-controls={COLLAPSE_ID}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className={styles.toggler__bar} />
            <span className={styles.toggler__bar} />
            <span className={styles.toggler__bar} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
