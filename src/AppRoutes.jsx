import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Loading from "./components/loading";
import scrollToTop from "./utils/scrollToTop";

const Home = lazy(() => import("./pages/home"));
const Shop = lazy(() => import("./pages/shop"));
const ProductDetails = lazy(() => import("./pages/productDetails"));
const Cart = lazy(() => import("./pages/cart"));
const Checkout = lazy(() => import("./pages/checkout"));
const OrderComplete = lazy(() => import("./pages/orderComplete"));
const NotFound = lazy(() => import("./pages/notFound"));

const AppRoutes = (props) => {
  const location = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [location.pathname]);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home {...props} />} />
        <Route path="/shop" element={<Shop {...props} />} />
        <Route path="/products/:slug" element={<ProductDetails {...props} />} />
        <Route path="/cart" element={<Cart {...props} />} />
        <Route path="/checkout" element={<Checkout {...props} />} />
        <Route path="/order-complete" element={<OrderComplete {...props} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
