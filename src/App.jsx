// import { useState } from 'react'

// import './App.css'

// function App() {
  

//   return (
//     <>
//       <section id="center" className="bg-blue-100 h-screen flex items-center justify-center">
//         hello this is section
//       </section>

//     </>
//   )
// }

// export default App


// import { Routes, Route } from "react-router-dom";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<div className="text-green-600 text-2xl p-8">🌱 Earth Mitra is live!</div>} />
//     </Routes>
//   );
// }

// export default App;



import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/layout/ProtectedRoute";

import HomePage     from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import LoginPage    from "./pages/LoginPage";
import SignupPage   from "./pages/SignupPage";
import CartPage     from "./pages/CartPage";
import OrdersPage   from "./pages/OrdersPage";
import NotFoundPage from "./pages/NotFoundPage";

function WithLayout({ children }) {
  return <Layout>{children}</Layout>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login"  element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="/" element={<WithLayout><HomePage /></WithLayout>} />
      <Route path="/products" element={<WithLayout><ProductsPage /></WithLayout>} />
      <Route path="/cart" element={<WithLayout><CartPage /></WithLayout>} />
      <Route path="/orders" element={
        <WithLayout>
          <ProtectedRoute><OrdersPage /></ProtectedRoute>
        </WithLayout>
      } />
      <Route path="*" element={<WithLayout><NotFoundPage /></WithLayout>} />
    </Routes>
  );
}