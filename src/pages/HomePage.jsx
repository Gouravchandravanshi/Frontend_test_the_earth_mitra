import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Shield, Truck, RefreshCw } from "lucide-react";
import { useGetProductsQuery } from "../services/productApi";
import { useGetCategoriesQuery } from "../services/categoryApi";
import ProductCard from "../components/product/ProductCard";
import ProductSkeleton from "../components/product/ProductSkeleton";

const TRUST_BADGES = [
  { icon: Leaf,      label: "100% Certified Organic",    sub: "Every product verified" },
  { icon: Shield,    label: "No Harmful Chemicals",      sub: "Pure & safe always" },
  { icon: Truck,     label: "Free Delivery ₹499+",       sub: "Pan India shipping" },
  { icon: RefreshCw, label: "Easy Returns",              sub: "7-day return policy" },
];

const CATEGORY_ICONS = ["🌾", "🌿", "🍵", "🧴", "🏡", "🌺"];

export default function HomePage() {
  const { data: productsData, isLoading: productsLoading } = useGetProductsQuery({ limit: 8, sort: "newest" });
  const { data: categories } = useGetCategoriesQuery();

  const products = productsData?.products || [];

  return (
    <div className="bg-cream">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-forest-800 via-forest-700 to-forest-600 text-white">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #74c69d 0%, transparent 50%), radial-gradient(circle at 80% 20%, #d8f3dc 0%, transparent 40%)" }}
        />
        <div className="container-max section-pad relative z-10">
          <div className="max-w-2xl">
            <span className="eco-badge bg-forest-600/50 text-forest-100 border-forest-500 mb-6 inline-flex">
              <Leaf size={12} /> Sourced from 200+ Indian farmers
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-tight mb-6">
              Nature's best,{" "}
              <span className="text-forest-300">delivered pure.</span>
            </h1>
            <p className="font-body text-forest-100 text-lg leading-relaxed mb-8 max-w-xl">
              Certified organic products grown without chemicals. From farm to your doorstep — honest, transparent, and genuinely good for you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="bg-white text-forest-700 font-semibold px-7 py-3.5 rounded-xl hover:bg-forest-50 transition-colors active:scale-95 inline-flex items-center gap-2">
                Shop now <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="border border-forest-400 text-white font-medium px-7 py-3.5 rounded-xl hover:bg-forest-600 transition-colors">
                Our story
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative leaf shapes */}
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-5 pointer-events-none hidden lg:block"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100,10 C140,10 180,50 180,100 C180,150 140,190 100,190 C60,190 20,150 20,100 C20,50 60,10 100,10Z' fill='white'/%3E%3C/svg%3E\")" }}
        />
      </section>

      {/* ── Trust badges ── */}
      <section className="border-b border-stone-200 bg-white">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_BADGES.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-forest-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-forest-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-bark leading-tight">{label}</p>
                  <p className="text-xs text-stone-400 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      {categories && categories.length > 0 && (
        <section className="section-pad">
          <div className="container-max">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs font-semibold text-forest-600 uppercase tracking-widest mb-1">Browse by type</p>
                <h2 className="font-display text-3xl font-semibold text-bark">Shop by category</h2>
              </div>
              <Link to="/products" className="text-sm text-forest-600 font-medium hover:underline hidden sm:block">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.slice(0, 6).map((cat, i) => (
                <Link
                  key={cat._id}
                  to={`/products?category=${cat._id}`}
                  className="group flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-stone-100 hover:border-forest-200 hover:shadow-sm transition-all"
                >
                  <div className="w-12 h-12 bg-forest-50 group-hover:bg-forest-100 rounded-xl flex items-center justify-center text-2xl transition-colors">
                    {CATEGORY_ICONS[i] || "🌿"}
                  </div>
                  <span className="text-sm font-medium text-bark text-center leading-tight">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Featured products ── */}
      <section className="section-pad bg-white">
        <div className="container-max">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold text-forest-600 uppercase tracking-widest mb-1">Handpicked for you</p>
              <h2 className="font-display text-3xl font-semibold text-bark">Fresh arrivals</h2>
            </div>
            <Link to="/products" className="text-sm text-forest-600 font-medium hover:underline hidden sm:block">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {productsLoading
              ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
              : products.map((p) => <ProductCard key={p._id} product={p} />)
            }
          </div>
          <div className="text-center mt-10">
            <Link to="/products" className="btn-outline inline-flex items-center gap-2">
              Explore all products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Earth Mitra ── */}
      <section className="section-pad">
        <div className="container-max">
          <div className="bg-forest-800 rounded-3xl p-8 sm:p-12 text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #74c69d, transparent 60%)" }}
            />
            <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-xs font-semibold text-forest-300 uppercase tracking-widest mb-3">Why choose us</p>
                <h2 className="font-display text-4xl font-semibold leading-tight mb-5">
                  Grown with care,<br />delivered with honesty.
                </h2>
                <p className="text-forest-100 leading-relaxed mb-7">
                  Every product on Earth Mitra is sourced directly from certified organic farms across India. No middlemen, no greenwashing — just pure produce you can trust.
                </p>
                <Link to="/products" className="bg-white text-forest-700 font-semibold px-6 py-3 rounded-xl hover:bg-forest-50 transition-colors inline-flex items-center gap-2">
                  Start shopping <ArrowRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: "200+", label: "Farming partners" },
                  { num: "500+", label: "Organic products" },
                  { num: "50K+", label: "Happy customers" },
                  { num: "100%", label: "Certified organic" },
                ].map(({ num, label }) => (
                  <div key={label} className="bg-forest-700/50 rounded-2xl p-5">
                    <p className="font-display text-3xl font-semibold text-white mb-1">{num}</p>
                    <p className="text-forest-200 text-sm">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="section-pad bg-white border-t border-stone-100">
        <div className="container-max text-center max-w-xl mx-auto">
          <Leaf size={28} className="text-forest-500 mx-auto mb-4" />
          <h2 className="font-display text-3xl font-semibold text-bark mb-3">Stay in the loop</h2>
          <p className="text-stone-500 text-sm mb-6">Get seasonal recipes, farm stories, and members-only offers straight to your inbox.</p>
          <form className="flex gap-2 max-w-sm mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="your@email.com" className="input flex-1" />
            <button type="submit" className="btn-primary whitespace-nowrap">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}