import React, { useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faTiktok, faXTwitter } from '@fortawesome/free-brands-svg-icons';

import pizza from '../../imgs/🍕.png';
import Astore from '../../imgs/appStore.png';
import GPlay from '../../imgs/GPlay.png';
import Download from '../shared/Download';
import FooterLinkList from './FooterLinkList';
import { LEGAL_LINKS } from './footerLinks';
import { NAV_LINKS, SECTION_IDS } from '../../constants/config';
import styles from './Footer.module.scss';

// TS: `Array<{ label: string; href: string; icon: IconDefinition }>`
const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com', icon: faInstagram },
  { label: 'X (Twitter)', href: 'https://x.com', icon: faXTwitter },
  { label: 'Facebook', href: 'https://www.facebook.com', icon: faFacebookF },
  { label: 'TikTok', href: 'https://www.tiktok.com', icon: faTiktok },
];

/**
 * Site footer: brand, link columns, store badges and the copyright line.
 *
 * TS: this component takes no props — no interface needed.
 */
const Footer = () => {
  const year = new Date().getFullYear();
  const navLabels = useMemo(() => NAV_LINKS.map((link) => link.label), []);

  // TS: `(label: string) => void`
  const handleQuickLink = useCallback((label) => {
    const target = NAV_LINKS.find((link) => link.label === label);
    document.getElementById(target?.id ?? SECTION_IDS.HERO)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <footer id={SECTION_IDS.CONTACT} className={styles.footer}>
      <div className="container">
        <div className={styles.footer__grid}>
          <div className={styles.brand}>
            <span className={styles.brand__logo}>
              <img className={styles.brand__image} src={pizza} alt="Pizza logo" />
              <span className={styles.brand__name}>Pizza</span>
            </span>
            <p className={styles.brand__tagline}>
              Your favorite food delivery partner — straight out of the oven to your doorstep.
            </p>
            <ul className={styles.social}>
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <li key={label}>
                  <a className={styles.social__link} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                    <FontAwesomeIcon icon={icon} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <div className={styles.brand__stores}>
              <Download tone="dark" logo={Astore} alt="App Store logo" top="Download on the" down="App Store" />
              <Download tone="dark" logo={GPlay} alt="Google Play logo" top="GET IT ON" down="Google Play" />
            </div>
          </div>

          <FooterLinkList title="Quick links" items={navLabels} onSelect={handleQuickLink} />

          <div>
            <h3 className={styles.contact__title}>Contact</h3>
            <ul className={styles.contact}>
              <li>
                <FontAwesomeIcon icon={faEnvelope} className={styles.contact__icon} aria-hidden="true" />
                <a className={styles.contact__link} href="mailto:hello@pizza.example">
                  hello@pizza.example
                </a>
              </li>
              <li>
                <FontAwesomeIcon icon={faPhone} className={styles.contact__icon} aria-hidden="true" />
                <a className={styles.contact__link} href="tel:+15551234567">
                  +1 555 123 4567
                </a>
              </li>
              <li>
                <FontAwesomeIcon icon={faClock} className={styles.contact__icon} aria-hidden="true" />
                <span>Support 24/7</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.bottom__copyright}>&copy; {year} Pizza. All rights reserved.</p>
          <ul className={styles.bottom__legal}>
            {LEGAL_LINKS.map((link) => (
              <li key={link}>{link}</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
