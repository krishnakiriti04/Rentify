import React from 'react';
import jwt from 'jsonwebtoken';
import {Route, Redirect, useHistory} from 'react-router-dom';


let isAuth = false;
const verifyToken = async () =>{
        

        let token = localStorage.getItem('token')
        if(token){
            let state = jwt.verify(localStorage.getItem('token'),'secretkey',(err,decoded)=>{
                if(err) return false;
                localStorage.setItem('user',(decoded.data.username).toString().toUpperCase());
                localStorage.setItem('userRole',decoded.data.role);
                return true
            })
            isAuth = state;
        }else{
            isAuth =  false;
        }
        
}

const ProtectedRoute = ({component : Component, ...rest}) =>{
    
    let history = useHistory();

    //to check the jwt token;
    verifyToken();
    return (
        <>
            <Route {...rest} 
                render={props=>(isAuth ? <Component {...props}/> : history.push("/"))}
            />
        </>
        )
}

export default ProtectedRoute;
