import React,{useState} from 'react';
import {useHistory} from "react-router-dom";
import {useFormik} from 'formik';
import {  toast } from 'react-toastify';
import { Spinner } from "react-bootstrap";
import { FaAngleLeft } from "react-icons/fa";

function AddProduct() {
    let history = useHistory();

    const [loading,setLoading] = useState(false);

    const initialValues = {
        name:"",
        brand:"",
        model:"",
        wheels:4,
        seater:4,
        mileage:0,
        fuel:"",
        price:0,
        img:"",
        isAvailable:false
    }

    const onSubmit = async (values)=>{
        setLoading(true);
        let response = await fetch("https://hackathon-rentify.herokuapp.com/products",{
            method:"POST",
            body:JSON.stringify(values),
            headers:{
                'Content-Type':"application/json"
            }
        });
        let data = await response.json();
        if(data.status === 200){
            toast.success("Item added successfully",{position:"top-center",autoclose:3000})
            history.push("/products");
        }else{
            toast.error("Failed to add product",{position:"top-center",autoclose:3000})
        }
        setLoading(false);
    }

    const formik = useFormik({
        initialValues,
        onSubmit
    })

    return (
        <div>
            <div className="w-100 bg-dark p-2">
                <button onClick={()=>history.push("/products")} className="btn btn-outline-light"><FaAngleLeft /> Back to Products</button>
            </div>
            <div className="container mt-md-3">
                <div className="container add-item p-md-3 pb-sm-2">
                <form action="" onSubmit={formik.handleSubmit}>
                <div className="form-row">
                <div className="form-group col-md-6 col-sm-12">
                        <label className="offset-md-4" htmlFor="name">Name</label>
                        <input type="text" name="name" id="brand" className="form-control offset-md-4 col-md-6 col-sm-12" onChange={formik.handleChange} required value={formik.values.name}/>
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                        <label className="offset-md-4" htmlFor="brand">Brand</label>
                        <input type="text" name="brand" id="brand" className="form-control offset-md-2 col-md-6 col-sm-12" onChange={formik.handleChange} required value={formik.values.brand}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6 col-sm-12">
                        <label className="offset-md-4" htmlFor="model">Model</label>
                        <input type="text" name="model" id="model" className="form-control offset-md-4 col-md-6 col-sm-12" onChange={formik.handleChange} required value={formik.values.model}/>
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                        <label className="offset-md-4" htmlFor="wheels">Wheels</label>
                        <select name="wheels" id="wheels" className="form-control offset-md-2 col-md-6 col-sm-12" onChange={formik.handleChange} required value={formik.values.wheels}>
                            <option value={2}>2</option>
                            <option value={4}>4</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6 col-sm-12">
                        <label className="offset-md-4" htmlFor="seater">Seater</label>
                        <input type="number" name="seater" min={2} max={7} id="seater" className="form-control offset-md-4 col-md-6 col-sm-12" onChange={formik.handleChange} required value={formik.values.seater}/>
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                        <label className="offset-md-4" htmlFor="img">Image URL</label>
                        <input type="text" name="img" id="img" className="form-control offset-md-2 col-md-6 col-sm-12" onChange={formik.handleChange} required value={formik.values.img}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6 col-sm-12">
                        <label className="offset-md-4" htmlFor="fuel">Fuel Type</label>
                        <select name="fuel" id="fuel" className="form-control offset-md-4 col-md-6 col-sm-12" onChange={formik.handleChange} required value={formik.values.fuel}>
                            <option>Select Fuel Type</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                        </select>
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                        <label className="offset-md-4" htmlFor="mileage">Mileage (km/L)</label>
                        <input type="number" name="mileage" id="mileage" className="form-control offset-md-2 col-md-6 col-sm-12" onChange={formik.handleChange} required value={formik.values.mileage}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6 col-sm-12">
                        <label className="offset-md-4" htmlFor="price">Price (INR)</label>
                        <input type="number" name="price" id="price" className="form-control offset-md-4 col-md-6 col-sm-12" onChange={formik.handleChange} required value={formik.values.price}/>
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                        <label className="offset-md-4" htmlFor="isAvailable">Available</label>
                        <select name="isAvailable" id="isAvailable" className="form-control offset-md-2 col-md-6 col-sm-12" onChange={formik.handleChange} required value={formik.values.isAvailable}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                </div>
                <div className="offset-md-5">
                    <button type="submit" className="btn btn-dark">Add Item { loading ? <Spinner animation="border" variant="dark" /> :null}</button>
                </div>
                </form>
            </div>
            </div>
        </div>
    )
}

export default AddProduct
