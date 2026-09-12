// TS: `const MOCK_MENU: MenuItem[]`

/**
 * Static fallback rendered when GET /api/menu fails, so the page is never
 * blank in a portfolio demo where the API may not be running.
 * Ids are strings here too, matching what Mongo returns.
 */
const MOCK_MENU = [
  {
    id: 'mock-burger-1',
    name: 'Double Smash Burger',
    description:
      'Two seared beef patties, aged cheddar, caramelised onion and house burger sauce in a toasted brioche bun.',
    price: 11.5,
    category: 'burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    available: true,
  },
  {
    id: 'mock-burger-2',
    name: 'Crispy Chicken Deluxe',
    description: 'Buttermilk-marinated chicken thigh, pickled slaw and chipotle mayo on a soft potato roll.',
    price: 9.9,
    category: 'burger',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    available: true,
  },
  {
    id: 'mock-pizza-1',
    name: 'Margherita Napoletana',
    description: 'San Marzano tomato, fior di latte and fresh basil on a 48-hour cold-fermented base.',
    price: 12.0,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    available: true,
  },
  {
    id: 'mock-pizza-2',
    name: 'Spicy Pepperoni',
    description: 'Double pepperoni, mozzarella, chilli honey drizzle and a charred leopard-spotted crust.',
    price: 14.25,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    available: true,
  },
  {
    id: 'mock-sushi-1',
    name: 'Salmon Avocado Roll',
    description: 'Eight pieces of Norwegian salmon and ripe avocado, rolled with sushi rice and toasted sesame.',
    price: 13.75,
    category: 'sushi',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    available: true,
  },
  {
    id: 'mock-sushi-2',
    name: 'Rainbow Dragon Platter',
    description: 'Sixteen mixed nigiri and maki with tuna, salmon, prawn and eel, served with wasabi and ginger.',
    price: 22.5,
    category: 'sushi',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    available: true,
  },
  {
    id: 'mock-drinks-1',
    name: 'Fresh Mint Lemonade',
    description: 'Hand-pressed lemons, muddled mint and a touch of cane sugar, served over crushed ice.',
    price: 4.2,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
    rating: 4.4,
    available: true,
  },
  {
    id: 'mock-drinks-2',
    name: 'Iced Caramel Latte',
    description: 'Double-shot espresso, cold milk and salted caramel over ice, finished with a caramel swirl.',
    price: 5.1,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
    rating: 4.3,
    available: true,
  },
  {
    id: 'mock-dessert-1',
    name: 'Molten Chocolate Lava Cake',
    description: 'Warm dark chocolate fondant with a liquid centre, served with vanilla bean ice cream.',
    price: 7.6,
    category: 'dessert',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    available: true,
  },
  {
    id: 'mock-dessert-2',
    name: 'New York Cheesecake',
    description: 'Dense baked vanilla cheesecake on a buttery biscuit base, topped with macerated berries.',
    price: 6.8,
    category: 'dessert',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    available: true,
  },
];

export default MOCK_MENU;
