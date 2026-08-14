
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAdminDashboard } from "../api/adminService";

import "../styles/AdminDashboard.css";
import { useNavigate } from "react-router-dom";


function AdminDashboard() {

    const navigate=useNavigate();

    

    const [dashboard, setDashboard] = useState({

        totalProducts: 0,

        totalOrders: 0,

        totalUsers: 0,

        totalRevenue: 0

    });


    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {
        
        if(localStorage.getItem("role")!=="ADMIN"){
        alert("Admin only allowed");
        navigate("/");
        
    }
        fetchDashboard();

    }, []);


    const fetchDashboard = async () => {

        try {

            setLoading(true);

            const response = await getAdminDashboard();

            setDashboard(response.data);

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to load dashboard data."
            );

        } finally {

            setLoading(false);

        }

    };


    if (loading) {

        return (

            <div className="dashboard-loading">

                Loading dashboard...

            </div>

        );

    }


    if (error) {

        return (

            <div className="dashboard-error">

                {error}

            </div>

        );

    }


    return (

        <div className="admin-dashboard">


            {/* Sidebar */}

            <aside className="admin-sidebar">

                <div className="admin-logo">

                    ShopEase Admin

                </div>


                <nav className="admin-nav">

                    <Link to="/admin">
                        Dashboard
                    </Link>

                    <Link to="/products">
                        Products
                    </Link>

                    <Link to="/admin/orders">
                        Orders
                    </Link>

                    <Link to="/admin/users">
                        Users
                    </Link>

                    <Link to="/addproduct">
                        Add Product
                    </Link>

                </nav>

            </aside>


            {/* Main Content */}

            <main className="admin-main">


                {/* Header */}

                <div className="admin-header">

                    <div>

                        <h1>
                            Dashboard
                        </h1>

                        <p>
                            Welcome back, Admin
                        </p>

                    </div>

                </div>


                {/* Statistics */}

                <div className="dashboard-stats">


                    <div className="stat-card">

                        <div className="stat-icon">
                            📦
                        </div>

                        <div>

                            <p>
                                Total Products
                            </p>

                            <h2>
                                {dashboard.totalProducts}
                            </h2>

                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon">
                            🛒
                        </div>

                        <div>

                            <p>
                                Total Orders
                            </p>

                            <h2>
                                {dashboard.totalOrders}
                            </h2>

                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon">
                            👥
                        </div>

                        <div>

                            <p>
                                Total Users
                            </p>

                            <h2>
                                {dashboard.totalUsers}
                            </h2>

                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon">
                            ₹
                        </div>

                        <div>

                            <p>
                                Total Revenue
                            </p>

                            <h2>
                                ₹{dashboard.totalRevenue.toLocaleString("en-IN")}
                            </h2>

                        </div>

                    </div>


                </div>


                {/* Quick Actions */}

                <section className="admin-quick-actions">

                    <h2>
                        Quick Actions
                    </h2>


                    <div className="quick-action-grid">

                        <Link
                            to="/products"
                            className="quick-action-card"
                        >

                            <span>📦</span>

                            <div>

                                <h3>
                                    Manage Products
                                </h3>

                                <p>
                                    Add, edit or remove products
                                </p>

                            </div>

                        </Link>


                        <Link
                            to="/orders"
                            className="quick-action-card"
                        >

                            <span>🛒</span>

                            <div>

                                <h3>
                                    Manage Orders
                                </h3>

                                <p>
                                    View and update customer orders
                                </p>

                            </div>

                        </Link>


                        <Link
                            to="/users"
                            className="quick-action-card"
                        >

                            <span>👥</span>

                            <div>

                                <h3>
                                    Manage Users
                                </h3>

                                <p>
                                    View registered users
                                </p>

                            </div>

                        </Link>

                    </div>

                </section>


            </main>

        </div>

    );

}


export default AdminDashboard;
