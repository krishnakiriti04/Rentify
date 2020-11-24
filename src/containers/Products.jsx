import React, { useState, useEffect } from "react";
import Orders from "./Orders";
import Filter from "./Filter";
import PageHeader from "./../components/PageHeader";

const Products = () => {
  //  let history = useHistory();

  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("products");

  const handleCarbooking = (bookedcar) => {
    setCart([...cart, bookedcar]);
  };

  const addFilters = async (filterData)=>{
      console.log("url::",filterData)
      let url = "http://localhost:4000/products/?" + new URLSearchParams(filterData).toString()
      console.log("url::",url)
      let response = await fetch(url);
      let newData = await response.json();
      setData(newData.data);
  }

  useEffect(() => {
    const getProducts = async () => {
      let response = await fetch("http://localhost:4000/products");
      let productData = await response.json();
    //   if (productData.data.length !== data.length) {
        setData(productData.data);
    };
    getProducts();
  }, []);

  return page === "orders" ? (
    <Orders cart={cart} />
  ) : (
    <div className="text-center">
      <PageHeader />
      <div className="bg-secondary p-3 mb-2">
        <button className="btn btn-outline-light d-flex justify-content-end" onClick={() => setPage("orders")}>
          Proceed to booking ({cart.length} items)
        </button>
      </div>
      <div className="row">
        <div className="col-md-2">
          <Filter data={data} addFilters={addFilters}/>
        </div>

        <div className="col-10">
          <div className="row">
            {/* <h1>Products</h1> */}
            {data.map((car) => {
              return (
                <div className="col-4 mb-2" key={car._id}>
                  <div className="card">
                    <img
                      className="card-img-top"
                      src={car.img}
                      alt={car.name}
                      width={300}
                      height={300}
                    />
                    <div className="card-body">
                      <h3 className="card-title">{car.name}</h3>
                      <h4 className="card-text">{car.price} &#x20B9; / day</h4>
                    </div>
                    <div className="card-footer">
                      <button className="btn btn-outline-success" onClick={() => handleCarbooking(car)}>
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
