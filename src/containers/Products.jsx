import React, { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom';
import Orders from "./Orders";
import Filter from "./Filter";
import PageHeader from "./../components/PageHeader";
import PageFooter from "./../components/PageFooter";
import EditModal from "./EditModal";
import UserModal from "./UserModal";
import { Spinner, Button } from "react-bootstrap";
import { GiShoppingCart } from "react-icons/gi";
import { FaFilter, FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import {MdGroup} from "react-icons/md";
import { toast } from "react-toastify";


const Products = () => {
  let history = useHistory();
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("products");
  const [loading, setLoading] = useState(false);
  const [showfilter, setShowFilter] = useState(false);
  const [showModal,setShowModal] = useState(false);
  const [role] = useState(localStorage.getItem('userRole'));
  const [modalData,setModalData] = useState(null);
  const [showuserModal,setUserModal] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

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
    //let url = "http://localhost:4000/products/?" + new URLSearchParams(filterData).toString();
    setLoading(true);
    let response = await fetch(url);
    let newData = await response.json();
    setData(newData.data);
    setLoading(false);
  };

  const handleshowModal= async(product)=>{
     setShowModal(true);
      setModalData(product);
  }

  const closeModal = ()=>{
    setShowModal(false);
  }

  const deleteProduct = async (id)=>{
    let url = `https://hackathon-rentify.herokuapp.com/products/${id}`;
    //let url = `http://localhost:4000/products/${id}`;
    let response =await fetch(url,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      }
    })
    let Fetchresponse = await response.json();
    if(Fetchresponse.status===200){
      toast.success("Product deleted successfully",{position:'top-center',autoClose:3000});
    }else{
      toast.error("Failed to delete the product",{position:'top-center',autoClose:3000});
    }

  }

  const showMyordersPage = ()=>{
    history.push("/myorders")
  }

  useEffect(() => {
    const getProducts = async () => {
       let response = await fetch("https://hackathon-rentify.herokuapp.com/products");
      //let response = await fetch("http://localhost:4000/products");
      setLoading(true);
      let productData = await response.json();
      //   if (productData.data.length !== data.length) {
      setData(productData.data);
      setDataLoaded(true);
      setLoading(false);
    };
    getProducts();
  }, []);

  return page === "orders" ? (
    localStorage.getItem('user') ? <Orders cart={cart} /> : ( setPage("products") ,toast.info("Please login to continue",{position:"top-center",autoClose:3000}))
  ) : (
    <div className="text-center">
      <PageHeader />
      <div className="w-100 bg-secondary text-light py-1 px-2 d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-between">
          <div onClick={handleshowFilters} className="butn h5 d-flex mx-md-3 align-items-center filterbtn">
            <FaFilter />{"  "}Filter
          </div>
          <div>
            {/* my orders button */}
            {role && <button onClick={showMyordersPage} className="btn btn-outline-light">{role==="admin" ? "All Orders" :"My Orders"}</button>}
          </div>
         </div>
        <div className="d-flex justify-content-between">
          {/* <FormControl type="text" placeholder="Search" className="col-xs-2 col-md-10" />
          <Button variant="info" className="p-xs-1 px-md-3"><FaSearch /></Button> */}
           {role==="admin" &&  <div className="d-flex align-items-center justify-content-between">
              <button onClick={()=>history.push("/addproduct")} className="btn p-sm-1 btn-outline-light mx-md-3 mx-sm-2 butn">
                  <FaPlus />Add Item
              </button>
              <div>
                <Button variant="dark" className="text-light butn p-md-1" onClick={()=>setUserModal(true)}>
                  <MdGroup size="28px"/>
                </Button>
              </div>
            </div>
          }
          
          
        </div>
      </div>
      <div className="row">
        {showfilter && <div className="col-md-2">
          <Filter data={data} addFilters={addFilters} />
        </div>}
         <div className={showfilter ? "col-md-10 col-sm-12" : "col-md-12 col-sm-12"}>
            {/*......................... Modal for Editing product data ........................*/}

            {showModal &&  <EditModal show={showModal} closeModal = {closeModal} productData = {modalData}/>}
            
            {/*......................... Modal for Editing User Roles ........................*/}

              {
                showuserModal &&  <UserModal closeUserModal={()=>setUserModal(false)} show={UserModal}/>
              }
            
          <div className="row p-md-3">
            {loading ? (
              <div className="mx-auto">
                {" "}
                <Spinner animation="border" variant="secondary" />{" "}
              </div>
            ) : null}
            
            {data.length!==0 ? (data.map((car) => {
              return (
                <div className="col-md-4 col-sm-12" key={car._id}>
                  <div className="card">
                    <img
                      className="card-img-top img-fluid d-flex align-items-stretch"
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
                      {role==="admin" ? <div className="d-flex justify-content-between h4 p-2" style={{width:"75px"}}>
                        <FaEdit onClick={()=>handleshowModal(car)} color="green"/>
                        <FaTrashAlt onClick={()=>deleteProduct(car._id)} color="maroon"/>
                      </div> :
                      <Button className="btn btn-success" size="sm" onClick={() => handleCarbooking(car)}>
                        Book Now <GiShoppingCart color="white" size="32px" />
                      </Button>
                      }
                    </div>
                  </div>
                </div>
              );
              })
            ) : ( dataLoaded ? <div className="text-center"> <h3>No Products found</h3> </div> : <div className="div-spinner"> <Spinner animation="border" variant="info"/> </div> 
            ) }
          </div>
        
        </div>
      </div>
      <PageFooter />
    </div>
  );
};

export default Products;

