import Filter from '../filter/filter';
import {listData} from "../../lib/dummydata"
import './listpage.scss';
import Card from '../card/card';
import Map from '../map/map';
import { Await, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';


function Listpage() {
  const data = useLoaderData()

  return (
    <div className='listpage'>

      <div className="listcontainer">
        <div className="wrapper">
        <Filter />
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse)=> postResponse.data.map(post=>(
              <Card key={post.id} item={post}/>  
            ))}
          </Await>

        </Suspense>
        </div>
      </div>
      <div className="mapcontainer">
      <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse)=> <Map items={postResponse.data} /> }
          </Await>

        </Suspense>
     
      </div>
    </div>
  )
}

export default Listpage