
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './pages/Register'
import Login from './pages/Login';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
function App() {
  

 return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/addproducts" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
