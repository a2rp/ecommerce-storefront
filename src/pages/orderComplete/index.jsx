import { Link, useLocation } from "react-router-dom";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { formatCurrency } from "../../data/products";
import styles from "./styles.module.css";

const OrderComplete = ({ lastOrder }) => {
  const location = useLocation();
  const order = location.state?.order || lastOrder;

  if (!order) return <section className={styles.noOrder}><p className={styles.eyebrow}>NO SAMPLE ORDER IN THIS SESSION</p><h1>Ready when you are.</h1><p>Place a sample order from the checkout page to see the confirmation details here.</p><Link to="/shop">Return to the collection <FiArrowRight aria-hidden="true" /></Link></section>;

  return (
    <section className={styles.complete}>
      <div className={styles.check}><FiCheck aria-hidden="true" /></div>
      <p className={styles.eyebrow}>A LITTLE SOMETHING FOR YOUR HOME</p>
      <h1>Thank you,<br /><em>{order.details.name.split(" ")[0]}.</em></h1>
      <p className={styles.lead}>Your sample order is all set. This is a frontend-only confirmation; no payment or delivery request was sent.</p>
      <div className={styles.receipt}><div className={styles.receiptTop}><span>Sample reference</span><strong>{order.reference}</strong></div><p className={styles.sentTo}>Confirmation preview for {order.details.email}</p><div className={styles.items}>{order.items.map((item) => <div key={item.id}><span>{item.name} <small>× {item.quantity}</small></span><strong>{formatCurrency(item.price * item.quantity)}</strong></div>)}</div><div className={styles.total}><span>Demo total</span><strong>{formatCurrency(order.summary.total)}</strong></div></div>
      <Link className={styles.return} to="/shop">Back to the collection <FiArrowRight aria-hidden="true" /></Link>
    </section>
  );
};

export default OrderComplete;
