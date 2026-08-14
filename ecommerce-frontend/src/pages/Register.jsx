import { useState } from "react";
import "../styles/Register.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { register } from "../api/authservice";

function Register() {

    const[showPassword,setShowPassword]=useState(false);

    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[confirmpass,setConfirmpass]=useState("");

    const [errors, setErrors] = useState({
    name:"",
    email:"",
    password:"",
    confirmpass:""
    });


    const validateForm = () => {
        let newErrors = {};

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (name.trim() === "") {
            newErrors.name = "Full Name is required";
        } else if (name.trim().length < 3) {
            newErrors.name = "Full Name must be at least 3 characters";
        }

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

        if(password != confirmpass){
            newErrors.confirmpass="Password not matching"
        }
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async(e) => {
            e.preventDefault();

            if(!validateForm()){
              return;
            }

            const registerData = {
              name,
              email,
              password,
              confirmpass
            }
            try {

        const response = await register(registerData);

            alert("Register Succesfull");

            } catch (error) {

              alert("Register Failed");
                console.log(error.response.data);

            }
        };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1>Create Account</h1>
        <p className="subtitle">
          Create your account to start shopping with us.
        </p>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />

            {errors.name && (
            <p className="error-message">{errors.name}</p>
            )}
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            {errors.email && (
            <p className="error-message">{errors.email}</p>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-container">
                <input
                type={showPassword?"text":"password"}
                placeholder="Enter your password"
                value={password}
              onChange={(e)=>setPassword(e.target.value)}
                />
                {showPassword?
                <FaEyeSlash className="eye-icon" onClick={()=>setShowPassword(!showPassword)}/>
                :<FaEye className="eye-icon" onClick={()=>setShowPassword(!showPassword)}/>}
                
            </div>
            {errors.password && (
            <p className="error-message">{errors.password}</p>
            )}
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <div className="password-container">
                <input
              type={showPassword?"text":"password"}
              placeholder="Confirm your password"
              value={confirmpass}
              onChange={(e)=>setConfirmpass(e.target.value)}
            />
            {showPassword?
                <FaEyeSlash className="eye-icon" onClick={()=>setShowPassword(!showPassword)}/>
                :<FaEye className="eye-icon" onClick={()=>setShowPassword(!showPassword)}/>}
            </div>
            {errors.confirmpass && (
            <p className="error-message">{errors.confirmpass}</p>
            )}
          </div>

          <button type="submit" className="register-btn">
            Create Account
          </button>

          <p className="login-text">
            Already have an account?
            <Link to="/login" className="login-link">
                Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;