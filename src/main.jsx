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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />}>
              <Route path=":category" element={<ShopPage />} />
            </Route>
            <Route path="/shop/products/:productId" element={<ProductPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
