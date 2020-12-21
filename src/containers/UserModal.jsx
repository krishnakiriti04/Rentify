import React,{useEffect,useState} from 'react';
// import {useHistory} from 'react-router-dom';
// import {useFormik} from 'formik';
import {  toast } from 'react-toastify';
import { MdClose } from "react-icons/md";
import { Spinner } from 'react-bootstrap';


const Modal_styles = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(59,104,125,1)",
    //backgroundImage: "linear-gradient(60deg, #abecd6 0%, #fbed96 100%)",
    zIndex: 1000,
    padding: "10px",
    width: "600px", 
    color:"gainsboro",
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

  const Modal_Body = {
    height : "400px",
    overflow:"auto",
  }

function UserModal({closeUserModal, show}) {

    const [Loading, setLoading] = useState(false);
    const [allUsers,setAllUsers] = useState([]);

    const fetchUsers = async ()=>{
        try {
            let url = 'https://hackathon-rentify.herokuapp.com/users';
            //let url = "http://localhost:4000/users";
            setLoading(true);
            let response = await fetch(url);
            let data = await response.json();
            setAllUsers(data.results);
            setLoading(false)
        } catch (error) {
            toast.error(error.message,{autoClose:3000})
        }
    }

    const handleRoleChange = async(id,role)=>{
        setLoading(true);
        let data = {
            "role":role
        }
        try{
            let url = `https://hackathon-rentify.herokuapp.com/users/${id}`
            //let url = `http://localhost:4000/users/${id}`
            let response = await fetch(url,{
                method:"PUT",
                body:JSON.stringify(data),
                headers:{
                    'Content-Type':"application/json"
                }
            })
            let result = await response.json();
            if(result){
                fetchUsers();
                toast.success("User role updation successfull",{autoClose:3000})
            }else{
                toast.error("Failed to update user role",{autoClose:3000});    
            }
            setLoading(false);
        }
        catch(error){
            toast.error("Failed to update user role",{autoClose:3000})
        }
    }

    useEffect(()=>{
        fetchUsers();
    },[])
    
    return (show && (
        <>
        <div style={Overlay_styles} />
        <div style={Modal_styles}>
                <section>
                    <div className="d-flex justify-content-between">
                        <div>
                           <h3>User Management</h3>
                        </div>
                        <div>
                            {Loading ? <Spinner animation="border" variant="light"/> : null}
                        </div>
                        <div>
                            <h4><MdClose color="red" onClick={closeUserModal}/></h4>
                        </div>
                    </div>   
                </section>
                <section className="bg-light modal-body mx-auto w-100" style={Modal_Body}>
                    <table className="table table-responsive table-striped">
                        <thead>
                            <tr>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                        {allUsers && allUsers.map((user)=>{
                        return (
                            <tr key={user._id}>        
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    {
                                        user.role!=="admin" ? <button onClick={()=>handleRoleChange(user._id,"admin")} className="btn btn-success btn-sm">
                                            Make Admin </button> :<button onClick={()=>handleRoleChange(user._id,"customer")} className="btn btn-danger btn-sm">Revoke Admin access</button>
                                    }
                                </td>
                            </tr>
                        )
                            })}
                        </tbody>
                    </table>
                    
                </section>
        </div>
        </>        
    ) )
}

export default UserModal
