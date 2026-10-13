import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";
import { formatCurrency, products } from "../../data/products";
import styles from "./styles.module.css";

const ProductDetails = ({ onAddToCart }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = products.find((item) => item.slug === slug);
  const [quantity, setQuantity] = useState(1);

  if (!product) return <section className={styles.missing}><p className={styles.eyebrow}>NOT IN THE COLLECTION</p><h1>That piece has moved on.</h1><Link to="/shop">Return to the collection</Link></section>;

  const add = () => { onAddToCart(product, quantity); navigate("/cart"); };

  return (
    <section className={styles.detail}>
      <Link className={styles.back} to="/shop"><FiArrowLeft aria-hidden="true" /> Back to all pieces</Link>
      <div className={styles.layout}>
        <div className={styles.image}><img src={product.image} alt={product.imageAlt} /><span>{product.badge}</span></div>
        <div className={styles.copy}><p className={styles.eyebrow}>{product.category.toUpperCase()} · SMALL BATCH</p><h1>{product.name}</h1><p className={styles.price}>{formatCurrency(product.price)}</p><p className={styles.description}>{product.description}</p><div className={styles.maker}>{product.maker}</div>
          <div className={styles.facts}><div><span>Material</span><strong>{product.material}</strong></div><div><span>Finish</span><strong>{product.finish}</strong></div><div><span>Details</span><strong>{product.dimensions}</strong></div></div>
          <div className={styles.purchase}><div className={styles.quantity} aria-label="Quantity"><button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))} disabled={quantity <= 1}><FiMinus /></button><output aria-live="polite">{quantity}</output><button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => Math.min(product.stock, value + 1))} disabled={quantity >= product.stock}><FiPlus /></button></div><button className={styles.add} type="button" onClick={add} disabled={product.stock < 1}><FiShoppingBag aria-hidden="true" /> Add to bag · {formatCurrency(product.price * quantity)}</button></div>
          <p className={styles.stock}>{product.stock > 0 ? `${product.stock} available in this small batch` : "Currently sold out"}</p>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
