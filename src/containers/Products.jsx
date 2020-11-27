import React, { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom';
import Orders from "./Orders";
import Filter from "./Filter";
import PageHeader from "./../components/PageHeader";
import PageFooter from "./../components/PageFooter";
import { Spinner, Button, FormControl } from "react-bootstrap";
import { GiShoppingCart } from "react-icons/gi";
import { FaFilter, FaPlus, FaSearch } from "react-icons/fa";

const Products = () => {
  let history = useHistory();
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("products");
  const [loading, setLoading] = useState(false);
  const [showfilter, setShowFilter] = useState(false);

  const handleCarbooking = (bookedcar) => {
    setCart([...cart, bookedcar]);
    setPage("orders");
  };

  const handleshowFilters = ()=>{
    //setFilterIcon(false);
    showfilter ? setShowFilter(false):setShowFilter(true);
  }

  const addFilters = async (filterData) => {
    let url = "https://hackathon-rentify.herokuapp.com/products/?" + new URLSearchParams(filterData).toString();
    setLoading(true);
    let response = await fetch(url);
    let newData = await response.json();
    setData(newData.data);
    setLoading(false);
  };

  useEffect(() => {
    const getProducts = async () => {
      let response = await fetch("https://hackathon-rentify.herokuapp.com/products");
      setLoading(true);
      let productData = await response.json();
      //   if (productData.data.length !== data.length) {
      setData(productData.data);
      setLoading(false);
    };
    getProducts();
  }, []);

  return page === "orders" ? (
    <Orders cart={cart} />
  ) : (
    <div className="text-center">
      <PageHeader />
      <div className="w-100 bg-secondary text-light py-1 px-2 d-flex justify-content-between align-items-center">
      <div className="d-flex flex-wrap justify-content-between col-2">
        <div onClick={handleshowFilters} className="h5 d-flex align-items-center filterbtn">
          <FaFilter />{"  "}Filter
        </div>
        {localStorage.getItem('userRole')==="admin" && <div>
            <button onClick={()=>history.push("/addproduct")} className="btn p-sm-1 btn-outline-light"> <FaPlus />Add Item</button>
        </div>}
      </div>
        <div className="d-flex justify-content-between">
          <FormControl type="text" placeholder="Search" className="col-xs-2 col-md-10" />
          <Button variant="info" className="p-xs-1 px-md-3"><FaSearch /></Button>
        </div>
      </div>
      <div className="row">
        {showfilter && <div className="col-md-2">
          <Filter data={data} addFilters={addFilters} />
        </div>}
         <div className={showfilter ? "col-md-10 col-sm-12" : "col-md-12 col-sm-12"}>
          <div className="row">
            {loading ? (
              <div className="mx-auto">
                {" "}
                <Spinner animation="border" variant="secondary" />{" "}
              </div>
            ) : null}
            {data.map((car) => {
              return (
                <div className="col-md-4 col-sm-12" key={car._id}>
                  <div className="card">
                    <img
                      className="card-img-top img-fluid"
                      src={car.img}
                      alt={car.name}
                      width={300}
                      height={300}
                    />
                    <div className="card-body">
                      <h3 className="card-title">{car.name}</h3>
                    </div>
                    <div className="card-footer d-flex justify-content-between product-card">
                      <div className="d-flex align-items-center">
                        <h5 className="card-text">{car.price} &#x20B9; / day</h5>
                      </div>
                      <Button className="btn btn-success" size="sm" onClick={() => handleCarbooking(car)}>
                        Book Now <GiShoppingCart color="white" size="32px" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <PageFooter />
    </div>
  );
};

export default Products;
