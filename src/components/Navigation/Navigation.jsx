import { Link } from "react-router";
import styles from "./Navigation.module.css";
import { Menu, X, ShoppingBag, Search, User } from "lucide-react";
import { SignedIn, UserButton, SignedOut } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
function Navigation() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return (
    <header className={styles.navbar}>
      <Link to="/" className={styles.logo}>Mebius</Link>
      <nav>

      </nav>
      <div className={styles.controls}>
        <div className={styles.icons}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-search-icon lucide-search"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <Link
              to="/shop/cart"
              aria-label="Shopping Bag"
              className="p-1 relative mx-4"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            </Link>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <div className="hidden md:block">
          <SignedOut>
            <div className="flex items-center gap-4">
              <Link to="/sign-in">Sign In</Link>
              <Link to="/sign-up">Sign Up</Link>
            </div>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}

export default Navigation;
