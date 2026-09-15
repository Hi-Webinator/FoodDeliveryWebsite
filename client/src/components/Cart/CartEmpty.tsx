import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faBagShopping } from "@fortawesome/free-solid-svg-icons";

interface CartEmptyProps {
  message: string;
  onBrowse: () => void;
}

const CartEmpty = ({ message, onBrowse }: CartEmptyProps) => (
  <div className="empty">
    <span className="empty__illustration" aria-hidden="true">
      <FontAwesomeIcon icon={faBagShopping} />
    </span>
    <p className="empty__title">Nothing here yet</p>
    <p className="empty__text">{message}</p>
    <button type="button" className="empty__action" onClick={onBrowse}>
      Browse the menu
      <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
    </button>
  </div>
);

export default CartEmpty;
