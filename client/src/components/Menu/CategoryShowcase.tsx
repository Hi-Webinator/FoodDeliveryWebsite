import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

import Box from "../shared/Box";
import motor from "../../assets/imgs/motor.png";
import pizza from "../../assets/icons/🍕.png";
import burger from "../../assets/icons/🍔.png";
import sushi from "../../assets/icons/🍣.png";
import pasta from "../../assets/icons/🍝.png";
import desserts from "../../assets/icons/🍰.png";
import salad from "../../assets/icons/🥗.png";

/**
 * The decorative category collage from the original homepage. Purely visual —
 * the interactive filtering lives in MenuFilters.
 */
const CategoryShowcase = () => (
  <div className="showcase">
    <div className="showcase__row">
      <div className="showcase__tiles">
        <Box logo={pizza} size="50%" text="Pizza" />
        <Box logo={burger} size="50%" text="Burger" />
        <Box logo={sushi} size="50%" text="Sushi" />
      </div>
      <div className="promo">
        <h3 className="promo__text">
          Find <span className="promo__deal">deals</span>,{" "}
          <span className="promo__free">free delivery</span>, and more from our
          restaurant partners.
        </h3>
        <img className="promo__image" src={motor} alt="Delivery scooter" />
      </div>
    </div>

    <div className="showcase__row showcase__row--reverse">
      <figure className="quote">
        <FontAwesomeIcon
          icon={faQuoteLeft}
          className="quote__icon"
          aria-hidden="true"
        />
        <q className="quote__text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incidid ut labore et dolore magna aliqua.
        </q>
      </figure>
      <div className="showcase__tiles">
        <Box logo={pasta} size="50%" text="Pasta" />
        <Box logo={salad} size="50%" text="Salad" />
        <Box logo={desserts} size="50%" text="Desserts" />
      </div>
    </div>
  </div>
);

export default CategoryShowcase;
