import { useContext, useRef, useState } from "react";
import "./profileUpdate.scss";
import { AuthContext } from "../../context/AuthContext";
import apiReq from "../../lib/apiReq";
import { useNavigate } from "react-router-dom";


function profileUpdate() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);

  const fileRef = useRef(null)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
        avatar:avatar[0]
      });
      updateUser(res.data);
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span>error</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar[0] || currentUser.avatar || "/noProfile.png"} alt="" className="avatar" />
        <div>
          <div className="bg-blue-800 text-white font-semibold px-10 py-5 cursor-pointer border-none rounded-md" onClick={()=>fileRef.current.click()} >Upload</div>
          <input type="file" hidden="true" ref={fileRef}/>
        </div>
      </div>
    </div>
  );
}

export default profileUpdate;