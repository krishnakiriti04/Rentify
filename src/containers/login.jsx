import React, {useState} from 'react';
import './../App.css';
import {Link, useHistory} from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Spinner} from "react-bootstrap";

toast.configure();

const Login = () => {

    let [email,setEmail] = useState("");
    let [password,setPassword] = useState("");
    let [loading,setLoading] = useState(false);
    const history = useHistory();

    const loginFunc = async (event) =>{
        setLoading(true);
        event.preventDefault();
        let data = {
            email : email,
            password : password
        }
          let url = 'https://hackathon-rentify.herokuapp.com/api/login';
          //let url = `http://localhost:4000/api/login`;
          let response = await fetch(url,{
            method:"POST",
            body : JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        let Fetchdata = await response.json();
        if(Fetchdata.status===200){
            setLoading(false);
            toast.success('Login success!!',{position:'top-center',autoClose:2000});
            localStorage.setItem('token',Fetchdata.token);
            history.replace('/home');
        }else if(Fetchdata.status===400){
            setLoading(false);
            toast.error('Invalid Credentials',{autoClose:3000});
        }else if(Fetchdata.status===401){
            setLoading(false);
            toast.info('Email not registered',{autoClose:2000});
        }
        setEmail("");
        setPassword("");
    }

    return (
        <div className="container mt-3 d-flex justify-content-center login-page">
            <div className="card col-md-6 col-sm-12 card-bg text-center">
                   <h1>Login</h1>
                <div className="card-body w-md-75 w-sm-100 mx-md-auto mx-sm-2">
                    <form className="form-group" onSubmit={loginFunc} method="POST">
                        <input type="text" name="email" id="email" value={email} className="bg-light form-control mb-2" onChange={(e)=> setEmail(e.target.value)} placeholder="Email" required/>
                        <input type="password" name="password" id="password" value={password} className="bg-light form-control mb-2" onChange={(e)=> setPassword(e.target.value)} placeholder="Password" required/>
                        <button type="submit" className="btn btn-info px-3">Login { loading ? <Spinner animation="border" variant="light" /> :null} </button>
                    </form>
                    <div>
                        {/* <Link to="/layout" >Forgot Password</Link> */}
                        <p>Doesn't have an account? <Link to="/register">Sign Up</Link></p>        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;