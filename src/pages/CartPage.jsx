import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useGetCartQuery, useUpdateCartItemMutation, useRemoveFromCartMutation } from "../services/cartApi";
import { setCart } from "../store/slices/cartSlice";
import Spinner from "../components/ui/Spinner";

export default function CartPage() {
  const dispatch = useDispatch();
  const { data: cart, isLoading } = useGetCartQuery();
  const [updateItem] = useUpdateCartItemMutation();
  const [removeItem] = useRemoveFromCartMutation();

  const handleQty = async (productId, qty) => {
    if (qty < 1) return;
    try {
      const res = await updateItem({ productId, qty }).unwrap();
      dispatch(setCart(res));
    } catch { toast.error("Failed to update"); }
  };

  const handleRemove = async (productId) => {
    try {
      const res = await removeItem(productId).unwrap();
      dispatch(setCart(res));
      toast.success("Removed from cart");
    } catch { toast.error("Failed to remove"); }
  };

  if (isLoading) return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );

  const items = cart?.items || [];
  const total = cart?.total || 0;

  if (items.length === 0) return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center text-center px-4">
      <ShoppingBag size={64} className="text-stone-200 mb-4" />
      <h2 className="font-display text-2xl font-semibold text-bark mb-2">Your cart is empty</h2>
      <p className="text-stone-400 text-sm mb-6">Looks like you haven't added anything yet.</p>
      <Link to="/products" className="btn-primary">Browse products</Link>
    </div>
  );

  return (
    <div className="bg-cream min-h-screen section-pad">
      <div className="container-max">
        <h1 className="font-display text-3xl font-semibold text-bark mb-8">Your cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, qty, _id }) => (
              <div key={_id} className="card p-4 flex gap-4">
                <Link to={`/product/${product.slug}`}>
                  <img
                    src={product.images?.[0]?.url || ""}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-xl bg-stone-50 flex-shrink-0"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${product.slug}`}>
                    <h3 className="font-body font-medium text-bark text-sm line-clamp-2 hover:text-forest-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="font-display font-semibold text-forest-700 mt-1">
                    ₹{product.discountPrice || product.price}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 bg-stone-50 rounded-lg p-1">
                      <button
                        onClick={() => handleQty(product._id, qty - 1)}
                        className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{qty}</span>
                      <button
                        onClick={() => handleQty(product._id, qty + 1)}
                        disabled={qty >= product.stock}
                        className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-white transition-colors disabled:opacity-40"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemove(product._id)}
                      className="text-stone-300 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-display font-semibold text-bark">
                    ₹{((product.discountPrice || product.price) * qty).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="card p-6 h-fit sticky top-24">
            <h2 className="font-display text-lg font-semibold text-bark mb-5">Order summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal ({items.length} items)</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Delivery</span>
                <span className={total >= 499 ? "text-forest-600 font-medium" : ""}>
                  {total >= 499 ? "Free" : "₹49"}
                </span>
              </div>
              {total < 499 && (
                <p className="text-xs text-forest-600 bg-forest-50 px-3 py-2 rounded-lg">
                  Add ₹{499 - total} more for free delivery!
                </p>
              )}
              <div className="border-t border-stone-100 pt-3 flex justify-between font-semibold text-bark">
                <span>Total</span>
                <span className="font-display text-lg">₹{(total + (total >= 499 ? 0 : 49)).toLocaleString()}</span>
              </div>
            </div>
            <Link to="/checkout" className="btn-primary w-full justify-center flex items-center gap-2 mt-6">
              Proceed to checkout <ArrowRight size={16} />
            </Link>
            <Link to="/products" className="btn-ghost w-full justify-center flex text-center mt-3 text-sm">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}