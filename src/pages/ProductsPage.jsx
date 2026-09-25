import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { useGetProductsQuery } from "../services/productApi";
import { useGetCategoriesQuery } from "../services/categoryApi";
import ProductCard from "../components/product/ProductCard";
import ProductSkeleton from "../components/product/ProductSkeleton";

const SORT_OPTIONS = [
  { value: "newest",     label: "Newest first" },
  { value: "price_asc",  label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
  { value: "rating",     label: "Top rated" },
];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const search      = searchParams.get("search") || "";
  const category    = searchParams.get("category") || "";
  const minPrice    = searchParams.get("minPrice") || "";
  const maxPrice    = searchParams.get("maxPrice") || "";
  const eco         = searchParams.get("eco_certified") || "";
  const sort        = searchParams.get("sort") || "newest";
  const page        = parseInt(searchParams.get("page") || "1");

  const { data, isLoading } = useGetProductsQuery({
    search, category, minPrice, maxPrice,
    eco_certified: eco, sort, page, limit: 12,
  });
  const { data: categories } = useGetCategoriesQuery();

  const products   = data?.products || [];
  const totalPages = data?.totalPages || 1;
  const total      = data?.total || 0;

  const setParam = (key, val) => {
    const p = new URLSearchParams(searchParams);
    if (val) p.set(key, val); else p.delete(key);
    p.delete("page");
    setSearchParams(p);
  };

  const clearFilters = () => setSearchParams({});

  const hasFilters = search || category || minPrice || maxPrice || eco;

  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-stone-100">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-display text-2xl font-semibold text-bark">
                {search ? `Results for "${search}"` : "All Products"}
              </h1>
              {!isLoading && (
                <p className="text-sm text-stone-400 mt-0.5">{total} products found</p>
              )}
            </div>
            <div className="flex items-center gap-3">
              {hasFilters && (
                <button onClick={clearFilters} className="text-xs text-red-500 hover:underline flex items-center gap-1">
                  <X size={12} /> Clear filters
                </button>
              )}
              <select
                value={sort}
                onChange={(e) => setParam("sort", e.target.value)}
                className="input py-2 text-sm w-auto"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <button
                onClick={() => setFiltersOpen((p) => !p)}
                className="lg:hidden btn-outline py-2 px-3 flex items-center gap-2 text-sm"
              >
                <SlidersHorizontal size={16} /> Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-max px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        {/* Sidebar filters */}
        <aside className={`
          ${filtersOpen ? "fixed inset-0 z-50 bg-black/40" : "hidden"} lg:block lg:static lg:bg-transparent
        `} onClick={() => setFiltersOpen(false)}>
          <div
            className="w-64 bg-white rounded-2xl border border-stone-100 p-6 space-y-6 flex-shrink-0 h-fit sticky top-24 lg:block"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="text-sm font-semibold text-bark mb-3">Category</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value=""
                    checked={!category}
                    onChange={() => setParam("category", "")}
                    className="accent-forest-600"
                  />
                  <span className="text-sm text-stone-600">All categories</span>
                </label>
                {categories?.map((c) => (
                  <label key={c._id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={c._id}
                      checked={category === c._id}
                      onChange={() => setParam("category", c._id)}
                      className="accent-forest-600"
                    />
                    <span className="text-sm text-stone-600">{c.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-bark mb-3">Price range</h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setParam("minPrice", e.target.value)}
                  className="input py-2 text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setParam("maxPrice", e.target.value)}
                  className="input py-2 text-sm"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-bark mb-3">Certification</h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={eco === "true"}
                  onChange={(e) => setParam("eco_certified", e.target.checked ? "true" : "")}
                  className="accent-forest-600"
                />
                <span className="text-sm text-stone-600">Eco certified only</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🌿</p>
              <h3 className="font-display text-xl font-semibold text-bark mb-2">No products found</h3>
              <p className="text-stone-400 text-sm">Try adjusting your filters or search term.</p>
              <button onClick={clearFilters} className="btn-primary mt-6 mx-auto">Clear filters</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((p) => <ProductCard key={p._id} product={p} />)}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        const params = new URLSearchParams(searchParams);
                        params.set("page", p);
                        setSearchParams(params);
                      }}
                      className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                        p === page
                          ? "bg-forest-600 text-white"
                          : "bg-white border border-stone-200 text-stone-600 hover:border-forest-400"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}