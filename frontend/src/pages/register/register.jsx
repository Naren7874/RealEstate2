import { useState } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import apiReq from "../../lib/apiReq";

function Register() {

  const [error , setError] = useState("");
  const [isLoading , setIsLoading] = useState(false);
  const navigate = useNavigate();

 const handleRegister = async(e)=>{

    e.preventDefault(); // Prevents page refresh  

    setError("")
    setIsLoading(true)
    const formData = new FormData(e.target);
    const username  = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const res = apiReq.post("auth/register", {
        username,
        email, 
        password
      }) 

      navigate("/login")
      
    } catch (error){
      console.log(error.message)
    } finally{
      setIsLoading(false)
    }

  }

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleRegister}>
          <h1>Create an Account</h1>
          <input
            name="username"
            type="text"
            placeholder="Username"
          />
          <input
            name="email"
            type="text"
            placeholder="Email"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"  
          />
          <button type="submit" disabled={isLoading}>{
            !isLoading ? "Register" : "loading..."}
        </button>
          {
            error && <span>{error}</span>
          }
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
