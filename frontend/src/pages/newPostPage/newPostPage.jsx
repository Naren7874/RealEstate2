import "./newPostPage.scss" 
import {useRef, useState} from "react"
//setting text using ReactQuill
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import apiReq from "../../lib/apiReq";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function NewPostPage() {
const [value,setValue] = useState("");
const [images,setImages] = useState([]);
const [error,setError] = useState("");
const fileRef = useRef(null);
const navigate = useNavigate();
const [loading,setLoading] = useState(false);

const handleSubmit = async (e) =>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    const createPostToast = toast.loading("Creating new post...");
    try{
        const res = await apiReq.post("/posts",{
            postData:{
                title:inputs.title,
                price: parseInt(inputs.price),
                address:inputs.address,
                city:inputs.city,
                bedroom: parseInt(inputs.bedroom),
                bathroom:parseInt(inputs.bathroom),
                type:inputs.type,
                property:inputs.property,
                latitude:inputs.latitude,
                longitude:inputs.longitude,
                img:images
            },
            postDetail:{
                desc:value,
                utilities:inputs.utilities,
                pet:inputs.pet,
                income:inputs.income,
                size:parseInt(inputs.size),
                school:parseInt(inputs.school),
                bus:parseInt(inputs.bus),
                restaurant:parseInt(inputs.restaurant)
            }
        })
        toast.success("Post created successfully!", { id: createPostToast });
        navigate("/"+res.data.id)
        }
        catch(err)
        {
            console.log(err)
            const errorMsg = err.response?.data?.message || "Something went wrong";
            toast.error(errorMsg, { id: createPostToast });
            setError(error)
        }
}

const handleImageChange = (e) => {
  const files = Array.from(e.target.files);
  const maxImages = 4;

  const availableSlots = maxImages - images.length;
  if (availableSlots <= 0) {
    toast.error("You can only upload up to 4 images.");
    return;
  }

  const limitedFiles = files.slice(0, availableSlots);

  const imagePromises = limitedFiles.map((file) => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith("image/")) {
        reject("Invalid file type");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  });

  Promise.all(imagePromises)
    .then((newImages) => {
      setImages((prev) => [...prev, ...newImages]);
    })
    .catch(() => {
      toast.error("One or more files are not valid images");
    });
};

return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
                {/* description stored in value */}
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value}/>
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Property</label>
              <select name="property">
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input min={0} id="school" name="school" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bus">bus</label>
              <input min={0} id="bus" name="bus" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input min={0} id="restaurant" name="restaurant" type="number" />
            </div>
            <button className="sendButton">Add</button>
            {error && <span>error</span>}
            
          </form>
        </div>
      </div>
      <div className="sideContainer">

      <div className="previewContainer">
      {images.length > 0 ? (
  images.map((img, index) => (
    <div className="imageWrapper" key={index}>
      <img
        src={img}
        alt={`preview-${index}`}
        className="previewImage"
      />
        <button
          type="button"
          className="removeImageBtn"
          onClick={() =>
            setImages((prevImages) => prevImages.filter((_, i) => i !== index))
          }
        >
          &times;
        </button>
      </div>
       ))
      ) : (
        <p>No images selected</p>
      )}
      </div>

      <div>
          <div
            className="bg-blue-800 text-white font-semibold px-10 py-5 cursor-pointer border-none rounded-md"
            onClick={()=>fileRef.current.click()}
          >
            Upload
          </div>
          <input type="file" accept="image/*" hidden multiple ref={fileRef} onChange={handleImageChange}/>
        </div>
      </div>
    </div>
  );
}

export default NewPostPage;