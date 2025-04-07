import { Link } from "react-router-dom";
import "./login.scss";
import { useContext, useState } from "react";
import apiReq from "../../lib/apiReq";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
 
function Login() {
 
  const [error,setError] = useState("");
  const [isLoading,setIsLoading] = useState(false);

  const {updateUser} = useContext(AuthContext)  

  const navigate = useNavigate();
  const handleSubmit = async(e) =>
  {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const formData = new FormData(e.target)
    const username = formData.get("username");
    const password = formData.get("password");

    try{
      //post - input - username and password
      const res = await apiReq.post("/auth/login",{
        username,
        password
      }
      );
      // console.log(res)(prints data)
      //to store data and display on browser(local storage)
      // localStorage.setItem("user",JSON.stringify(res.data));

      updateUser(res.data)
      navigate("/")

    }
    catch(error)
    {
      setError(error.response.data.message);
      console.log(error)
    }
    finally{
      //to stop loading at last
      setIsLoading(false);
    }

    }
    
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text" 
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button disabled={isLoading}>
            {!isLoading ? "Login" : "loading..."}
          </button>
          {error && <span>{error}</span>}
          
          <Link to="/register"> Do not have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="Background" />
      </div>
    </div>
  );  
}

export default Login;
