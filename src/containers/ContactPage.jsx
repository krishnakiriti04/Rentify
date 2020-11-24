import React, {useState} from "react";
import "./../App.css";
import PageHeader from "./../components/PageHeader";

const ContactPage = () => {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");

    const handleContactSubmit = async(event) =>{
        event.preventDefault();
        console.log("came here");
        let body = {name,email,message};

        let response = await fetch("https://hackathon-rentify.herokuapp.com/requests/",{
            method:"POST",
            body:JSON.stringify(body),
            headers:{
                'Content-Type':"application/json"
            }
        })
        let data = await response.json();
        if(data.status===200){
            alert("Thanks for reaching out!!")
        }
        setName("");
        setEmail("");
        setMessage("")

    }

  return (
    <div>
      <PageHeader />
      <h2>Contact Page</h2>
      <div className="container">
    <form method="post" onSubmit ={handleContactSubmit}>
    <div className="form-group">
    <label htmlFor="fname">Full Name</label>
    <input type="text" id="fname" name="fullname" placeholder="Full Name" value={name} className="form-control" onChange={(e)=>setName(e.target.value)} />
    </div>
    
    <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Email" value={email} className="form-control" onChange={(e)=>setEmail(e.target.value)} />
    </div>

    <div className="form-group">
        <label htmlFor="subject">Message</label>
        <textarea id="subject" name="subject" value={message} placeholder="Please enter your message here" style={{"height":"200px"}} className="form-control" onChange={(e)=>setMessage(e.target.value)}></textarea>
    </div>
    <div>
        <button type="submit" className="btn btn-outline-success">Contact us</button>
    </div>

  </form>
</div>
    </div>
  );
};

export default ContactPage;
