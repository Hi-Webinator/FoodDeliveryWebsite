import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBolt,
  faFire,
  faLocationDot,
  faMotorcycle,
} from "@fortawesome/free-solid-svg-icons";

import Download from "../shared/Download";
import Btn from "../shared/Btn";
import Astore from "../../imgs/appStore.png";
import GPlay from "../../imgs/GPlay.png";
import livreur from "../../imgs/livreur.png";
import pizza from "../../imgs/🍕.png";
import burger from "../../imgs/🍔.png";
import { SECTION_IDS } from "../../constants/config";
import "./_hero.scss";

/**
 * Landing section: headline, delivery-location input and the primary CTA.
 *
 * TS: this component takes no props — no interface needed.
 */
const Hero = () => {
  const scrollToMenu = useCallback(() => {
    document
      .getElementById(SECTION_IDS.MENU)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section id={SECTION_IDS.HERO} className="hero">
      <div className="hero__backdrop" aria-hidden="true" />

      <div className={`container hero__inner`}>
        <div className="hero__content">
          <span className="hero__eyebrow">
            <FontAwesomeIcon icon={faBolt} aria-hidden="true" /> Deals &amp;
            free delivery
          </span>

          <h1 className="hero__title">
            Your Favorite Food{" "}
            <span className="hero__highlight">Delivery Partner</span>
          </h1>
          <p className="hero__subtitle">
            The food at your doorstep. Why starve when you have us. You hunger
            partner. Straight out of the oven to your doorstep.
          </p>

          <div className="search">
            <FontAwesomeIcon
              icon={faLocationDot}
              className="search__icon"
              aria-hidden="true"
            />
            <label className="search__label" htmlFor="delivery-location">
              Delivery location
            </label>
            <input
              id="delivery-location"
              type="text"
              className="search__input"
              placeholder="Enter your delivery location"
            />
            <Btn text="order now" icon={faArrowRight} onClick={scrollToMenu} />
          </div>

          <div className="hero__stores">
            <Download
              logo={Astore}
              alt="App Store logo"
              top="Download on the"
              down="App Store"
            />
            <Download
              logo={GPlay}
              alt="Google Play logo"
              top="GET IT ON"
              down="Google Play"
            />
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__blob" aria-hidden="true" />
          <img className="hero__image" src={livreur} alt="Delivery rider" />

          {/* Decorative floating badges reuse copy from the headline. */}
          <div className={"float float-top"} aria-hidden="true">
            <img className="float__thumb" src={pizza} alt="" />
            <span className="float__text">
              <strong>Hot &amp; fresh</strong>
              <span>
                <FontAwesomeIcon icon={faFire} /> Straight out of the oven
              </span>
            </span>
          </div>
          <div className="float float-bottom" aria-hidden="true">
            <img className="float__thumb" src={burger} alt="" />
            <span className="float__text">
              <strong>On its way</strong>
              <span>
                <FontAwesomeIcon icon={faMotorcycle} /> To your doorstep
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
