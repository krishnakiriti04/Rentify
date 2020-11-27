import React, { useState } from "react";
import Products from "./Products";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import TimePicker from 'react-time-picker';
import moment from "moment";
import "./../App.css";
import { FaRegCalendarAlt, FaAngleLeft } from "react-icons/fa";
import { toast } from "react-toastify";

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

  const handlePayment = async (e) => {
    const response = await fetch("https://hackathon-rentify.herokuapp.com/api/orders");
    const data = await response.json();
    var options = {
      key: "rzp_test_5ZzNWVi2y3Kd07", // Enter the Key ID generated from the Dashboard
      amount: "500000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "RENTIFY",
      description: "Test Transaction",
      order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async (response) => {
        try {
          const paymentId = response.razorpay_payment_id;
          const url = `https://hackathon-rentify.herokuapp.com/api/capture/${paymentId}`;
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature)
          const captureResponse = await fetch(url, {
            method: "POST",
          });

          const successobj = await captureResponse.json();
          if (successobj) {
            toast.success("Booking Confirmed", {
              position: "top-center",
              autoclose: 3000,
            });
            setPage("products");
          }
        } catch (err) {
          console.log("error from front end");
        }
      },
      prefill: {
        name: localStorage.getItem("user"),
        email: "test_user@gmail.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    rzp1.on("payment.failed", function (response) {
      alert(response.error.description);
      toast.danger(response.error.description, {
        position: "top-center",
        autoclose: 3000,
      });
    });
  };

  return page === "products" ? (
    <Products />
  ) : (
    <div className="text-center order-page">
      <div className="bg-secondary p-3 d-flex justify-items-start">
        <button className="btn btn-outline-light" onClick={() => setPage("products")} >
          <FaAngleLeft /> Back to products
        </button>
      </div>
      <div className="container ">
        <div className="row p-3">
          {cart.map((car) => {
            itemPrice = car.price;
            return (
              <div className="card col-md-6 col-sm-12 h-50 my-2" key={car._id + Math.random()}>
                <div className="card-header border border-black">
                  <img
                    className="card-img card-picture img-fluid"
                    src={car.img}
                    alt={car.name}
                    height={200}
                    width={200}
                  />
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <h3 className="card-title">{car.name}</h3>
                  <h4 className="card-text">{car.price} &#x20B9; / day </h4>
                </div>
              </div>
            );
          })}
          <div className="col-md-6 col-sm-12 mt-2">
            <div className="border p-3 bg-dark text-light border-black">
              <h1>Booking Details</h1>
              <div className="d-flex flex-column p-3">
                <div className="d-flex justify-content-between p-md-3 p-sm-1">
                  <div className="d-flex justify-content-start">
                    <label htmlFor="">
                      <h5 className="text-info">
                        <FaRegCalendarAlt /> From
                      </h5>
                    </label>
                  </div>
                  <div className="d-flex justify-content-end">
                    <DatePicker
                      className="form-control"
                      selected={fromDate}
                      onChange={(date) => setFromDate(date)}
                      minDate={new Date()}
                      format="dd/MM/yyyy"
                      required
                    />
                  </div>

                  {/* <TimePicker showSecond={false}
                                placeholder={"From"}
                                onChange={time=>setFromTime(time)}
                            />  */}
                  {/* </div> */}
                </div>
                <div className="d-flex justify-content-between p-md-3 p-sm-1">
                <div className="d-flex justify-content-start">
                    <label htmlFor="">
                      <h5 className="text-info">
                        <FaRegCalendarAlt /> To
                      </h5>
                    </label>
                  </div>
                  <div className="d-flex justify-content-end">
                    <DatePicker
                      className="form-control"
                      selected={toDate}
                      onChange={(date) => setToDate(date)}
                      minDate={new Date()}
                      format="dd/MM/yyyy"
                    />
                  </div>
                  {/* <TimePicker showSecond={false}
                                placeholder={"To"}
                                onChange={time=>setToTime(time)}
                            />  */}
                  {/* </div> */}
                </div>
              </div>

              {/* if Dates are selected total price is displayed */}
              {totalDays ? (
                <>
                  <div className="text-center d-flex justify-content-center">
                    <h3>Amount Payable {totalDays * itemPrice} &#x20B9; </h3>
                  </div>
                  <div className="mt-3">
                    <button
                      className="btn btn-outline-warning w-100"
                      onClick={handlePayment}
                    >
                      {" "}
                      <h4>Proceed to Payment</h4>
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
