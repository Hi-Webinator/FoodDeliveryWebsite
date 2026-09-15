import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import Btn from '../shared/Btn';
import styles from './Newsletter.module.scss';

/**
 * Newsletter sign-up band above the footer.
 * Presentational only — there is no subscribe endpoint in this MVP.
 *
 * TS: this component takes no props — no interface needed.
 */
const Newsletter = () => (
  <div className={styles.newsletter}>
    <div className="container">
      <div className={styles.panel}>
        <div className={styles.panel__copy}>
          <h2 className={styles.panel__title}>Subscribe to our newsletter</h2>
          <p className={styles.panel__text}>
            Browse local restaurants and businesses for delivery by entering your address below.
          </p>
        </div>

        <div className={styles.field}>
          <FontAwesomeIcon icon={faEnvelope} className={styles.field__icon} aria-hidden="true" />
          <label className={styles.field__label} htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            className={styles.field__input}
            placeholder="Enter your email address..."
          />
          <Btn text="send" variant="dark" />
        </div>
      </div>
    </div>
  </div>
);

export default Newsletter;
