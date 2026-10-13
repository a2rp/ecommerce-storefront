import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { formatCurrency } from "../../data/products";
import styles from "./styles.module.css";

const ProductCard = ({ product, onAdd }) => (
  <article className={styles.productCard}>
    <Link className={styles.imageLink} to={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
      <span className={styles.imageWrap}>
        <img src={product.image} alt={product.imageAlt} loading="lazy" />
        <span className={styles.badge}>{product.badge}</span>
      </span>
    </Link>
    <div className={styles.productInfo}>
      <div>
        <p className={styles.category}>{product.category}</p>
        <Link className={styles.name} to={`/products/${product.slug}`}>{product.name}</Link>
      </div>
      <strong className={styles.price}>{formatCurrency(product.price)}</strong>
    </div>
    <button className={styles.addButton} type="button" onClick={() => onAdd(product)} disabled={product.stock < 1} aria-label={`Add ${product.name} to bag`}>
      <FiPlus aria-hidden="true" /> <span>{product.stock < 1 ? "Sold out" : "Add to bag"}</span>
    </button>
  </article>
);

export default ProductCard;
