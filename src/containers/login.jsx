import React, {useState} from 'react';
import './../App.css';
import {Link, useHistory} from 'react-router-dom'
// import Tickets from './tickets';

const Login = () => {
    let [email,setEmail] = useState("");
    let [password,setPassword] = useState("");
    const history = useHistory();

    const loginFunc = async (event) =>{
        event.preventDefault();
        let data = {
            email : email,
            password : password
        }
        let response = await fetch('http://localhost:4000/api/login',{
            method:"POST",
            body : JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        let Fetchdata = await response.json();
        //console.log("Fetched Data", Fetchdata);
        if(Fetchdata.status===200){
            alert('Login success!!');
            localStorage.setItem('token',Fetchdata.token);
            if(Fetchdata.userDetails.role === "admin"){
                history.replace('/layout');
            }else if(Fetchdata.userDetails.role==='customer'){
                history.replace('/customer');
            }else if( Fetchdata.userDetails.role==='agent'){
                history.replace('/agents');
            }
            
        }
        setEmail("");
        setPassword("");
    }

    return (
        <div className="container mt-3 d-flex justify-content-center">
            <div className="card col-6 card-bg text-center">
                   <h1>Login</h1>
                <div className="card-body w-75 mx-auto">
                    <form className="form-group" onSubmit={loginFunc} method="POST">
                        <input type="text" name="email" id="email" value={email} className="bg-light form-control mb-2" onChange={(e)=> setEmail(e.target.value)} placeholder="Email" required/>
                        <input type="password" name="password" id="password" value={password} className="bg-light form-control mb-2" onChange={(e)=> setPassword(e.target.value)} placeholder="Password" required/>
                        <button type="submit" className="btn btn-info px-3">Login</button>
                    </form>
                    <div>
                        <Link to="/layout">Forgot Password</Link>
                        <p>Doesn't have an account? <Link to="/register">Sign Up</Link></p>        
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login;