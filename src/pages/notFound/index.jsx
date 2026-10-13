import { Link, useLocation } from "react-router-dom";
import { FiArrowLeft, FiSearch } from "react-icons/fi";
import styles from "./styles.module.css";

const NotFound = () => {
  const location = useLocation();
  return (
    <section className={styles.notFound}>
      <span className={styles.code}>404</span><span className={styles.icon}><FiSearch aria-hidden="true" /></span>
      <p className={styles.eyebrow}>NOT ON OUR SHELVES</p><h1>We can’t find that page.</h1><p>The address <code>{location.pathname}</code> doesn’t lead to a piece in this collection.</p>
      <div><Link to="/shop">Browse the shop</Link><Link className={styles.secondary} to="/"><FiArrowLeft aria-hidden="true" /> Back home</Link></div>
    </section>
  );
};

export default NotFound;
