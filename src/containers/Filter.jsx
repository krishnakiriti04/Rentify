import {useState} from 'react'

const Filter = ({data, addFilters})=> {

    const [filter,setFilter] = useState({})
    // const [brand,setBrand] = useState("");
    // const [model,setModel] = useState("");
    // const [fuel,setFuel] = useState("");
    // const [seater,setSeater] = useState(0);
    // const [wheels,setWheels] = useState(0);

    return (
        <div className="border border-dark h-100 filter-page">
            <form onSubmit={(e)=>{e.preventDefault(); return addFilters(filter)}}>
                <fieldset>
                    <legend>Filter</legend>
            <div className="form-group">
                <label htmlFor="brand">Brand</label>
                <select name="brand" id="brand" className="form-control  mx-auto col-8" onChange={e=>setFilter({brand : e.target.value})}>
                {/* displays unique brand names */}
                <option value="" >Select Brand</option>
                {[...new Map(data.map(item => [item["brand"], item])).values()].map((val)=>(
                        <option value={val.brand} key={val._id}>{val.brand}</option>
                    ))}
                </select>
            </div>
            <div className="form-group ">
                <label htmlFor="model">Model</label>
                <select name="model" id="model" className="form-control mx-auto col-8" onChange={e=>setFilter({model:e.target.value})}>
                    {/* displays unique model names */}
                    <option value="" >Select Model</option>
                    {[...new Map(data.map(item => [item["model"], item])).values()].map((val)=>(
                        <option value={val.model} key={val._id}>{val.model}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="wheels">Wheels</label>
                <select name="wheels" id="wheels" className="form-control  mx-auto col-8" onChange={e=>setFilter({wheels : parseInt(e.target.value)})}>
                <option value="" >Select Wheeler</option>
                        <option value={2}>2 Wheelers</option>
                        <option value={4}>4 wheelers</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="fuel">Fuel Type</label>
                <select name="fuel" id="fuel" className="form-control  mx-auto col-8" onChange={e=>setFilter({fuel : e.target.value})}>
                <option value="" >Fuel Type</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="seater">Seating Capacity</label>
                <select name="seater" id="seater" className="form-control  mx-auto col-8" onChange={e=>setFilter({seater : parseInt(e.target.value)})}>
                <option value="" >Select Seating</option>
                        <option value={4}>4</option>
                        <option value={7}>7</option>
                </select>
            </div>
            <div className="mb-2">
                <button type="submit" className="btn btn-outline-primary">Add Filters</button>
            </div>
            <div>
                <button type="button" onClick={()=>{addFilters({})}} className="btn btn-outline-primary">Clear Filters</button>
            </div>
            </fieldset>
            </form>
        </div>
  
    )
}

export default Filter
