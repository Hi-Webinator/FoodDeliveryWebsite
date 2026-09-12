// TS: `interface Testimonial { id: string; quote: string; author: string; role: string }`

/** Three static reviews. Static by design — there is no reviews endpoint. */
const TESTIMONIALS = [
  {
    id: 'review-1',
    quote:
      'Ordered a full sushi platter twenty minutes before guests arrived and it still turned up warm, sealed and exactly as pictured. The tracking was accurate to the minute.',
    author: 'Until Death',
    role: 'Front-end developer',
  },
  {
    id: 'review-2',
    quote:
      'The smash burger is the closest thing to a proper diner patty I have found that actually survives delivery. Ordering takes about four taps, which is the real win.',
    author: 'Amine K.',
    role: 'Full-stack developer',
  },
  {
    id: 'review-3',
    quote:
      'I use it for the office lunch run every Friday. Split orders, one address, no arguments, and the lava cake has become a standing request from the whole team.',
    author: 'Adriano M.',
    role: 'Engineer',
  },
];

export default TESTIMONIALS;
