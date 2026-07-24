
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './pages/Register'
import Login from './pages/Login';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  

 return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        
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
