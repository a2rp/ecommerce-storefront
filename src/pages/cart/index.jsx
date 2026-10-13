import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight, FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import ConfirmationDialog from "../../components/confirmationDialog";
import { formatCurrency, getCartSummary } from "../../data/products";
import styles from "./styles.module.css";

const Cart = ({ cart, coupon, onUpdateQuantity, onRemoveFromCart, onClearCart, onApplyCoupon }) => {
  const [couponInput, setCouponInput] = useState(coupon);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const navigate = useNavigate();
  const summary = useMemo(() => getCartSummary(cart, coupon), [cart, coupon]);
  const targetItem = cart.find((item) => item.id === confirmTarget?.id);

  const confirmRemoval = () => {
    if (confirmTarget?.type === "all") onClearCart();
    else if (targetItem) onRemoveFromCart(targetItem.id);
    setConfirmTarget(null);
  };

  if (!cart.length) return <section className={styles.empty}><span className={styles.emptyIcon}><FiShoppingBag aria-hidden="true" /></span><p className={styles.eyebrow}>YOUR BAG IS QUIET</p><h1>Nothing here, yet.</h1><p>Take a look around and find a piece that feels like it belongs.</p><Link to="/shop">Explore the collection <FiArrowRight aria-hidden="true" /></Link></section>;

  return (
    <section className={styles.cart}>
      <div className={styles.heading}><div><p className={styles.eyebrow}>A GOOD PLACE TO PAUSE</p><h1>Your bag.</h1><p>{summary.itemCount} {summary.itemCount === 1 ? "piece" : "pieces"} selected for home.</p></div><button className={styles.clear} type="button" onClick={() => setConfirmTarget({ type: "all" })}><FiTrash2 aria-hidden="true" /> Clear bag</button></div>
      {summary.remainingForFreeShipping > 0 ? <div className={styles.shippingGoal}>You are {formatCurrency(summary.remainingForFreeShipping)} away from complimentary shipping.<div><span style={{ width: `${Math.min(100, ((85 - summary.remainingForFreeShipping) / 85) * 100)}%` }} /></div></div> : <div className={styles.shippingGoal}>Your bag qualifies for complimentary shipping. Thank you.</div>}
      <div className={styles.layout}><div className={styles.items}>{cart.map((item) => <article className={styles.item} key={item.id}><Link to={`/products/${item.slug}`} className={styles.thumb}><img src={item.image} alt={item.imageAlt} /></Link><div className={styles.itemInfo}><p>{item.category}</p><Link to={`/products/${item.slug}`}>{item.name}</Link><span>{formatCurrency(item.price)} each</span><div className={styles.quantity}><button type="button" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} aria-label={`Decrease ${item.name} quantity`}><FiMinus /></button><output>{item.quantity}</output><button type="button" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.stock} aria-label={`Increase ${item.name} quantity`}><FiPlus /></button></div></div><strong className={styles.lineTotal}>{formatCurrency(item.price * item.quantity)}</strong><button className={styles.remove} type="button" onClick={() => setConfirmTarget({ type: "item", id: item.id })} aria-label={`Remove ${item.name}`}><FiTrash2 /></button></article>)}</div>
        <aside className={styles.summary}><h2>Order summary</h2><form className={styles.promo} onSubmit={(event) => { event.preventDefault(); onApplyCoupon(couponInput); }}><label htmlFor="promo-code">A small thank-you</label><div><input id="promo-code" value={couponInput} onChange={(event) => setCouponInput(event.target.value)} placeholder="Enter code" /><button type="submit">Apply</button></div><small>Use MORROW10 for 10% off this demo order.</small></form><div className={styles.totals}><p><span>Subtotal</span><strong>{formatCurrency(summary.subtotal)}</strong></p>{summary.discount > 0 && <p><span>MORROW10</span><strong>−{formatCurrency(summary.discount)}</strong></p>}<p><span>Shipping</span><strong>{summary.shipping ? formatCurrency(summary.shipping) : "Complimentary"}</strong></p><p><span>Estimated tax</span><strong>{formatCurrency(summary.estimatedTax)}</strong></p><p className={styles.total}><span>Total</span><strong>{formatCurrency(summary.total)}</strong></p></div><button className={styles.checkout} type="button" onClick={() => navigate("/checkout")}>Continue to checkout <FiArrowRight aria-hidden="true" /></button><p className={styles.demoNote}>Checkout is a frontend demo. No payment will be taken.</p><Link className={styles.continue} to="/shop">Continue browsing</Link></aside>
      </div>
      <ConfirmationDialog isOpen={Boolean(confirmTarget)} title={confirmTarget?.type === "all" ? "Clear your bag?" : "Remove this piece?"} itemName={confirmTarget?.type === "all" ? `${summary.itemCount} ${summary.itemCount === 1 ? "item" : "items"} will be removed` : targetItem?.name} description="This change only affects your current browsing session." confirmLabel={confirmTarget?.type === "all" ? "Clear bag" : "Remove piece"} cancelLabel="Keep shopping" onConfirm={confirmRemoval} onCancel={() => setConfirmTarget(null)} />
    </section>
  );
};

export default Cart;
