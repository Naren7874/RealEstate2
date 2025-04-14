import "./Slider.scss";
import { useState, useEffect } from "react";

const Slider = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Handle keyboard navigation
  useEffect(() => {
    if (imageIndex === null) return;
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setImageIndex(null);
      } else if (e.key === 'ArrowLeft') {
        changeslide(-1);
      } else if (e.key === 'ArrowRight') {
        changeslide(1);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [imageIndex]);
  
  const changeslide = (direction) => {
    setIsLoading(true);
    setTimeout(() => {
      setImageIndex(prev => {
        if (direction === -1) {
          return prev === 0 ? images.length - 1 : prev - 1;
        } else {
          return prev === images.length - 1 ? 0 : prev + 1;
        }
      });
      setIsLoading(false);
    }, 100);
  };
  
  const openImage = (index) => {
    setImageIndex(index);
    document.body.style.overflow = 'hidden';
  };
  
  const closeImage = () => {
    setImageIndex(null);
    document.body.style.overflow = 'auto';
  };
  
  if (!images || images.length === 0) {
    return <div className="slider">No images available</div>;
  }

  return (
    <div className="slider">
      {imageIndex !== null && (
        <div className="fullslider">
          <div className="arrow" onClick={() => changeslide(-1)}>
            <img src="/arrow.png" alt="Previous" />
          </div>
          
          <div className="imgcontainer">
            {!isLoading && <img src={images[imageIndex]} alt={`Slide ${imageIndex + 1}`} />}
          </div>
          
          <div className="arrow" onClick={() => changeslide(1)}>
            <img src="/arrow.png" alt="Next" className="right" />
          </div>
          
          <div className="close" onClick={closeImage}>×</div>
        </div>
      )}
      
      <div className="bigImage">
        <img 
          src={images[0]} 
          alt="Main" 
          onClick={() => openImage(0)}
          loading="lazy"
        />
      </div>
      
      <div className="smallImage">
        {images.slice(1).map((image, index) => (
          <img 
            src={image} 
            alt={`Thumbnail ${index + 1}`} 
            key={index} 
            onClick={() => openImage(index + 1)}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;