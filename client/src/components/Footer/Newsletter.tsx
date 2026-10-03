import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import Btn from '../shared/Btn';

/**
 * Newsletter sign-up band above the footer.
 * Presentational only — there is no subscribe endpoint in this MVP.
 */
const Newsletter = () => (
  <div className="newsletter">
    <div className="container">
      <div className="panel">
        <div className="panel__copy">
          <h2 className="panel__title">Subscribe to our newsletter</h2>
          <p className="panel__text">
            Browse local restaurants and businesses for delivery by entering your address below.
          </p>
        </div>

        <div className="field">
          <FontAwesomeIcon icon={faEnvelope} className="field__icon" aria-hidden="true" />
          <label className="field__label" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            className="field__input"
            placeholder="Enter your email address..."
          />
          <Btn text="send" variant="dark" />
        </div>
      </div>
    </div>
  </div>
);

export default Newsletter;
