import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Menu from './components/Menu/Menu';
import HowItWorks from './components/HowItWorks/HowItWorks';
import Testimonials from './components/Testimonials/Testimonials';
import Newsletter from './components/Footer/Newsletter';
import Footer from './components/Footer/Footer';
import CartSidebar from './components/Cart/CartSidebar';

/**
 * The single page, in section order. The cart drawer sits outside the flow
 * because it overlays everything.
 *
 * TS: this component takes no props — no interface needed.
 */
const App = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <Menu />
      <HowItWorks />
      <Testimonials />
      <Newsletter />
    </main>
    <Footer />
    <CartSidebar />
  </>
);

export default App;
