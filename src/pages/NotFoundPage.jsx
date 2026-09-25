import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center text-center px-4">
      <Leaf size={48} className="text-forest-300 mb-4" />
      <h1 className="font-display text-6xl font-semibold text-bark mb-2">404</h1>
      <p className="font-display text-xl text-stone-500 mb-2">Page not found</p>
      <p className="text-stone-400 text-sm mb-8 max-w-xs">
        This page seems to have wandered off into the forest. Let's get you back.
      </p>
      <Link to="/" className="btn-primary">Go home</Link>
    </div>
  );
}