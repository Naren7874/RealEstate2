import { Await, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import apiReq from "../../lib/apiReq";
import Chat from "../chat/chat";
import List from "../list/list";
import "./profile.scss";
import { Suspense, useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const data = useLoaderData();
  const location = useLocation();
  const [openChat, setOpenChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [chat, setChat] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);
        const res = await apiReq.get("/chats");
        setChats(res.data);
        
        // If openChat is provided, find and set that chat
        if (openChat) {
          const foundChat = res.data.find(c => c.id === openChat);
          if (foundChat) {
            setChat(foundChat);
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, [openChat]);

  useEffect(() => {
    if (location.state?.openChat) {
      setOpenChat(location.state.openChat);
    }
  }, [location.state]);
  
  const handleLogout = async () => {
    try {
      await apiReq.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="profile">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser?.avatar || "noprofile.png"} 
                alt=""
              />
            </span>
            <span>
              Username: <b>{currentUser?.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser?.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create new Post</button>
            </Link>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.userPosts} />}
            </Await>
          </Suspense>
        
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.savedPosts} />}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatcontainer">
        <div className="wrapper">
          <Chat openChatId={openChat} />
        </div>
      </div>
    </div>
  );
};

export default Profile;