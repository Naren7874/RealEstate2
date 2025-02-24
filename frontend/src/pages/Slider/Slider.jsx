import "./Slider.scss";
import { singlePostData } from "../../lib/dummydata";
import { useState } from "react";
const Slider = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(null);
  const changeslide1 = (index) =>{
    if(index === 0){
        setImageIndex(images.length-1)
    }
    else{
        setImageIndex(i => i-1);
    }
  }
  const changeslide2 = (index) =>{
    if(index === images.length-1){
        setImageIndex(0)
    }
    else{
        setImageIndex(i => i+1);
    }
  }
  return (
    <div className="slider">
      {imageIndex !== null && (
        <div className="fullslider">
          <div className="arrow">
            <img src="/arrow.png" alt="" onClick={() => changeslide1(imageIndex)}/>
          </div>
          <div className="imgcontainer">
            <img src={images[imageIndex]} alt="" />
          </div>
          <div className="arrow">
            <img src="/arrow.png" alt="" className="right" onClick={() => changeslide2(imageIndex)}/>
          </div>
          <div className="close" onClick={() => setImageIndex(null)}>X</div>
        </div>
      )}
      <div className="bigImage">
        <img src={images[0]} alt="" onClick={() => setImageIndex(0)}/>
      </div>
      <div className="smallImage">
        {images.slice(1).map((image, index) => (
          <img src={image} alt="" key={index} onClick={() => setImageIndex(index+1)}/>
        ))}
      </div>
    </div>
  );
};

export default Slider;
