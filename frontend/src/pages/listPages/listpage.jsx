import Filter from '../filter/filter';
import {listData} from "../../lib/dummydata"
import './listpage.scss';
import Card from '../card/card';
import Map from '../map/map';


const Listpage = () => {
  const data = listData;
  return (
    <div className='listpage'>

      <div className="listcontainer">
        <div className="wrapper">
        <Filter />
        {data.map(item => (
          <Card key={item.id} item={item} />
        ))}
        </div>
      </div>
      <div className="mapcontainer">
      <Map items={data} />
      </div>
    </div>
  )
}

export default Listpage