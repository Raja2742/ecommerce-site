import "../styles/WhyChooseUs.css";

function WhyChooseUs() {

    const features = [

        {
            icon: "🚚",
            title: "Free Delivery",
            description: "Fast and free delivery on eligible orders."
        },

        {
            icon: "💳",
            title: "Secure Payment",
            description: "100% secure payment with trusted gateways."
        },

        {
            icon: "🔄",
            title: "Easy Returns",
            description: "Hassle-free returns within 7 days."
        },

        {
            icon: "⭐",
            title: "Best Quality",
            description: "Premium products at affordable prices."
        }

    ];

    return (

        <section className="why-choose-us">

            <h2>Why Choose Us</h2>

            <div className="feature-grid">

                {

                    features.map((feature, index) => (

                        <div
                            key={index}
                            className="feature-card"
                        >

                            <div className="feature-icon">

                                {feature.icon}

                            </div>

                            <h3>

                                {feature.title}

                            </h3>

                            <p>

                                {feature.description}

                            </p>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default WhyChooseUs;