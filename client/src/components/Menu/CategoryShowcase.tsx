import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

import Box from '../shared/Box';
import motor from '../../imgs/motor.png';
import pizza from '../../imgs/🍕.png';
import burger from '../../imgs/🍔.png';
import sushi from '../../imgs/🍣.png';
import pasta from '../../imgs/🍝.png';
import desserts from '../../imgs/🍰.png';
import salad from '../../imgs/🥗.png';
import styles from './CategoryShowcase.module.scss';

/**
 * The decorative category collage from the original homepage. Purely visual —
 * the interactive filtering lives in MenuFilters.
 *
 * TS: this component takes no props — no interface needed.
 */
const CategoryShowcase = () => (
  <div className={styles.showcase}>
    <div className={styles.showcase__row}>
      <div className={styles.showcase__tiles}>
        <Box logo={pizza} size="50%" text="Pizza" />
        <Box logo={burger} size="50%" text="Burger" />
        <Box logo={sushi} size="50%" text="Sushi" />
      </div>
      <div className={styles.promo}>
        <h3 className={styles.promo__text}>
          Find <span className={styles.promo__deal}>deals</span>,{' '}
          <span className={styles.promo__free}>free delivery</span>, and more from our restaurant
          partners.
        </h3>
        <img className={styles.promo__image} src={motor} alt="Delivery scooter" />
      </div>
    </div>

    <div className={`${styles.showcase__row} ${styles['showcase__row--reverse']}`}>
      <figure className={styles.quote}>
        <FontAwesomeIcon icon={faQuoteLeft} className={styles.quote__icon} aria-hidden="true" />
        <q className={styles.quote__text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid ut
          labore et dolore magna aliqua.
        </q>
      </figure>
      <div className={styles.showcase__tiles}>
        <Box logo={pasta} size="50%" text="Pasta" />
        <Box logo={salad} size="50%" text="Salad" />
        <Box logo={desserts} size="50%" text="Desserts" />
      </div>
    </div>
  </div>
);

export default CategoryShowcase;
