import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "./layouts/root.layout.jsx";
import HomePage from "./pages/home.page.jsx";
import { store } from "./lib/store.js";
import { Provider } from "react-redux";
import ShopPage from "./pages/shop.page.jsx";
import ProductPage from "./pages/product.page.jsx";
import SignUpPage from "./sign-up.page.jsx";
import SignInPage from "./sign-in.page.jsx";
import CartPage from "./pages/cart.page.jsx";
import CheckoutPage from "./pages/checkout.page.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />}>
                <Route path=":category" element={<ShopPage />} />
              </Route>
              <Route path="/shop/cart" element={<CartPage />} />
              <Route path="/shop/checkout" element={<CheckoutPage />} />
              <Route path="/shop/products/:productId" element={<ProductPage />} />
            </Route>
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ClerkProvider>
  </StrictMode>
);
