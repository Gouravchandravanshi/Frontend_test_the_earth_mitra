import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { NAV_LINKS } from '../data';
export default function Navbar({ cartItems, onRemoveCart }) {
    const [searchOpen, setSearchOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const cartTotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
    return (<>
      {/* Announcement Bar */}
      <div className="bg-[#111111] text-white text-sm py-2 px-4 flex items-center justify-between">
        <button className="text-gray-400 hover:text-white">‹</button>
        <span className="tracking-wide text-xs sm:text-sm">Get 30% off on your Organic Grocery</span>
        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-white">›</button>
          <div className="hidden sm:flex items-center gap-2 ml-2">
            {['f', 'i', 'yt', 'in'].map(s => (<a key={s} href="#" className="text-gray-400 hover:text-white transition-colors text-xs font-bold">{s === 'f' ? 'f' : s === 'i' ? '📷' : s === 'yt' ? '▶' : 'in'}</a>))}
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-11 h-11 rounded-full border-2 border-[#C8952A] flex items-center justify-center bg-amber-50">
              <svg viewBox="0 0 40 40" className="w-8 h-8">
                <circle cx="20" cy="20" r="18" fill="#C8952A" opacity="0.15"/>
                <path d="M20 8 Q28 14 28 22 Q28 30 20 34 Q12 30 12 22 Q12 14 20 8Z" fill="#2D5A2E"/>
                <circle cx="20" cy="20" r="4" fill="#C8952A"/>
              </svg>
            </div>
            <div>
              <div className="text-[10px] text-gray-400 tracking-widest uppercase leading-none">TM</div>
              <div className="font-bold text-lg text-[#2C1A0E] leading-tight">organic tattva</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-5 text-sm font-medium text-[#2C1A0E]">
            {NAV_LINKS.map((link) => (<div key={link.label} className="relative group" onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)} onMouseLeave={() => setActiveDropdown(null)}>
                <Link to={link.path} className="flex items-center gap-1 py-1 hover:text-[#2D5A2E] transition-colors whitespace-nowrap">
                  {link.label}
                  {link.dropdown && (<svg className="w-3 h-3 opacity-60" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 4 L6 8 L10 4"/>
                    </svg>)}
                </Link>
                {link.dropdown && activeDropdown === link.label && link.items && (<div className="absolute top-full left-0 bg-white border border-gray-100 shadow-lg rounded-b-lg min-w-[200px] py-2 z-50">
                    {link.items.map(item => (<Link key={item} to={link.path} className="block px-4 py-2 text-sm text-[#2C1A0E] hover:bg-gray-50 hover:text-[#2D5A2E]">
                        {item}
                      </Link>))}
                  </div>)}
              </div>))}
            <Link to="/about" className="py-1 hover:text-[#2D5A2E] transition-colors whitespace-nowrap text-sm font-medium text-[#2C1A0E]">About</Link>
            <Link to="/contact" className="py-1 hover:text-[#2D5A2E] transition-colors whitespace-nowrap text-sm font-medium text-[#2C1A0E]">Contact</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button onClick={() => setSearchOpen(true)} className="text-[#2C1A0E] hover:text-[#2D5A2E] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            <button onClick={() => setLoginOpen(true)} className="text-[#2C1A0E] hover:text-[#2D5A2E] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </button>
            <button onClick={() => setCartOpen(true)} className="relative text-[#2C1A0E] hover:text-[#2D5A2E] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartItems.length > 0 && (<span className="absolute -top-1.5 -right-1.5 bg-[#C0392B] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartItems.reduce((s, i) => s + i.qty, 0)}
                </span>)}
            </button>
          </div>
        </div>
      </nav>

      {/* Rewards Tab */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
        <button className="bg-[#2D5A2E] text-white text-xs font-semibold flex flex-col items-center gap-1 px-2 py-4 rounded-l-lg shadow-lg">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
          </svg>
          <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.08em' }}>Rewards</span>
        </button>
      </div>

      {/* WhatsApp */}
      <a href="#" className="fixed bottom-6 left-4 z-40 flex items-center gap-2 bg-[#2D5A2E] text-white text-sm font-semibold px-4 py-3 rounded-full shadow-lg hover:bg-[#1e3d1f] transition-colors">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="hidden sm:inline">Order From WhatsApp</span>
      </a>

      {/* Search Overlay */}
      {searchOpen && (<div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col">
          <div className="max-w-3xl mx-auto w-full px-4 pt-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-gray-500 tracking-widest uppercase">Switch to Purity, Switch to Organic</span>
              <button onClick={() => setSearchOpen(false)} className="text-gray-400 hover:text-gray-700 text-2xl">×</button>
            </div>
            <div className="flex items-center border-b-2 border-[#2D5A2E] pb-3 gap-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input autoFocus value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') {
            navigate('/products');
            setSearchOpen(false);
        } }} placeholder="Search for articles" className="flex-1 text-lg outline-none bg-transparent text-[#2C1A0E] placeholder-gray-400"/>
            </div>
          </div>
        </div>)}

      {/* Cart Drawer */}
      {cartOpen && (<div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setCartOpen(false)}/>
          <div className="relative bg-white w-full max-w-sm h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-bold text-[#2C1A0E]">Your Cart</h2>
              <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-gray-700 text-xl">×</button>
            </div>
            {cartItems.length === 0 ? (<div className="flex-1 flex flex-col items-center justify-center gap-4 text-gray-400">
                <svg className="w-20 h-20 opacity-30" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                <p className="text-sm font-medium">Your Cart is Empty</p>
                <button onClick={() => { setCartOpen(false); navigate('/products'); }} className="text-xs text-[#2D5A2E] font-semibold border border-[#2D5A2E] px-4 py-2 rounded hover:bg-[#2D5A2E] hover:text-white transition-colors">
                  CONTINUE SHOPPING
                </button>
              </div>) : (<>
                <div className="bg-amber-50 px-5 py-2 text-xs text-amber-800 font-medium">
                  Unlock 5 FREE Gifts on Orders Above ₹3,999
                </div>
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                  {cartItems.map(item => (<div key={item.id} className="flex items-center gap-3">
                      <img src={item.img} alt={item.name} className="w-14 h-14 object-cover rounded border border-gray-100"/>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#2C1A0E] line-clamp-2">{item.name}</p>
                        <p className="text-sm font-bold text-[#2D5A2E] mt-1">₹{item.price * item.qty}</p>
                      </div>
                      <button onClick={() => onRemoveCart(item.id)} className="text-gray-300 hover:text-red-400 transition-colors text-lg ml-2">×</button>
                    </div>))}
                </div>
                <div className="border-t border-gray-100 px-5 py-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-bold">₹{cartTotal}</span>
                  </div>
                  <button className="w-full bg-[#2C1A0E] text-white font-bold py-3 rounded mt-3 hover:bg-black transition-colors tracking-wide text-sm">
                    CHECKOUT NOW
                  </button>
                </div>
              </>)}
          </div>
        </div>)}

      {/* Login Modal */}
      {loginOpen && (<div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setLoginOpen(false)}/>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6">
            <button onClick={() => setLoginOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">×</button>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full border border-[#C8952A] flex items-center justify-center bg-amber-50">
                <svg viewBox="0 0 40 40" className="w-6 h-6">
                  <path d="M20 8 Q28 14 28 22 Q28 30 20 34 Q12 30 12 22 Q12 14 20 8Z" fill="#2D5A2E"/>
                  <circle cx="20" cy="20" r="4" fill="#C8952A"/>
                </svg>
              </div>
              <span className="font-bold text-[#2C1A0E]">organic tattva</span>
            </div>
            <h3 className="font-bold text-lg text-[#2C1A0E] mb-1">Login here!</h3>
            <p className="text-sm text-gray-500 mb-4">Login now to avail best offers!</p>
            <div className="flex gap-2 mb-3">
              <span className="border border-gray-200 rounded px-3 py-2 text-sm text-gray-500">+91</span>
              <input placeholder="Enter Mobile Number" className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:border-[#2D5A2E]"/>
            </div>
            <button className="w-full bg-[#2D5A2E] text-white font-semibold py-2.5 rounded text-sm hover:bg-[#1e3d1f] transition-colors">Submit</button>
            <p className="text-center text-xs text-gray-400 mt-3">powered by <span className="font-semibold">Kale Paise</span></p>
          </div>
        </div>)}
    </>);
}
