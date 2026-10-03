import { useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faTiktok, faXTwitter } from '@fortawesome/free-brands-svg-icons';

import pizza from '../../assets/icons/🍕.png';
import Astore from '../../assets/icons/appStore.png';
import GPlay from '../../assets/icons/GPlay.png';
import Download from '../shared/Download';
import FooterLinkList from './FooterLinkList';
import { LEGAL_LINKS } from './footerLinks';
import { NAV_LINKS, SECTION_IDS } from '../../constants/config';

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com', icon: faInstagram },
  { label: 'X (Twitter)', href: 'https://x.com', icon: faXTwitter },
  { label: 'Facebook', href: 'https://www.facebook.com', icon: faFacebookF },
  { label: 'TikTok', href: 'https://www.tiktok.com', icon: faTiktok },
];

/**
 * Site footer: brand, link columns, store badges and the copyright line.
 */
const Footer = () => {
  const year = new Date().getFullYear();
  const navLabels = useMemo(() => NAV_LINKS.map((link) => link.label), []);

  const handleQuickLink = useCallback((label: string) => {
    const target = NAV_LINKS.find((link) => link.label === label);
    document.getElementById(target?.id ?? SECTION_IDS.HERO)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <footer id={SECTION_IDS.CONTACT} className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="brand">
            <span className="brand__logo">
              <img className="brand__image" src={pizza} alt="Pizza logo" />
              <span className="brand__name">Pizza</span>
            </span>
            <p className="brand__tagline">
              Your favorite food delivery partner — straight out of the oven to your doorstep.
            </p>
            <ul className="social">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <li key={label}>
                  <a className="social__link" href={href} target="_blank" rel="noreferrer" aria-label={label}>
                    <FontAwesomeIcon icon={icon} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="brand__stores">
              <Download tone="dark" logo={Astore} alt="App Store logo" top="Download on the" down="App Store" />
              <Download tone="dark" logo={GPlay} alt="Google Play logo" top="GET IT ON" down="Google Play" />
            </div>
          </div>

          <FooterLinkList title="Quick links" items={navLabels} onSelect={handleQuickLink} />

          <div>
            <h3 className="contact__title">Contact</h3>
            <ul className="contact">
              <li>
                <FontAwesomeIcon icon={faEnvelope} className="contact__icon" aria-hidden="true" />
                <a className="contact__link" href="mailto:hello@pizza.example">
                  hello@pizza.example
                </a>
              </li>
              <li>
                <FontAwesomeIcon icon={faPhone} className="contact__icon" aria-hidden="true" />
                <a className="contact__link" href="tel:+15551234567">
                  +1 555 123 4567
                </a>
              </li>
              <li>
                <FontAwesomeIcon icon={faClock} className="contact__icon" aria-hidden="true" />
                <span>Support 24/7</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bottom">
          <p className="bottom__copyright">&copy; {year} Pizza. All rights reserved.</p>
          <ul className="bottom__legal">
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
