import React, { useState } from "react";
import Products from "./Products";
import DateTimePicker from 'react-datetime-picker'
import "./../App.css";
import { FaRegCalendarAlt, FaAngleLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import ConfirmModal from "./confirmModal";

const Orders = (props) => {

  const [cart] = useState(props.cart);
  const [page, setPage] = useState("orders");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showModal,setshowModal] = useState(false);
  //const [itemPrice,setitemPrice] = useState(0);

  //to date should be greater than fromdate for a valid booking
  let duration = toDate - fromDate;
  
  let totalDays = (duration / (1000 * 60 * 60 * 24)).toFixed(2);

  let amountPayable ;

  const handlePayment = async (e) => {
    const response = await fetch("https://hackathon-rentify.herokuapp.com/api/orders");
    const data = await response.json();
    var options = {
    key: "rzp_test_5ZzNWVi2y3Kd07", // Enter the Key ID generated from the Dashboard
    amount: Math.floor(amountPayable) * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
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
            // toast.success("Booking Confirmed", {
            //   position: "top-center",
            //   autoclose: 3000,
            // });
            newOrder();
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
    //alert(response.error.description);
    toast.error(response.error.description, {
        position: "top-center",
        autoclose: 3000,
    });
    });
};

const newOrder = async()=>{
  let data = {
    orderedBy : localStorage.getItem('user'),
    userId: localStorage.getItem('userId'),
    productId : cart[0]._id,
    vehicleName : cart[0].name,
    bookedFrom : fromDate,
    bookedTill : toDate,
    billAmount : amountPayable,
    totalDays : totalDays,
    bookingHours : (totalDays * 24)
  }
  let url = `https://hackathon-rentify.herokuapp.com/orders/`;
  //let url = `http://localhost:4000/orders`
  let response = await fetch(url,{
    method:"POST",
    body:JSON.stringify(data),
    headers:{
      'Content-Type':"application/json"
    }
  })
  let Fetchedresult = await response.json();
  if(Fetchedresult.status===200){
    toast.success("Booking Confirmed",{autoClose:3000});
  }else{
    toast.error("Failed to receive your order",{autoClose:3000});
  }
}

  return page === "products" ? (
    <Products />
  ) : (
    <div className="text-center order-page">
      <div className="bg-secondary p-md-3 p-sm-1 d-flex justify-items-start">
        <button className="btn btn-outline-light" onClick={() => setPage("products")} >
          <FaAngleLeft /> Back to products
        </button>
      </div>            
      <div className="container d-flex align-items-center">
        <div className="row p-md-3 p-sm-1 ">

          {cart.length!==0 ?cart.map((car) => {
              amountPayable =  car.price * totalDays;
              return (
                <div className="card col-md-6 col-sm-12 my-1" key={car._id + Math.random()}>
                  <div className="card-header border border-black mt-1">
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
            }) : <h1> Please select your vehicle</h1>
          }
          <div className="col-md-6 col-sm-12">
            <div className="card border p-3 bg-dark text-light border-black booking-div">
              <div className="card-header">
              <h3>Booking Details</h3>
              </div> 
              <div className="d-flex flex-column p-md-3 p-sm-1 card-body">
                <div className="p-1 d-flex justify-content-between my-md-2">
                  <div className="d-flex">
                    <label htmlFor="">
                      <h5 className="text-info">
                        <FaRegCalendarAlt />From
                      </h5>
                    </label>
                  </div>
                  <div className="d-flex">
                    <DateTimePicker 
                      onChange={setFromDate}
                      value = {fromDate}
                      minDate = {new Date()}
                      className="bg-light p-md-2 p-sm-1 text-dark border border-0"
                    />
                  </div>

                </div>
                <div className="p-1 d-flex justify-content-between my-md-2">
                  <div className="d-flex">
                    <label htmlFor="">
                      <h5 className="text-info">
                        <FaRegCalendarAlt />{"      "}To
                      </h5>
                    </label>
                  </div>
                  <div className="d-flex">
                  <DateTimePicker 
                      onChange={setToDate}
                      value = {toDate}
                      minDate = {new Date()}
                      className="bg-light p-md-2 p-sm-1 text-dark"
                    />
                  </div>
                </div>
              </div>

              {
                showModal &&  <ConfirmModal 
                show={showModal}
                closeModal={()=>setshowModal(false)} 
                fromDate={fromDate}
                toDate = {toDate}
                totalDays = {totalDays}
                amountPayable={amountPayable}
                cart = {props.cart}
                handlePayment ={handlePayment}
                />
              }

              {/* if Dates are selected total price is displayed */}
              {(totalDays >=0 && amountPayable > 0)? (
                <>
                  <div className="text-center d-flex justify-content-center my-md-2 card-footer">
                    <h4>Amount Payable {Math.floor(amountPayable)} &#x20B9; </h4>
                  </div>
                  <div className="mt-md-1">
                    <button
                      className="btn btn-outline-warning w-100"
                      onClick={()=>setshowModal(true)} 
                    >{" "}<h4>Review order</h4>
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
