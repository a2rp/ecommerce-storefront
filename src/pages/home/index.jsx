import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowDownRight, FiArrowRight, FiCheck } from "react-icons/fi";
import ProductCard from "../../components/productCard";
import { categories, products } from "../../data/products";
import styles from "./styles.module.css";

const Home = ({ onAddToCart, onNotify }) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const featured = products.slice(0, 4);

  const subscribe = (event) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      onNotify("Enter a valid email address to join the list.", "error");
      return;
    }
    setSubscribed(true);
    setEmail("");
    onNotify("You are on the Morrow notes list.");
  };

  return (
    <div id="top" className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>MADE SLOWLY · USED EVERY DAY</p>
          <h1>Make room for<br /><em>the everyday.</em></h1>
          <p className={styles.intro}>Small-batch ceramics, warm light, and useful things made to stay in your home for a long while.</p>
          <Link className={styles.primaryLink} to="/shop">Explore the collection <FiArrowRight aria-hidden="true" /></Link>
          <a className={styles.scrollLink} href="#new-arrivals"><FiArrowDownRight aria-hidden="true" /> A few good things</a>
        </div>
        <div className={styles.heroImage}>
          <img src={`${import.meta.env.BASE_URL}images/ceramic-collection.jpg`} alt="Handmade ceramic vessels in a quiet, earthy palette" />
          <div className={styles.imageNote}><span>01 / THE HOME EDIT</span><strong>Objects with a softer point of view.</strong></div>
        </div>
        <span className={styles.heroIndex}>EST. FOR THE EVERYDAY · 2026</span>
      </section>

      <section className={styles.categorySection} aria-labelledby="category-heading">
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>FIND YOUR WAY IN</p><h2 id="category-heading">Shop by feeling.</h2></div><Link to="/shop">See everything <FiArrowRight aria-hidden="true" /></Link></div>
        <div className={styles.categoryGrid}>
          {categories.slice(1).map((category, index) => {
            const image = ["stoneware-mug.jpg", "ceramic-collection.jpg", "amber-candle.jpg"][index];
            const query = encodeURIComponent(category);
            return <Link key={category} className={styles.categoryCard} to={`/shop?category=${query}`}>
              <img src={`${import.meta.env.BASE_URL}images/${image}`} alt="" loading="lazy" />
              <span className={styles.categoryNumber}>0{index + 1}</span><strong>{category}</strong><FiArrowRight aria-hidden="true" />
            </Link>;
          })}
        </div>
      </section>

      <section className={styles.featuredSection} id="new-arrivals" aria-labelledby="featured-heading">
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>GOOD THINGS, JUST IN</p><h2 id="featured-heading">A considered few.</h2></div><Link to="/shop">Shop all pieces <FiArrowRight aria-hidden="true" /></Link></div>
        <div className={styles.productGrid}>{featured.map((product) => <ProductCard key={product.id} product={product} onAdd={onAddToCart} />)}</div>
      </section>

      <section className={styles.story} id="our-story">
        <div className={styles.storyImage}><img src={`${import.meta.env.BASE_URL}images/ceramic-tableware.jpg`} alt="A simple stoneware pour set ready for a slow afternoon" loading="lazy" /></div>
        <div className={styles.storyCopy}><p className={styles.eyebrow}>A LITTLE MORE INTENTION</p><h2>Less, but made<br /><em>with care.</em></h2><p>Morrow & Made is a small imagined studio for pieces that earn their place. We look for honest materials, thoughtful hands, and shapes that feel right to reach for, day after day.</p><Link to="/shop">Meet the collection <FiArrowRight aria-hidden="true" /></Link></div>
      </section>

      <section className={styles.newsletter}>
        <div><p className={styles.eyebrow}>A NOTE NOW AND THEN</p><h2>Good things, in your inbox.</h2><p>New pieces, studio notes, and small ideas for a well-used home.</p></div>
        {subscribed ? <p className={styles.subscribed}><FiCheck aria-hidden="true" /> You’re on the list. Thank you.</p> : <form onSubmit={subscribe}><label className={styles.visuallyHidden} htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" required /><button type="submit">Join the list <FiArrowRight aria-hidden="true" /></button><small>Just the occasional note. Unsubscribe whenever.</small></form>}
      </section>
    </div>
  );
};

export default Home;
