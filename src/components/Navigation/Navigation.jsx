import { Link } from "react-router";
import { ShoppingBag, Search } from "lucide-react";
import { SignedIn, UserButton, SignedOut } from "@clerk/clerk-react";
import { useSelector } from "react-redux";

function Navigation() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="w-full bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-pink-700 tracking-tight hover:text-pink-900 transition"
        >
          Mebius
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-8 ml-12">
          <Link
            to="/shop"
            className="text-gray-700 hover:text-pink-700 font-medium transition"
          >
            Shop
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-pink-700 font-medium transition"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-pink-700 font-medium transition"
          >
            Contact
          </Link>
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Search Icon */}
          <button
            aria-label="Search"
            className="p-2 rounded-full hover:bg-pink-50 transition"
          >
            <Search size={22} className="text-gray-700" />
          </button>

          {/* Cart Icon */}
          <Link
            to="/shop/cart"
            aria-label="Shopping Bag"
            className="relative p-2 rounded-full hover:bg-pink-50 transition"
          >
            <ShoppingBag size={22} className="text-gray-700" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* User / Auth */}
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="flex items-center gap-2">
              <Link
                to="/sign-in"
                className="px-4 py-1 rounded-full bg-pink-700 text-white font-semibold hover:bg-pink-900 transition text-sm"
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="px-4 py-1 rounded-full bg-white border border-pink-700 text-pink-700 font-semibold hover:bg-pink-50 transition text-sm"
              >
                Sign Up
              </Link>
            </div>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}

export default Navigation;
