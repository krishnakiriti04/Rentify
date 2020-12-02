import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import './../App.css';
import {Link} from 'react-router-dom';
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Spinner} from "react-bootstrap";

toast.configure();

const Signup = () => {

    let history = useHistory();
    let [email,setEmail] = useState("");
    let [password,setPassword] = useState("");
    let [username,setUsername] = useState("");
    let [phone,setPhone] = useState("");
//    let [role,setRole] = useState("");
    const [loading,setLoading] = useState(false);

    const signupFunc = async (event) =>{
        setLoading(true);
        event.preventDefault();
        let data = {
            username : username,
            email : email,
            password : password,
            phone : phone,
            role : "customer"
        }
        let url = 'https://hackathon-rentify.herokuapp.com/api/register';
        //let url = "http://localhost:4000/api/register"
        let response = await fetch(url,{
            method:"POST",
            body : JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        let Fetchdata = await response.json();
        setLoading(false);
        //console.log("Fetched Data", Fetchdata);
        if(Fetchdata.status===200){
            //alert('Registration successfull');
            toast.success("Registration successfull")
            history.push("/login");
        }else{
            toast.error("Registration Failed")
        }
        setEmail("");
        setPassword("");
        setUsername("");
        setPhone("");

    }

    return (
        <div className="container mt-3 d-flex justify-content-center register-page">
            <div className="card col-md-6 col-sm-12 card-bg-register text-center">
                   <h1>Register</h1>
                <div className="card-body w-75 mx-auto">
                    <form className="form-group" onSubmit={signupFunc} method="POST">
                        <input type="text" name="username" id="username" className="bg-light form-control mb-2" onChange={(e)=> setUsername(e.target.value)} value={username} placeholder="Username" required/>
                        <input type="email" name="email" id="email" className="bg-light form-control mb-2" onChange={(e)=> setEmail(e.target.value)} placeholder="Email" value={email} required/>
                        <input type="password" name="password" id="password" className="bg-light form-control mb-2" onChange={(e)=> setPassword(e.target.value)} value={password} placeholder="Password" required/>
                        <input type="tel" name="phone" id="phone" className="bg-light form-control mb-2" onChange={(e)=> setPhone(e.target.value)} placeholder="Phone" value={phone} required/>
                        <button type="submit" className="btn btn-info px-3">Signup { loading ? <Spinner animation="border" variant="light" /> :null}  </button>
                    </form>
                    <div>
                        <Link to="/login">Back to Login</Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Signup;