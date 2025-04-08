import { useState } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import apiReq from "../../lib/apiReq";
import toast from "react-hot-toast";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    const registerToast = toast.loading("Creating your account...");

    try {
      await apiReq.post("auth/register", {
        username,
        email,
        password,
      });

      toast.success("Account created successfully!", { id: registerToast });
      navigate("/login");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed.";
      toast.error(errorMsg, { id: registerToast });
      setError(errorMsg);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleRegister}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" required />
          <input name="email" type="email" placeholder="Email" required />
          <input name="password" type="password" placeholder="Password" required />
          
          <button type="submit" disabled={isLoading}>
            {!isLoading ? "Register" : "Loading..."}
          </button>

          {error && <span className="error">{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="Background" />
      </div>
    </div>
  );
}

export default Register;
