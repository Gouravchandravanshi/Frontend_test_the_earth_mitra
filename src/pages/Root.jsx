import { useState } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
export default function Root() {
    const [cartItems, setCartItems] = useState([]);
    function addToCart(product) {
        setCartItems(prev => {
            const existing = prev.find(i => i.id === product.id);
            if (existing)
                return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
            return [...prev, { ...product, qty: 1 }];
        });
    }
    function removeFromCart(id) {
        setCartItems(prev => prev.filter(i => i.id !== id));
    }
    return (<div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Navbar cartItems={cartItems} onRemoveCart={removeFromCart}/>
      <main className="flex-1">
        <Outlet context={{ addToCart }}/>
      </main>
      <Footer />
    </div>);
}
