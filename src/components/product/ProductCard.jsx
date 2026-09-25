import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Leaf } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useAddToCartMutation } from "../../services/cartApi";
import { useAddToWishlistMutation } from "../../services/wishlistApi";
import { setCart } from "../../store/slices/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((s) => s.auth);
  const [addToCart, { isLoading: cartLoading }] = useAddToCartMutation();
  const [addToWishlist] = useAddToWishlistMutation();

  const image = product.images?.[0]?.url;
  const price = product.discountPrice || product.price;
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleCart = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return toast.error("Please sign in to add to cart");
    try {
      const res = await addToCart({ productId: product._id, qty: 1 }).unwrap();
      dispatch(setCart(res));
      toast.success("Added to cart!");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add to cart");
    }
  };

  const handleWishlist = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return toast.error("Please sign in to save items");
    try {
      await addToWishlist({ productId: product._id }).unwrap();
      toast.success("Saved to wishlist!");
    } catch (err) {
      toast.error(err?.data?.message || "Already in wishlist");
    }
  };

  return (
    <Link to={`/product/${product.slug}`} className="group card block">
      {/* Image */}
      <div className="relative aspect-square bg-stone-50 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Leaf size={48} className="text-stone-200" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.eco_certified && (
            <span className="eco-badge text-[10px]">
              <Leaf size={10} /> Eco Certified
            </span>
          )}
          {hasDiscount && (
            <span className="bg-forest-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
              -{discountPct}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50"
          aria-label="Add to wishlist"
        >
          <Heart size={15} className="text-stone-400 hover:text-red-500 transition-colors" />
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        {product.origin && (
          <p className="text-[11px] text-stone-400 font-medium uppercase tracking-wide mb-1">
            {product.origin}
          </p>
        )}
        <h3 className="font-body font-medium text-bark text-sm leading-snug mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        {product.numReviews > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} className={`text-[12px] ${s <= Math.round(product.avgRating) ? "text-amber-400" : "text-stone-200"}`}>★</span>
              ))}
            </div>
            <span className="text-[11px] text-stone-400">({product.numReviews})</span>
          </div>
        )}

        {/* Price + Cart */}
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="font-display font-semibold text-forest-700 text-base">
              ₹{price}
            </span>
            {hasDiscount && (
              <span className="text-stone-400 text-xs line-through ml-1.5">₹{product.price}</span>
            )}
          </div>
          <button
            onClick={handleCart}
            disabled={cartLoading || product.stock === 0}
            className="w-8 h-8 bg-forest-600 hover:bg-forest-700 disabled:bg-stone-200 rounded-lg flex items-center justify-center transition-colors active:scale-95"
            aria-label="Add to cart"
          >
            <ShoppingCart size={15} className="text-white" />
          </button>
        </div>

        {product.stock === 0 && (
          <p className="text-[11px] text-red-500 mt-1 font-medium">Out of stock</p>
        )}
      </div>
    </Link>
  );
}