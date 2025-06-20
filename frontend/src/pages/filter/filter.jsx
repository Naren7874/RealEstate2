import { useSearchParams } from 'react-router-dom';
import './filter.scss'
import { useState } from 'react';

const Filter = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const [query,setQuery] = useState({
        type:searchParams.get("type") || "any",
        city: searchParams.get("city") || "",
        property: searchParams.get("property") || "any",
        minPrice: searchParams.get("minPrice") || 0,
        maxPrice: searchParams.get("maxPrice") || 100000000,
        bedroom: searchParams.get("bedroom") || 1,
    })


    const handleChange = e =>{
        setQuery({
            ...query,
            [e.target.name]: e.target.value
        })
    }

    const handleFilter = () =>{
        setSearchParams(query);
    }
  return (
    <div className='filter'>
        <h1>Search results for <b>{searchParams.get("city")}</b></h1>
        <div className="top">
            <div className="item">
                <label htmlFor="city">Location</label>
                <input type="text" name="city" id="city" placeholder='City Location' onChange={handleChange} defaultValue={query.city}/>
            </div>
        </div>
        <div className="bottom">
        <div className="item">
                <label htmlFor="type">Type</label>
                <select name="type" id="type" onChange={handleChange} defaultValue={query.type}>
                    <option value="any">any</option>
                    <option value="buy">Buy</option>
                    <option value="rent">Rent</option>
                </select>
            </div>
            <div className="item">
                <label htmlFor="property">Property</label>
                <select name="property" id="property" onChange={handleChange} defaultValue={query.property}>
                    <option value="any">any</option>
                    <option value="apartment">Apartment</option>
                    <option value="condo">Condo</option>
                    <option value="land">Land</option>
                </select>
            </div>
            <div className="item">
                <label htmlFor="minPrice">Min Price</label>
                <input type="number" name="minPrice" id="minPrice" placeholder='any' onChange={handleChange} defaultValue={query.minPrice}/>
            </div>
            <div className="item">
                <label htmlFor="maxPrice">Max Price</label>
                <input type="number" name="maxPrice" id="maxPrice" placeholder='any' onChange={handleChange} defaultValue={query.maxPrice}/>
            </div>
            <div className="item">
                <label htmlFor="bedroom">Bedroom</label>
                <input type="number" name="bedroom" id="bedroom" placeholder='any' onChange={handleChange} defaultValue="1" min="0"/>
            </div>
            <button onClick={handleFilter}>
                <img src="/search.png" alt="" />
            </button>
        </div>
    </div>
  )
}

export default Filter;