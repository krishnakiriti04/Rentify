import React from 'react';
import {useHistory} from 'react-router-dom';
import {useFormik} from 'formik';
import {  toast } from 'react-toastify';
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
    width: "450px",
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
  

    function EditModal({closeModal,productData,show}) {
        const history = useHistory();

        const initialValues = {
            name: productData.name ,
            brand:productData.brand,
            model:productData.model,
            wheels:productData.wheels,
            seater:productData.seater,
            mileage:productData.mileage,
            fuel:productData.fuel,
            price:productData.price,
            img:productData.img,
            isAvailable:productData.isAvailable
        }
    
        const onSubmit = async (values)=>{
            let url = `https://hackathon-rentify.herokuapp.com/products/${productData._id}`;
            //let url = `http://localhost:4000/products/${productData._id}`
            let response = await fetch(url,{
                method:"PUT",
                body:JSON.stringify(values),
                headers:{
                    'Content-Type':"application/json"
                }
            });
            let data = await response.json();
            if(data.status === 200){
                closeModal();
                toast.success("Products Updated successfully",{position:"top-center",autoclose:3000})
            }else{
                toast.error("Failed to update product",{position:"top-center",autoclose:3000})
            }
            history.push("/products");
        }
    
        const formik = useFormik({
            initialValues,
            onSubmit
        })
    

    return  !show ? <></> : (
   <div>
    <>
      <div style={Overlay_styles} />
      <div style={Modal_styles} className="col-sm-12 col-xs-12">
        <div className="d-flex justify-content-between w-100 mt-0 py-2">
          <h1 className="text-dark">Product details</h1>
          <h3>
              <MdClose onClick={()=>closeModal()} color="red"/>
          </h3>
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
                <div className="form-row">
                <div className="form-group col-md-6 col-sm-12">
                        <label  htmlFor="name">Name</label>
                        <input type="text" name="name" id="brand" className="form-control offset-md-1 col-md-9 col-sm-12" onChange={formik.handleChange} required value={formik.values.name}/>
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                        <label  htmlFor="brand">Brand</label>
                        <input type="text" name="brand" id="brand" className="form-control offset-md-1 col-md-9 col-sm-12" onChange={formik.handleChange} required value={formik.values.brand}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6 col-sm-12">
                        <label  htmlFor="model">Model</label>
                        <input type="text" name="model" id="model" className="form-control offset-md-1 col-md-9 col-sm-12" onChange={formik.handleChange} required value={formik.values.model}/>
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                        <label className="offset-md-0" htmlFor="wheels">Wheels</label>
                        <select name="wheels" id="wheels" className="form-control offset-md-1 col-md-9 col-sm-12" onChange={formik.handleChange} required value={formik.values.wheels}>
                            <option value={2}>2</option>
                            <option value={4}>4</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6 col-sm-12">
                        <label className="offset-md-0" htmlFor="seater">Seater</label>
                        <input type="number" name="seater" min={2} max={7} id="seater" className="form-control offset-md-1 col-md-9 col-sm-12" onChange={formik.handleChange} required value={formik.values.seater}/>
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                        <label className="offset-md-0" htmlFor="img">Image URL</label>
                        <input type="text" name="img" id="img" className="form-control offset-md-1 col-md-9 col-sm-12" onChange={formik.handleChange} required value={formik.values.img}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6 col-sm-12">
                        <label className="offset-md-0" htmlFor="fuel">Fuel Type</label>
                        <select name="fuel" id="fuel" className="form-control offset-md-1 col-md-9 col-sm-12" onChange={formik.handleChange} required value={formik.values.fuel}>
                            <option>Select Fuel Type</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                        </select>
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                        <label className="offset-md-0" htmlFor="mileage">Mileage (km/L)</label>
                        <input type="number" name="mileage" id="mileage" className="form-control offset-md-1 col-md-9 col-sm-12" onChange={formik.handleChange} required value={formik.values.mileage}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6 col-sm-12">
                        <label className="offset-md-0" htmlFor="price">Price (INR)</label>
                        <input type="number" name="price" id="price" className="form-control offset-md-1 col-md-9 col-sm-12" onChange={formik.handleChange} required value={formik.values.price}/>
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                        <label className="offset-md-0" htmlFor="isAvailable">Available</label>
                        <select name="isAvailable" id="isAvailable" className="form-control offset-md-1 col-md-9 col-sm-12" onChange={formik.handleChange} required value={formik.values.isAvailable}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                </div>
                <div className="offset-md-0">
                    <button type="submit" className="btn btn-dark">Update Item </button>
                </div>
                </form>
        </div>
    </>
   </div>
    )
}

export default EditModal
