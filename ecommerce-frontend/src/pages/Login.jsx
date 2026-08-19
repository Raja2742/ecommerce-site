import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Login.css";
import { Link } from "react-router-dom";
import { login } from "../api/authservice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
  
  

    email:"",
    password:""
    });

  const navigate = useNavigate();
  
  const validateForm = () => {
        let newErrors = {};

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

       

        if (email.trim() === "") {
            newErrors.email = "Email is required";
        } else if (!emailPattern.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (password.trim() === "") {
            newErrors.password = "Password is required";
        } else if (password.trim().length < 8 || password.trim().length > 24) {
            newErrors.password = "Password must be at least 8 And at most 24 characters";
        }

        
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


  const handleSubmit = async(e) => {
              e.preventDefault();
  
              if(!validateForm()){
              return;
            }
            
              const loginData = {
                email,
                password
              }

              
              try {

              const response = await login(loginData);
                
                if (response.data=="Invalid email or password")
                  alert("Invalid email or password... or Register First");
              if (response.data.token) {

                  alert("Login Successful");

                  localStorage.setItem("token", response.data.token);
                  localStorage.setItem("role", response.data.role);
                  localStorage.setItem("email", response.data.email);

                  if (response.data.role === "ADMIN") {
                      navigate("/admin");
                  } else {
                      navigate("/");
                  }
              }

          } catch (error) {

              console.log(error.response?.data);

              if (error.response?.status === 401) {

                  alert("Invalid email or password...");

              }// else if (error.response?.status === 403) {

              //     alert("Access denied");

              // } else 
                {

                  alert("Something went wrong. Please try again.");

              }
          }
          };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Welcome Back 👋</h1>
        <p className="subtitle">
          Login to continue your shopping experience.
        </p>

        <form className="login-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Error Message */}
            {errors.email && (
            <p className="error-message">{errors.email}</p>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>

            <div className="password-container">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {showPassword ? (
                <FaEyeSlash
                  className="eye-icon"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaEye
                  className="eye-icon"
                  onClick={() => setShowPassword(true)}
                />
              )}

            </div>

            {/* Error Message */}
            {errors.password && (
            <p className="error-message">{errors.password}</p>
            )}
          </div>

          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" />
              Remember Me
            </label>

            <span className="forgot-password">
              Forgot Password?
            </span>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          <p className="register-text">
            Don't have an account?{" "}
            <Link to="/register" className="register-link">
                Register
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Login;