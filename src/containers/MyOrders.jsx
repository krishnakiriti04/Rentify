import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import "./../App.css";
import {  FaAngleLeft, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { Spinner} from "react-bootstrap";

function MyOrders() {

  let history = useHistory();

  const [orders, setOrders] = useState([]);
  const [searchString,setSearchString] = useState("");
  const [dataLoaded,setDataLoaded] = useState(false);

  const userdetails = {
    id: localStorage.getItem("userId"),
    name: localStorage.getItem("user").toLowerCase(),
    role:localStorage.getItem("userRole")
  };


  useEffect(() => {
    setDataLoaded(false);
    const getOrderDetails = async () => {
        try {
            let url;
            if(userdetails.role!=="admin"){
                url = `https://hackathon-rentify.herokuapp.com/orders/${userdetails.id}`;
                //url = `http://localhost:4000/orders/${userdetails.id}`
            }else{
                url = `https://hackathon-rentify.herokuapp.com/orders/`;
                //url = `http://localhost:4000/orders/`
            }
            
            let response = await fetch(url);
            let fetchedData = await response.json();
            setOrders(fetchedData.results);
            setDataLoaded(true);
        } catch (error) {
           toast.error("Error while fetching order details",{autoClose:2000}); 
        }
    };
    getOrderDetails();
  }, [userdetails.id, userdetails.role]);

  //search function 

  const search = (rows) =>{
    return rows.filter((row)=>{
     return  (row.vehicleName.toLowerCase().indexOf(searchString.toLowerCase())> -1 || 
            row.orderedBy.toLowerCase().indexOf(searchString.toLowerCase())> -1)
    }
    )
  }

  return (
    <div className="myorder-page">
      <div className="bg-secondary p-md-3 p-sm-1 d-flex justify-content-between">
        <div>
          <button
            className="btn btn-outline-light"
            onClick={() => history.replace("/products")}
          >
            <FaAngleLeft /> Back to products
          </button>
        </div>
        <div>
          <form className="form-inline d-flex justify-content-center md-form form-sm mt-0 search-bar">
            <FaSearch color="skyblue"/>
            <input className="form-control form-control-sm ml-3 w-sm-80" 
              value={searchString} 
              type="text" 
              placeholder="Search"
              onChange={(e)=>setSearchString(e.target.value)}
            />
          </form>
          </div>
      </div>
      <div className="w-75 mx-auto myorders-table mt-3">
      <table className="table table-striped">
        <thead className="bg-dark text-light">
          <tr>
            <th>Vehicle</th>
            <th>From</th>
            <th>To</th>
            <th>Bill Amount</th>
            {userdetails.role ==="admin" && <th>Booked By</th>}
          </tr>
        </thead>
        <tbody className="bg-light">
            {
                search(orders).length===0 ? 
                ( 
                  orders.length!==0 ? 
                    <tr><td><h1>No results found</h1></td></tr> :
                       ( dataLoaded ? 
                            <tr><td><h2>No orders found</h2></td></tr> : 
                            <div className="div-spinner"> <Spinner animation="border" variant="info"/> </div> 
                        )
                ) :   
                search(orders).map((order)=>{
                    return (
                        <tr key={order._id}>
                            <td>{order.vehicleName}</td>
                            <td>{order.bookedFrom.split("T")[0]}</td>
                            <td>{order.bookedTill.split("T")[0]}</td>
                            <td>{order.billAmount} INR</td>    
                            {userdetails.role ==="admin" && <td>{order.orderedBy.toLowerCase()}</td>}        
                        </tr>
                    )
                })
            }
        </tbody>
      </table>
      </div>
      
    </div>
  );
}

export default MyOrders;
