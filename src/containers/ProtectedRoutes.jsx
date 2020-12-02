import React from "react";
import jwt from "jsonwebtoken";
import { Route, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

let isAuth = false;
const verifyToken = async () => {
  let token = localStorage.getItem("token");
  if (token) {
    let state = jwt.verify(localStorage.getItem("token"),"secretkey",(err, decoded) => {
        if (err) return false;
        localStorage.setItem(
          "user",
          decoded.data.username.toString().toUpperCase()
        );
        localStorage.setItem("userRole", decoded.data.role);
        localStorage.setItem("userId", decoded.data._id);
        return true;
      }
    );
    isAuth = state;
  } else {
    isAuth = false;
  }
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
  let history = useHistory();

  //to check the jwt token;
  verifyToken();
  return (
    <>
      <Route {...rest}
        render={(props) =>{
         return isAuth ? <Component {...props} /> : (
            toast.info("please login to continue",{autoClose:2000,position:"top-center"}),
            history.push("/")
          )
        }
        }
      />
    </>
  );
};

export default ProtectedRoute;
