import React, { useState } from "react";
import "./../App.css";
import PageHeader from "./../components/PageHeader";
import PageFooter from "./../components/PageFooter";
import { AiOutlineMail } from "react-icons/ai";
import { toast } from "react-toastify";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    console.log("came here");
    let body = { name, email, message };

    let response = await fetch(
      "https://hackathon-rentify.herokuapp.com/requests/",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let data = await response.json();
    if (data.status === 200) {
      toast.success("Thanks for reaching out!!",{position:"top-left",autoClose:3000});
    }
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact-page">
      <PageHeader />
      <div className="text-center py-2">
      <h3 className="text-light">We would like to hear from you </h3>
      </div>      
      <div className="card col-md-6 mx-md-auto mx-sm-0 mb-md-3 contact-card">
        <div className="card-body">
          <form method="post" onSubmit={handleContactSubmit}>
            <div className="form-group">
              <h3>
                <label htmlFor="fname">Full Name</label>
              </h3>
              <input
                type="text"
                id="fname"
                name="fullname"
                placeholder="Full Name"
                value={name}
                className=" p-2 form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <h3>
                <label htmlFor="email">Email</label>
              </h3>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                className="p-2 form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <h3>
                <label htmlFor="subject">Message</label>
              </h3>
              <textarea
                id="subject"
                name="subject"
                value={message}
                placeholder="Please enter your message here"
                style={{ height: "150px" }}
                className="p-2 form-control"
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <div>
              <button type="submit" className="btn btn-success">
                {" "}
                <AiOutlineMail size="26px" /> Contact us
              </button>
            </div>
          </form>
        </div>
      </div>
      <PageFooter />
    </div>
  );
};

export default ContactPage;
