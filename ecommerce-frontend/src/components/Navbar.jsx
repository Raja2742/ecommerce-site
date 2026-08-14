import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { searchProducts } from "../api/productService";
import "../styles/Navbar.css";
function Navbar() {

    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    const role = localStorage.getItem("role");
        const fetchSuggestions = async (keyword) => {

            if (!keyword.trim()) {

                setSuggestions([]);

                return;

            }

            try {

                const response = await searchProducts(keyword);

                setSuggestions(response.data);

            } catch (error) {

                console.log(error);

            }

        };

        useEffect(() => {

            const timer = setTimeout(() => {

                fetchSuggestions(search);

            }, 300);

            return () => {

                clearTimeout(timer);

            };

        }, [search]);

    const handleSearch = (e) => {

        if (e.key === "Enter") {

            navigate(`/products?search=${search}`);

        }

    };

    return (

        <nav className="navbar">

    <div className="nav-logo">

        <Link to="/">ShopEase</Link>

    </div>

    <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/products">Products</Link>

        <Link to="/orders">Orders</Link>
        {role=="ADMIN" && (<Link to="/addproduct">AddProduct</Link>)}
    </div>

    <div className="search-container">

        <input
            className="search-box"
            value={search}
            placeholder="Search products..."
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
        />

        {
            suggestions.length > 0 && (

                <div className="suggestions">

                    {

                        suggestions.map(product => (

                            <div
                                key={product.id}
                                className="suggestion"
                                onClick={() => {

                                    navigate(`/products/${product.id}`);

                                    setSuggestions([]);

                                    setSearch("");

                                }}
                            >

                                {product.name}

                            </div>

                        ))

                    }

                </div>

            )
        }

    </div>

    <div className="nav-links">

        <Link to="/cart">🛒 Cart</Link>

    </div>

</nav>

    );

}

export default Navbar;