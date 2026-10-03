import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import SectionHeading from '../shared/SectionHeading';
import TestimonialCard from './TestimonialCard';
import TESTIMONIALS from './testimonialsData';
import { SECTION_IDS } from '../../constants/config';

import 'swiper/css';

// Slides per view at Bootstrap's md / lg breakpoints.
const SWIPER_BREAKPOINTS = {
  768: { slidesPerView: 2, spaceBetween: 24 },
  992: { slidesPerView: 3, spaceBetween: 32 },
};

/**
 * Customer reviews carousel.
 */
const Testimonials = () => {
  // Callback refs held in state so Swiper re-binds once the buttons mount.
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  return (
    <section id={SECTION_IDS.TESTIMONIALS} className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Reviews"
          title="our clients"
          highlight="feedback"
          subtitle="The food at your doorstep. Why starve when you have us. You hunger partner. Straight out of the oven to your doorstep."
        />

        <Swiper
          modules={[Navigation]}
          navigation={{ prevEl, nextEl }}
          slidesPerView={1}
          spaceBetween={16}
          breakpoints={SWIPER_BREAKPOINTS}
          className="slider"
        >
          {TESTIMONIALS.map(({ id, quote, author, role }) => (
            <SwiperSlide key={id} className="slide">
              <TestimonialCard quote={quote} author={author} role={role} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="controls">
          <button
            ref={setPrevEl}
            type="button"
            className="controls__button"
            aria-label="Previous review"
          >
            <FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" />
          </button>
          <button
            ref={setNextEl}
            type="button"
            className="controls__button"
            aria-label="Next review"
          >
            <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
