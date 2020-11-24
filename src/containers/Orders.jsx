import React, { useState } from "react";
import Products from "./Products";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import TimePicker from 'react-time-picker';
import moment from "moment";
import "./../App.css";

const Orders = (props) => {
  const [cart] = useState(props.cart);
  const [page, setPage] = useState("orders");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  //const [itemPrice, setItemPrice] = useState(0);
  let itemPrice = 0;
  let totalDays = 0;
  // const [fromTime,setFromTime] = useState(null);
  // const [toTime,setToTime] = useState(null);

  const startDate = moment(fromDate);
  // const startTime = moment(fromTime);
  // const endTime = moment(toTime);

  const timeEnd = moment(toDate);
  const diff = timeEnd.diff(startDate);
  // const diffTime = endTime.diff(startTime)
  const diffDuration = moment.duration(diff);
  totalDays = diffDuration.days();

  return page === "products" ? (
    <Products />
  ) : (
    <div className="text-center filter-page">
      <div className="bg-secondary p-3 d-flex justify-items-start">
        <button className="btn btn-outline-light" onClick={() => setPage("products")}>Back to products</button>
      </div>
        <div className="container">
          <div className="row card-deck">
            {cart.map((car) => {
              itemPrice = car.price;
              return (
                <div className="card col-10 d-flex flex-wrap flex-row" key={car.id + Math.random()}>
                     <div className="card-header border-0">
                        <img className="card-img img-fluid" src={car.img} alt={car.name} height={300} width={300}/>
                    </div>
                    <div className="card-block px-2 text-center">
                        <h3 className="card-title">{car.name}</h3>
                        <h4 className="card-text">{car.price}</h4>
                    </div>
                  <div className="card-footer w-100">
                    <h5>Quantity</h5>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      <div className="col-12 container">
      <h1>Booking Details</h1>
          <div className="border p-3 mb-2 bg-dark text-light border-black d-flex justify-content-between">
          
            <div className="d-flex justify-content-around col-6 text-center">
              <div >
                <div>
                  <label htmlFor="">
                    <h4>Booking From</h4>
                  </label>
                </div>
                {/* <div className="d-flex justify-content-around text-center"> */}
                <DatePicker
                  className="form-control"
                  selected={fromDate}
                  onChange={(date) => setFromDate(date)}
                  minDate={new Date()}
                  format="dd/MM/yyyy"
                  required
                />
                {/* <TimePicker showSecond={false}
                                placeholder={"From"}
                                onChange={time=>setFromTime(time)}
                            />  */}
                {/* </div> */}
              </div>
              <div>
                <div>
                  <label htmlFor="">
                    <h4>Booking To</h4>
                  </label>
                </div>
                {/* <div  className="d-flex justify-content-around"> */}
                <DatePicker
                  className="form-control"
                  selected={toDate}
                  onChange={(date) => setToDate(date)}
                  minDate={new Date()}
                  format="dd/MM/yyyy"
                />
                {/* <TimePicker showSecond={false}
                                placeholder={"To"}
                                onChange={time=>setToTime(time)}
                            />  */}
                {/* </div> */}
              </div>
            </div>

            {/* if Dates are selected total price is displayed */}
            {totalDays ? (
              <div className="text-center d-flex align-items-center">
                <h3>Amount Payable : {totalDays * itemPrice}</h3>
              </div>
            ) : null}
          </div>
        </div>
    </div>
  );
};

export default Orders;
