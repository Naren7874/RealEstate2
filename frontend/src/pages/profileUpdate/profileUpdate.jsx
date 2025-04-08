import { useContext, useRef, useState } from "react";
import "./profileUpdate.scss";
import { AuthContext } from "../../context/AuthContext";
import apiReq from "../../lib/apiReq"; 
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ProfileUpdate() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    const updateToast = toast.loading("Updating profile...");

    try {
      const res = await apiReq.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
        avatar: avatar[0],
      });
      updateUser(res.data);
      toast.success("Profile updated successfully!", { id: updateToast });
      navigate("/profile");
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.message || "Something went wrong";
      toast.error(errorMsg, { id: updateToast });
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar([reader.result]);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatar([]);
      toast.error("Please select a valid image file");
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
          <button type="submit">
            {loading ? "Loading..." : "Update"}
          </button>
          {error && <span className="error">{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={avatar[0] || currentUser.avatar || "/noProfile.png"}
          alt="avatar"
          className="avatar"
        />
        <div>
          <div
            className="bg-blue-800 text-white font-semibold px-10 py-5 cursor-pointer border-none rounded-md"
            onClick={() => fileRef.current.click()}
          >
            Upload
          </div>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileRef}
            onChange={handleImageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileUpdate;
