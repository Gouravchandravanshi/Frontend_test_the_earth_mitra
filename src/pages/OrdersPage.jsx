import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import { useGetMyOrdersQuery } from "../services/orderApi";
import Spinner from "../components/ui/Spinner";

const STATUS_COLORS = {
  processing: "bg-amber-50 text-amber-700 border-amber-100",
  shipped:    "bg-blue-50 text-blue-700 border-blue-100",
  delivered:  "bg-forest-50 text-forest-700 border-forest-100",
  cancelled:  "bg-red-50 text-red-500 border-red-100",
};

export default function OrdersPage() {
  const { data: orders, isLoading } = useGetMyOrdersQuery();

  if (isLoading) return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );

  if (!orders?.length) return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center text-center px-4">
      <Package size={64} className="text-stone-200 mb-4" />
      <h2 className="font-display text-2xl font-semibold text-bark mb-2">No orders yet</h2>
      <p className="text-stone-400 text-sm mb-6">Your completed orders will appear here.</p>
      <Link to="/products" className="btn-primary">Start shopping</Link>
    </div>
  );

  return (
    <div className="bg-cream min-h-screen section-pad">
      <div className="container-max max-w-3xl">
        <h1 className="font-display text-3xl font-semibold text-bark mb-8">My orders</h1>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="card p-5">
              <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                <div>
                  <p className="text-xs text-stone-400 mb-0.5">Order ID</p>
                  <p className="text-sm font-mono text-bark">{order._id}</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border capitalize ${STATUS_COLORS[order.status]}`}>
                  {order.status}
                </span>
              </div>
              <div className="flex gap-2 mb-4 flex-wrap">
                {order.items.slice(0, 3).map((item) => (
                  <img
                    key={item._id}
                    src={item.image || ""}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-xl bg-stone-50"
                  />
                ))}
                {order.items.length > 3 && (
                  <div className="w-14 h-14 bg-stone-50 rounded-xl flex items-center justify-center text-xs text-stone-400 font-medium">
                    +{order.items.length - 3}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="text-stone-500">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  <span className="mx-2">·</span>
                  {order.items.length} item{order.items.length > 1 ? "s" : ""}
                </div>
                <p className="font-display font-semibold text-bark">₹{order.totalAmount.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}