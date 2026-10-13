import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiLock } from "react-icons/fi";
import { formatCurrency, getCartSummary } from "../../data/products";
import styles from "./styles.module.css";

const Checkout = ({ cart, coupon, onPlaceOrder, onNotify }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", region: "", postal: "", country: "United States" });
  const [errors, setErrors] = useState({});
  const summary = getCartSummary(cart, coupon);

  if (!cart.length) return <section className={styles.empty}><h1>Your bag is empty.</h1><p>Add a piece before continuing to checkout.</p><Link to="/shop">Browse the collection</Link></section>;

  const change = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    ["name", "email", "address", "city", "region", "postal"].forEach((field) => {
      if (!form[field].trim()) nextErrors[field] = "Please complete this field.";
    });
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Enter a valid email address.";
    if (form.postal && form.postal.trim().length < 4) nextErrors.postal = "Enter a valid postal code.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      onNotify("Check the highlighted details before continuing.", "error");
      document.querySelector(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus();
      return;
    }
    const order = onPlaceOrder(form);
    navigate("/order-complete", { replace: true, state: { order } });
  };

  const field = (name, label, type = "text", autocomplete = "") => (
    <label className={styles.field} htmlFor={name} key={name}><span>{label}</span><input id={name} name={name} type={type} autoComplete={autocomplete} value={form[name]} onChange={change} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${name}-error` : undefined} />{errors[name] && <small id={`${name}-error`}>{errors[name]}</small>}</label>
  );

  return (
    <section className={styles.checkout}>
      <Link className={styles.back} to="/cart"><FiArrowLeft aria-hidden="true" /> Return to bag</Link>
      <div className={styles.heading}><p className={styles.eyebrow}>A SIMPLE CHECKOUT DEMO</p><h1>Nearly yours.</h1><p>Share where to send your pieces. This demo does not process payment or submit your details to a server.</p></div>
      <form className={styles.layout} onSubmit={submit} noValidate>
        <div className={styles.formColumn}>
          <section className={styles.formSection}><div className={styles.sectionTitle}><span>01</span><div><h2>Contact</h2><p>We’ll use this for the sample order confirmation.</p></div></div><div className={styles.fields}>{field("name", "Full name", "text", "name")}{field("email", "Email address", "email", "email")}</div></section>
          <section className={styles.formSection}><div className={styles.sectionTitle}><span>02</span><div><h2>Delivery address</h2><p>Enter any sample address to explore the flow.</p></div></div><div className={styles.fields}>{field("address", "Street address", "text", "street-address")}<div className={styles.twoFields}>{field("city", "City", "text", "address-level2")}{field("region", "State / region", "text", "address-level1")}</div><div className={styles.twoFields}>{field("postal", "Postal code", "text", "postal-code")}<label className={styles.field} htmlFor="country"><span>Country</span><select id="country" name="country" value={form.country} onChange={change}><option>United States</option><option>Canada</option><option>United Kingdom</option><option>India</option><option>Australia</option></select></label></div></div></section>
          <div className={styles.notice}><FiLock aria-hidden="true" /><p><strong>Demo checkout only.</strong> No card details are requested, no payment is processed, and your information stays in this page session.</p></div>
        </div>
        <aside className={styles.summary}><h2>Your order</h2><div className={styles.orderItems}>{cart.map((item) => <div className={styles.orderItem} key={item.id}><img src={item.image} alt="" /><p><strong>{item.name}</strong><span>Qty {item.quantity}</span></p><strong>{formatCurrency(item.price * item.quantity)}</strong></div>)}</div><div className={styles.totals}><p><span>Subtotal</span><strong>{formatCurrency(summary.subtotal)}</strong></p>{summary.discount > 0 && <p><span>Discount</span><strong>−{formatCurrency(summary.discount)}</strong></p>}<p><span>Shipping</span><strong>{summary.shipping ? formatCurrency(summary.shipping) : "Complimentary"}</strong></p><p><span>Estimated tax</span><strong>{formatCurrency(summary.estimatedTax)}</strong></p><p className={styles.total}><span>Demo total</span><strong>{formatCurrency(summary.total)}</strong></p></div><button className={styles.placeOrder} type="submit">Place sample order <FiArrowRight aria-hidden="true" /></button><p className={styles.terms}>Selecting this creates a local sample order only.</p></aside>
      </form>
    </section>
  );
};

export default Checkout;
