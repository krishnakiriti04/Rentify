import { useState } from "react";
import { FcFilledFilter,FcClearFilters} from "react-icons/fc"

const Filter = ({ data, addFilters }) => {
  const [filter, setFilter] = useState({});

  const clearFilters = ()=>{
    setFilter({});
    return addFilters({});
  }

  return (
    <div className="border border-dark h-100 filter-page">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          return addFilters(filter);
        }}  
      >
        <fieldset>
          <legend>Filter</legend>
          <div className="form-group">
            <label htmlFor="brand">Brand</label>
            <select
              name="brand"
              id="brand"
              className="form-control  mx-auto col-8"
              onChange={(e) =>   setFilter({...filter, brand: e.target.value })}
            >
              {/* displays unique brand names */}
              <option value="">Select Brand</option>
              {[
                ...new Map(data.map((item) => [item["brand"], item])).values(),
              ].map((val) => (
                <option value={val.brand} key={val._id}>
                  {val.brand}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group ">
            <label htmlFor="model">Model</label>
            <select
              name="model"
              id="model"
              className="form-control mx-auto col-8"
              onChange={(e) => setFilter({...filter, model: e.target.value })}
            >
              {/* displays unique model names */}
              <option value="">Select Model</option>
              {[
                ...new Map(data.map((item) => [item["model"], item])).values(),
              ].map((val) => (
                <option value={val.model} key={val._id}>
                  {val.model}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="wheels">Wheels</label>
            <select
              name="wheels"
              id="wheels"
              className="form-control  mx-auto col-8"
              onChange={(e) => setFilter({ ...filter, wheels: e.target.value })}
            >
              <option value="">Select Wheeler</option>
              <option value="2">2 Wheelers</option>
              <option value="4">4 wheelers</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="fuel">Fuel Type</label>
            <select
              name="fuel"
              id="fuel"
              className="form-control  mx-auto col-8"
              onChange={(e) => setFilter({...filter, fuel: e.target.value })}
            >
              <option value="">Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="seater">Seating Capacity</label>
            <select
              name="seater"
              id="seater"
              className="form-control  mx-auto col-8"
              onChange={(e) => setFilter({...filter, seater: e.target.value })}
            >
              <option value="">Select Seating</option>
              <option value="4">4</option>
              <option value="7">7</option>
            </select>
          </div>
          <div className="mb-2">
            <button type="submit" className="btn btn-outline-primary text-light">
              Add Filters <FcFilledFilter color="black"  size="26px"/>
            </button>
          </div>
          <div>
            <button type="button" onClick={clearFilters} className="btn btn-outline-primary text-light">
              Clear Filters <FcClearFilters color="black" size="26px"/>
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Filter;
