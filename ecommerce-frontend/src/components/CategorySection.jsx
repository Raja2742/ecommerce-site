import { useNavigate } from "react-router-dom";
import "../styles/CategorySection.css";

function CategorySection() {

    const navigate = useNavigate();

    const categories = [

        {
            name: "Electronics",
            icon: "💻"
        },

        {
            name: "Fashion",
            icon: "👕"
        },

        {
            name: "Home",
            icon: "🏠"
        },

        {
            name: "Sports",
            icon: "⚽"
        }

    ];

    const handleCategoryClick = (category) => {

        navigate(`/products?category=${category}`);

    };

    return (

        <section className="category-section">

            <h2>Shop by Category</h2>

            <div className="category-grid">

                {

                    categories.map(category => (

                        <div
                            key={category.name}
                            className="category-card"
                            onClick={() =>
                                handleCategoryClick(category.name)
                            }
                        >

                            <div className="category-icon">

                                {category.icon}

                            </div>

                            <h3>

                                {category.name}

                            </h3>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default CategorySection;