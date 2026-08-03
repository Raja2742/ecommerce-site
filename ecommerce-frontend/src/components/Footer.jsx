import { Link } from "react-router-dom";

import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt
} from "react-icons/fa";

import "../styles/Footer.css";

function Footer() {

    return (

        <footer className="footer">

            <div className="footer-container">

                <div className="footer-section">

                    <h2>E-Commerce</h2>

                    <p>

                        Quality products at affordable prices.
                        Shop with confidence.

                    </p>

                </div>

                <div className="footer-section">

                    <h3>Quick Links</h3>

                    <Link to="/">Home</Link>

                    <Link to="/products">Products</Link>

                    <Link to="/cart">Cart</Link>

                    <Link to="/orders">Orders</Link>

                </div>

                <div className="footer-section">

                    <h3>Contact</h3>

                    <p>

                        <FaEnvelope />

                        support@shop.com

                    </p>

                    <p>

                        <FaPhone />

                        +91 9876543210

                    </p>

                    <p>

                        <FaMapMarkerAlt />

                        Chennai, India

                    </p>

                </div>

                <div className="footer-section">

                    <h3>Follow Us</h3>

                    <div className="social-icons">

                        <FaFacebook />

                        <FaInstagram />

                        <FaTwitter />

                    </div>

                </div>

            </div>

            <div className="footer-bottom">

                © 2026 E-Commerce. All Rights Reserved.

            </div>

        </footer>

    );

}

export default Footer;