import { useNavigate } from "react-router-dom";
import "../styles/HeroSection.css";

function HeroSection() {

    const navigate = useNavigate();

    return (

        <section className="hero">

            <div className="hero-content">

                <h1>

                    Shop Smarter,
                    <br />
                    Live Better

                </h1>

                <p>

                    Discover premium quality products
                    at the best prices with fast delivery.

                </p>

                <div className="hero-buttons">

                    <button
                        className="shop-btn"
                        onClick={() => navigate("/products")}
                    >

                        Shop Now

                    </button>

                    <button
                        className="explore-btn"
                        onClick={() => navigate("/products")}
                    >

                        Explore

                    </button>

                </div>

            </div>

            <div className="hero-image">

                <img
                    src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800"
                    alt="Shopping"
                />

            </div>

        </section>

    );

}

export default HeroSection;