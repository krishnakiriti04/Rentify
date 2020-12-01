import React,{useState, useEffect} from 'react'
import PageHeader from "./../components/PageHeader"
import PageFooter from "./../components/PageFooter"
import './../App.css'

function LandingPage() {
        const [userdata, setUserdata] = useState([]);

        useEffect(()=>{
           const getData =  async ()=> {
               let response = await fetch("https://randomuser.me/api/?results=320");
               let data = await response.json();
               setUserdata(data.results);
           }
           getData();
        },[])

    return (
        <>
        <PageHeader />
        <div className="bg-light heading-body" style={{backgroundImage:"url(/images/car.jpg)"}}>
                <h1>RENTIFY</h1>
                <h5>your one stop solution for vehicle renting</h5>
        </div>
        <div className="bg-secondary text-center">
            <div className="container hero-body">
                <h2>1000+ Happy Customers and counting...</h2>
            </div>
            <div className="row d-flex flex-row m-0 pl-md-4 pl-xs-2 mx-auto div-images">
            {userdata.map((user)=>{
                return (user.picture.thumbnail && (<div key={user.id.value + Math.random()}>  
                    <img src={user.picture.thumbnail} alt={user.name.first} height="50px" width="50px"/>
                </div>))
                })}     
            </div>
            
            
        </div>
        <PageFooter />
        </>
    )
}

export default LandingPage
