import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';

const Pin = ({ item }) => {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="flex w-auto gap-4 items-start min-w-[150px]">
          {/* Image */}
          <img
            src={item.img}
            alt="Property"
            className="w-16 h-12 object-cover rounded-lg"
          />

          {/* Text Content */}
          <div className="flex flex-col text-sm">
            <Link
              to={`/${item.id}`}
              className="text-blue-500 font-medium hover:underline"
            >
              {item.title}
            </Link>
            <span className="text-gray-500">{item.bedroom} bedroom</span>
            <b className="text-gray-800">${item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default Pin;
