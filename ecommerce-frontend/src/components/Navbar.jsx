import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { searchProducts } from "../api/productService";

function Navbar() {

    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

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

            <Link to="/">Home</Link>

            <Link to="/products">Products</Link>

            <Link to="/orders">Orders</Link>

            <input

                    className="search-box"

                    value={search}

                    placeholder="Search products..."

                    onChange={(e) => {

                        setSearch(e.target.value);

                    }}

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
            <Link to="/cart">Cart</Link>

        </nav>

    );

}

export default Navbar;