import {MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import './map.scss'
import "leaflet/dist/leaflet.css"
import Pin from '../../pin/pin'
const Map = ({items}) => {
  return (
    <MapContainer center={items.length === 1 ? [items[0].latitude,items[0].longitude] : [28.64,78.2]} zoom={5} scrollWheelZoom={false} className='mapp'>
    <TileLayer 
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
   {items.map(item => (
    <Pin item={item} key={item.id} />
   ))}
  </MapContainer>
  )
}

export default Map
