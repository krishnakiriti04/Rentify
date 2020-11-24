import React from "react";
import {useHistory} from "react-router-dom";
import './../App.css';
import {Navbar,Form,FormControl,Nav,Button} from "react-bootstrap"

function PageHeader() {
  let history = useHistory();
  return (
    <>
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/">Rentify</Navbar.Brand>
    <Nav className="mr-auto">
      {/* <Nav.Link href="#" className="active">Home</Nav.Link> */}
      <Nav.Link href="#" onClick={()=>history.push("/products")}>Products</Nav.Link>
      <Nav.Link href="#" onClick={()=>history.push("/contact")}>Contact Us</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>
</>
  );
}

export default PageHeader;
