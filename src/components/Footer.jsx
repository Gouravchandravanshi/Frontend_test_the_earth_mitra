import { Link } from 'react-router';
export default function Footer() {
    return (<footer className="bg-[#2C1A0E] text-white pt-12 pb-6 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full border-2 border-[#C8952A] flex items-center justify-center bg-white/10">
                <svg viewBox="0 0 40 40" className="w-7 h-7">
                  <path d="M20 8 Q28 14 28 22 Q28 30 20 34 Q12 30 12 22 Q12 14 20 8Z" fill="#fff" opacity="0.8"/>
                  <circle cx="20" cy="20" r="4" fill="#C8952A"/>
                </svg>
              </div>
              <span className="font-bold text-base" style={{ fontFamily: 'Playfair Display, serif' }}>organic tattva</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">A natural way of life. Pure, organic, and ethically sourced food products for a healthier you and a healthier planet.</p>
            <div className="flex gap-3">
              {['Facebook', 'Instagram', 'YouTube', 'LinkedIn'].map(s => (<a key={s} href="#" className="text-xs text-gray-500 hover:text-white transition-colors">{s[0]}</a>))}
            </div>
          </div>
          {[
            { heading: 'Shop', links: [
                    { label: 'Atta & Flours', to: '/collections/atta-rice-dal' },
                    { label: 'Dal & Pulses', to: '/collections/atta-rice-dal' },
                    { label: 'Oils & Ghee', to: '/collections/masala-oil-more' },
                    { label: 'Healthy Snacks', to: '/collections/tea-coffee-healthy' },
                    { label: 'Combo Deals', to: '/collections/combo-deals' },
                ] },
            { heading: 'Company', links: [
                    { label: 'About Us', to: '/about' },
                    { label: 'Certifications', to: '/about' },
                    { label: 'Blog', to: '/blogs' },
                    { label: 'Recipes', to: '/blogs' },
                    { label: 'Careers', to: '/contact' },
                ] },
            { heading: 'Support', links: [
                    { label: 'Contact Us', to: '/contact' },
                    { label: 'FAQs', to: '/' },
                    { label: 'Shipping Policy', to: '/' },
                    { label: 'Return Policy', to: '/' },
                    { label: 'Track Order', to: '/' },
                ] },
        ].map(col => (<div key={col.heading}>
              <div className="font-semibold text-sm mb-4 text-[#C8952A]">{col.heading}</div>
              <ul className="space-y-2.5">
                {col.links.map(link => (<li key={link.label}>
                    <Link to={link.to} className="text-xs text-gray-400 hover:text-white transition-colors">{link.label}</Link>
                  </li>))}
              </ul>
            </div>))}
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">© 2026 Organic Tattva. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>);
}
