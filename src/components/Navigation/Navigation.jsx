import { useState } from "react";
import { Link } from "react-router";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { SignedIn, UserButton, SignedOut, useUser } from "@clerk/clerk-react";
import { useSelector } from "react-redux";

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { isSignedIn, user } = useUser();

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const role = user?.publicMetadata?.role;

  return (
    <header className="w-full bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-pink-700 tracking-tight hover:text-pink-900 transition">
          <img src="/assets/logo.png" alt="TrendTide" className="w-28 h-auto max-w-full" />
        </Link>

        {/* Mobile Controls: Cart + User + Menu */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Cart */}
          <Link to="/shop/cart" aria-label="Shopping Bag" className="relative p-2 rounded-full hover:bg-pink-50 transition">
            <ShoppingBag size={24} className="text-gray-700" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* User Button */}
          {isSignedIn && <UserButton />}

          {/* Hamburger */}
          <button
            className="p-2 rounded-md hover:bg-pink-50 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 ml-12">
          <Link to="/shop" className="text-gray-700 hover:text-pink-700 font-medium transition">Shop</Link>
          <Link to="/contact" className="text-gray-700 hover:text-pink-700 font-medium transition">Contact Us</Link>
          <SignedIn>
            <Link to="/myorders" className="text-gray-700 hover:text-pink-700 font-medium transition">My Orders</Link>
          </SignedIn>
        </nav>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-4">
          <button aria-label="Search" className="p-2 rounded-full hover:bg-pink-50 transition">
            <Search size={22} className="text-gray-700" />
          </button>

          {/* Cart */}
          <Link to="/shop/cart" aria-label="Shopping Bag" className="relative p-2 rounded-full hover:bg-pink-50 transition">
            <ShoppingBag size={22} className="text-gray-700" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow">
                {cartItemCount}
              </span>
            )}
          </Link>

          {isSignedIn && role === "admin" && (
            <Link to="/dashboard" className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-600 via-pink-700 to-pink-800 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
              Dashboard
            </Link>
          )}

          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="flex gap-2">
              <Link to="/sign-in" className="px-3 py-1 rounded-full bg-pink-700 text-white font-semibold hover:bg-pink-900 transition text-sm">Sign In</Link>
              <Link to="/sign-up" className="px-3 py-1 rounded-full border border-pink-700 text-pink-700 font-semibold hover:bg-pink-50 transition text-sm">Sign Up</Link>
            </div>
          </SignedOut>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-4 space-y-4 animate-fadeIn">
          <Link to="/shop" className="block text-gray-700 hover:text-pink-700 font-medium transition">Shop</Link>
          <Link to="/contact" className="block text-gray-700 hover:text-pink-700 font-medium transition">Contact Us</Link>
          <SignedIn>
            <Link to="/myorders" className="block text-gray-700 hover:text-pink-700 font-medium transition">My Orders</Link>
          </SignedIn>
          {isSignedIn && role === "admin" && (
            <Link to="/dashboard" className="block px-3 py-2 rounded-md bg-pink-700 text-white font-semibold text-center hover:bg-pink-900 transition">Dashboard</Link>
          )}
          <SignedOut>
            <div className="space-y-2">
              <Link to="/sign-in" className="block w-full text-center px-3 py-2 rounded-md bg-pink-700 text-white font-semibold hover:bg-pink-900 transition">Sign In</Link>
              <Link to="/sign-up" className="block w-full text-center px-3 py-2 rounded-md border border-pink-700 text-pink-700 font-semibold hover:bg-pink-50 transition">Sign Up</Link>
            </div>
          </SignedOut>
        </div>
      )}
    </header>
  );
}

export default Navigation;
