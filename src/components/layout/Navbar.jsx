import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, Heart, User, Search, Menu, X, Leaf } from "lucide-react";
import { logout } from "../../store/slices/authSlice";
import { useLogoutMutation } from "../../services/authApi";
import { clearCart } from "../../store/slices/cartSlice";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenu, setUserMenu] = useState(false);

  const { isAuthenticated, user } = useSelector((s) => s.auth);
  const { itemCount } = useSelector((s) => s.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApi] = useLogoutMutation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery.trim()}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch {}
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
    setUserMenu(false);
  };

  const navLinks = [
    { label: "Shop", to: "/products" },
    { label: "Categories", to: "/categories" },
    { label: "About", to: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-stone-200">
      {/* Top bar */}
      <div className="bg-forest-700 text-white text-center text-xs py-2 font-body tracking-wide">
        🌿 Free delivery on orders above ₹499 &nbsp;·&nbsp; 100% certified organic
      </div>

      <nav className="container-max flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-forest-600 rounded-lg flex items-center justify-center group-hover:bg-forest-700 transition-colors">
            <Leaf size={16} className="text-white" />
          </div>
          <span className="font-display font-semibold text-xl text-bark">
            Earth <span className="text-forest-600">Mitra</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-body text-sm font-medium text-stone-600 hover:text-forest-600 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <button
            onClick={() => setSearchOpen((p) => !p)}
            className="p-2 rounded-lg text-stone-500 hover:text-forest-600 hover:bg-forest-50 transition-all"
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          {/* Wishlist */}
          {isAuthenticated && (
            <Link
              to="/wishlist"
              className="p-2 rounded-lg text-stone-500 hover:text-forest-600 hover:bg-forest-50 transition-all"
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </Link>
          )}

          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-2 rounded-lg text-stone-500 hover:text-forest-600 hover:bg-forest-50 transition-all"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-forest-600 text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </Link>

          {/* User */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setUserMenu((p) => !p)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-forest-50 hover:bg-forest-100 transition-all"
              >
                <div className="w-6 h-6 bg-forest-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-[10px] font-semibold">
                    {user?.name?.[0]?.toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-forest-700 hidden sm:block">
                  {user?.name?.split(" ")[0]}
                </span>
              </button>
              {userMenu && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-stone-100 py-1 z-50">
                  <Link
                    to="/profile"
                    onClick={() => setUserMenu(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-stone-700 hover:bg-forest-50 hover:text-forest-700"
                  >
                    <User size={15} /> My Profile
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setUserMenu(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-stone-700 hover:bg-forest-50 hover:text-forest-700"
                  >
                    📦 My Orders
                  </Link>
                  <hr className="my-1 border-stone-100" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn-primary text-sm py-2 px-4">
              Sign in
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="md:hidden p-2 rounded-lg text-stone-500 hover:text-forest-600"
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Search bar */}
      {searchOpen && (
        <div className="border-t border-stone-100 bg-white px-4 py-3">
          <form onSubmit={handleSearch} className="container-max flex gap-2">
            <input
              autoFocus
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search organic products..."
              className="input flex-1"
            />
            <button type="submit" className="btn-primary">Search</button>
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-stone-100 bg-white px-4 py-4 flex flex-col gap-3">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              className="font-body text-sm font-medium text-stone-700 hover:text-forest-600 py-1"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}