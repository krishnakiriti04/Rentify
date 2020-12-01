import React from 'react';
import { MdClose } from "react-icons/md";


const Modal_styles = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(59,104,125,1)",
    //backgroundImage: "linear-gradient(60deg, #abecd6 0%, #fbed96 100%)",
    zIndex: 1000,
    padding: "10px",
    width: "400px",
    color:"gainsboro"
  };
  
  const Overlay_styles = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: 1000,
  };

const ConfirmModal = ({show,closeModal,fromDate,toDate,totalDays,amountPayable, cart,handlePayment}) =>{

    const fdate = new Date(fromDate);
    const [fromdate,fromtime] = [fdate.toLocaleDateString("en-US"), fdate.toLocaleTimeString("en-US")]

    const tdate = new Date(toDate);
    const [todate,totime] = [tdate.toLocaleDateString("en-US"), tdate.toLocaleTimeString("en-US")]

    return show ?  (
    <>
          <div style={Overlay_styles} />
          <div style={Modal_styles}>
            <section>
              <div className="d-flex justify-content-between">
                <div>
                  <h3>Order Review</h3>
                </div>
                {/* <div>
                  {Loading ? (<Spinner animation="border" variant="light" />) : null}
                </div> */}
                <div className="close-btn">
                  <h4>
                    <MdClose color="black" onClick={closeModal} />
                  </h4>
                </div>
              </div>
            </section>
            <div>
            <div className="card w-75 mx-auto">
                {/* <img className="card-img-top" src={cart[0].img} alt="vehicle" width="100" height="100" />  */}
                <ul className="list-group">
                    <li className="list-group-item text-dark"> <b> Vehicle</b> : {cart[0].name}</li>
                    <li className="list-group-item text-dark"><b> Brand </b>: {cart[0].brand}</li>
                    <li className="list-group-item text-dark"><b>From </b>:{fromdate} {fromtime} </li>
                    <li className="list-group-item text-dark"><b>Till </b>: {todate} {totime}</li>
                    <li className="list-group-item text-dark"><b>No. of Days</b> : {totalDays}</li>
                    <li className="list-group-item text-dark"><b>Amount Payable </b>: {amountPayable}</li>
                </ul>
                <div className="card-footer bg-dark text-light">
                    <button className="btn btn-outline-warning w-100" onClick={handlePayment}>Proceed to Payment</button>
                </div>
            </div>
            </div>
          </div>
        </>
    ) : null;
}

export default ConfirmModal;
