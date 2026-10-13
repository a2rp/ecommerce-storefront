import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Toast from "./components/toast";
import AppRoutes from "./AppRoutes";
import { getCartSummary, products } from "./data/products";
import styles from "./App.module.css";

const App = () => {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [toast, setToast] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);
  const location = useLocation();

  const notify = useCallback((message, type = "success") => {
    setToast({ message, type, id: Date.now() });
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 3800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const addToCart = useCallback((product, quantity = 1) => {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      const nextQuantity = Math.min(product.stock, (found?.quantity || 0) + quantity);
      if (found && found.quantity === nextQuantity) {
        notify("That is all the available stock for this piece.", "info");
        return current;
      }
      notify(`${product.name} added to your bag.`);
      return found
        ? current.map((item) => item.id === product.id ? { ...item, quantity: nextQuantity } : item)
        : [...current, { ...product, quantity: Math.min(product.stock, quantity) }];
    });
  }, [notify]);

  const updateQuantity = useCallback((productId, quantity) => {
    const product = products.find((item) => item.id === productId);
    if (!product || quantity < 1) return;
    setCart((current) => current.map((item) => item.id === productId ? { ...item, quantity: Math.min(product.stock, quantity) } : item));
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((current) => current.filter((item) => item.id !== productId));
    notify("Piece removed from your bag.", "info");
  }, [notify]);

  const clearCart = useCallback(() => {
    setCart([]);
    setCoupon("");
    notify("Your bag is now empty.", "info");
  }, [notify]);

  const applyCoupon = useCallback((value) => {
    if (value.trim().toUpperCase() !== "MORROW10") {
      notify("That code did not match. Try MORROW10.", "error");
      return false;
    }
    setCoupon("MORROW10");
    notify("MORROW10 applied. Your 10% saving is included.");
    return true;
  }, [notify]);

  const placeOrder = useCallback((details) => {
    const summary = getCartSummary(cart, coupon);
    const order = {
      reference: `MM-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      details,
      items: cart,
      summary,
      createdAt: new Date().toISOString(),
    };
    setLastOrder(order);
    setCart([]);
    setCoupon("");
    return order;
  }, [cart, coupon]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className={styles.app}>
      <a className={styles.skipLink} href="#main-content">Skip to content</a>
      <Header cartCount={cartCount} />
      <main className={styles.main} id="main-content" key={location.pathname}>
        <AppRoutes
          cart={cart}
          coupon={coupon}
          lastOrder={lastOrder}
          onAddToCart={addToCart}
          onUpdateQuantity={updateQuantity}
          onRemoveFromCart={removeFromCart}
          onClearCart={clearCart}
          onApplyCoupon={applyCoupon}
          onPlaceOrder={placeOrder}
          onNotify={notify}
        />
      </main>
      <Footer />
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
};

export default App;
