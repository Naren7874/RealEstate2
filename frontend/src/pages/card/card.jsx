import { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import apiReq from '../../lib/apiReq';
import toast from 'react-hot-toast';
import './card.scss';

const Card = ({ item }) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [saved, setSaved] = useState(item?.isSaved || false);

  const handleSave = async () => {
    const previousState = saved;
    setSaved(!saved);
    
    if (!currentUser) {
      setSaved(previousState);
      navigate("/login");
      return;
    }

    try {
      await apiReq.post("/users/save", { postId: item.id });
      toast.success(
        saved ? "Post removed from saved list" : "Post saved successfully"
      );
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Failed to save post");
      setSaved(previousState);
    }
  };

  return (
    <div className='card'>
      <Link to={`/${item.id}`} className='imagecontainer'>
        <img 
          src={item.img?.[0] || '/placeholder.jpg'} 
          alt={item.title || 'Property image'} 
        />
      </Link>
      
      <div className="textcontainer">
        <h2 className='title'>
          <Link to={`/${item.id}`} className='title2'>{item.title}</Link>
        </h2>
        
        <p className='address'>
          <img src="/pin.png" alt="Location pin" />
          <span>{item.address}</span>
        </p>
        
        <p className="price">${item.price?.toLocaleString()}</p>
        
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="Bedrooms" />
              <span>{item.bedroom} bedroom{item.bedroom !== 1 ? 's' : ''}</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="Bathrooms" />
              <span>{item.bathroom} bathroom{item.bathroom !== 1 ? 's' : ''}</span>
            </div>
          </div>
          
          <div className="icons">
            <div 
              className="icon" 
              onClick={handleSave}
              style={{ backgroundColor: saved ? "#fece51" : "white" }}
            >
              <img src="/save.png" alt={saved ? "Unsave" : "Save"} />
            </div>
            <div className="icon">
              <img src="/chat.png" alt="Chat" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;