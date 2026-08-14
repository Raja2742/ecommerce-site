import HeroSection from "../components/HeroSection";
import FeaturedProducts from "../components/FeaturedProducts";
import CategorySection from "../components/CategorySection";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/Home.css";

function Home() {

    return (

        <div className="home">
            <Navbar/>
            
            <HeroSection />

            <FeaturedProducts />

            <CategorySection />

            <WhyChooseUs />

            <Footer />

        </div>

    );

}

export default Home;