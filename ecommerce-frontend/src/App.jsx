
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './pages/Register'
import Login from './pages/Login';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import ProtectedRoute from './components/ProtectedRoute';
import EditProduct from './pages/EditProduct';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import AdminDashboard from "./pages/AdminDashboard";
function App() {
  

 return (
   <BrowserRouter>
      <Routes>
        

        <Route path="/login" element={<Login />} />
        <Route
    path="/admin"
    element={<AdminDashboard />}
/>
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route
            path="/products/edit/:id"
            element={<EditProduct />}
        />

        <Route
            path="/"
            element={<Home />}
        />
        <Route

              path="/addproduct"

              element={

                  <ProtectedRoute>

                      <AddProduct />

                  </ProtectedRoute>

              }

          />
      </Routes>
    </BrowserRouter>
  );
}

export default App
