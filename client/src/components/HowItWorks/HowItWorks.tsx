import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBowlFood,
  faLocationDot,
  faMotorcycle,
} from "@fortawesome/free-solid-svg-icons";

import SectionHeading from "../shared/SectionHeading";
import { SECTION_IDS } from "../../constants/config";

/**
 * The three steps between opening the page and eating.
 */
const STEPS = [
  {
    id: "choose",
    number: "01",
    icon: faLocationDot,
    text: "Choose your location",
    description:
      "Drop your address and see every kitchen that delivers to you.",
  },
  {
    id: "order",
    number: "02",
    icon: faBowlFood,
    text: "Order what you crave",
    description: "Browse the menu, filter by category and add dishes in a tap.",
  },
  {
    id: "deliver",
    number: "03",
    icon: faMotorcycle,
    text: "We deliver to your door",
    description: "A rider brings it straight out of the oven to your doorstep.",
  },
];

/**
 * "How it works" — a three-step explainer with numbered icon tiles.
 */
const HowItWorks = () => (
  <section id={SECTION_IDS.HOW_IT_WORKS} className="section">
    <div className="container">
      <SectionHeading
        eyebrow="How it works"
        title="how to"
        highlight="order"
        trailing="?"
        subtitle="Three steps between an empty stomach and a full table."
      />

      <ol className="steps">
        {STEPS.map(({ id, number, icon, text, description }) => (
          <li key={id} className="step">
            <div className="step__iconWrap">
              <FontAwesomeIcon
                icon={icon}
                className="step__icon"
                aria-hidden="true"
              />
              <span className="step__number">{number}</span>
            </div>
            <h3 className="step__title">{text}</h3>
            <p className="step__text">{description}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default HowItWorks;
