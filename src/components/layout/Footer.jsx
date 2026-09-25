import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";
import {
    FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-bark text-stone-300 font-body">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              {/* <div className="w-8 h-8 bg-forest-500 rounded-lg flex items-center justify-center">
                <Leaf size={16} className="text-white" />
              </div>
              <span className="font-display font-semibold text-lg text-white">
                Earth <span className="text-forest-400">Mitra</span>
              </span> */}

            


            </Link>
            <p className="text-sm leading-relaxed text-stone-400 mb-5">
              Pure, certified organic products sourced directly from Indian farmers. Good for you, good for the earth.
            </p>
            <div className="flex gap-3">
              {[FaInstagram, FaFacebook, FaTwitter, FaLinkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-stone-700 rounded-lg flex items-center justify-center hover:bg-forest-600 transition-colors"
                >
                  <Icon size={16} className="text-stone-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2.5 text-sm">
              {["All Products", "Organic Foods", "Natural Skincare", "Herbal Teas", "Eco Household"].map((l) => (
                <li key={l}>
                  <Link to="/products" className="hover:text-forest-400 transition-colors">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5 text-sm">
              {["About Us", "Our Farmers", "Certifications", "Blog", "Careers"].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-forest-400 transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Help</h4>
            <ul className="space-y-2.5 text-sm">
              {["Track Order", "Returns & Refunds", "Shipping Policy", "Contact Us", "FAQ"].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-forest-400 transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Earth Mitra. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-forest-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-forest-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}