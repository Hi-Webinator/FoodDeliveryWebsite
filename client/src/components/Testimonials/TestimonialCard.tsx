import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";

const MAX_RATING = 5;

/** "Amine K." -> "AK" — the avatar placeholder. */
const initialsOf = (name: string): string =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

interface TestimonialCardProps {
  quote: string;
  author: string;
  /** Job title shown beneath the name. */
  role: string;
  /** Whole stars out of 5. */
  rating?: number;
}

const TestimonialCard = ({
  quote,
  author,
  role,
  rating = MAX_RATING,
}: TestimonialCardProps) => (
  <figure className="card">
    <div className="card__top">
      <div
        className="stars"
        role="img"
        aria-label={`Rated ${rating} out of ${MAX_RATING}`}
      >
        {Array.from({ length: MAX_RATING }, (_, index) => (
          <FontAwesomeIcon
            key={index}
            icon={index < rating ? faStar : faStarEmpty}
            className={index < rating ? "stars__filled" : " stars__empty"}
            aria-hidden="true"
          />
        ))}
      </div>
      <FontAwesomeIcon
        icon={faQuoteLeft}
        className="card__quoteIcon"
        aria-hidden="true"
      />
    </div>

    <blockquote className="card__quote">{quote}</blockquote>

    <figcaption className="author">
      <span className="author__avatar" aria-hidden="true">
        {initialsOf(author)}
      </span>
      <span className="author__meta">
        <span className="author__name">{author}</span>
        <span className="author__role">{role}</span>
      </span>
    </figcaption>
  </figure>
);

export default React.memo(TestimonialCard);
