import { Await, useLoaderData, useNavigate } from "react-router-dom";
import apiReq from "../../lib/apiReq";
import Chat from "../chat/chat";
import List from "../list/list";
import Listpage from "../listPages/listpage";
import "./profile.scss";
import { Suspense, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {Link} from "react-router-dom";

const Profile = () => {

  const {updateUser,currentUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const data = useLoaderData();
  const handleLogout = async ()=>
  {
    try{
    //no input
      await apiReq.post("/auth/logout");
      updateUser(null);
      navigate("/");
    }
    catch(err)
    {
      console.log(err.resonse.data.message)
    }

  }
  return (
   (
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
              src={currentUser.avatar || "noprofile.png"} 
                alt=""
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
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
            {(postResponse)=>  <List posts={postResponse.data.userPosts}/>
            }
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
            {(postResponse)=>  <List posts={postResponse.data.savedPosts}/>
            }
          </Await>

        </Suspense>
        </div>
      </div>
      <div className="chatcontainer">
        <div className="wrapper">
            <Chat/>
        </div>
      </div>
    </div>
    )
  );
};

export default Profile;
