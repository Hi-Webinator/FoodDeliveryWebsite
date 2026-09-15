import React, { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { formatPrice } from "../../utils/formatPrice";
import { decodeEntities } from "../../utils/sanitize";
import { QUANTITY_MAX } from "../../constants/config";

type ItemProps = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartItemProps = {
  item: ItemProps;
  onQuantityChange: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
};

const CartItem = ({ item, onQuantityChange, onRemove }: CartItemProps) => {
  const { id, name, price, image, quantity } = item;

  const decrease: () => void = useCallback(
    () => onQuantityChange(id, quantity - 1),
    [id, quantity, onQuantityChange],
  );

  const increase: () => void = useCallback(
    () => onQuantityChange(id, quantity + 1),
    [id, quantity, onQuantityChange],
  );

  const handleRemove: () => void = useCallback(
    () => onRemove(id),
    [id, onRemove],
  );

  const safeName: string = decodeEntities(name);

  return (
    <div className="item">
      <img className="item__image" src={image} alt={safeName} loading="lazy" />

      <div className="item__body">
        <div className="item__header">
          <div className="item__info">
            <p className="item__name">{safeName}</p>
            <span className="item__price">{formatPrice(price)} each</span>
          </div>

          <button
            type="button"
            className="item__remove"
            onClick={handleRemove}
            aria-label={`Remove ${safeName} from cart`}
          >
            <FontAwesomeIcon icon={faTrashCan} aria-hidden="true" />
          </button>
        </div>

        <div className="item__controls">
          <div className="stepper">
            <button
              type="button"
              className="stepper__button"
              onClick={decrease}
              aria-label={`Decrease quantity of ${safeName}`}
            >
              <FontAwesomeIcon icon={faMinus} aria-hidden="true" />
            </button>
            <span className="stepper__value" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              className="stepper__button"
              onClick={increase}
              // The API rejects anything above 99, so stop the user here first.
              disabled={quantity >= QUANTITY_MAX}
              aria-label={`Increase quantity of ${safeName}`}
            >
              <FontAwesomeIcon icon={faPlus} aria-hidden="true" />
            </button>
          </div>

          <span className="item__subtotal">
            {formatPrice(price * quantity)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CartItem);
