import React from 'react'
import PageHeader from "./../components/PageHeader"
import PageFooter from "./../components/PageFooter"
import './../App.css'

function LandingPage() {
    return (
        <>
        <PageHeader />
        <div style={{background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),  url("/images/hero-img.jpg")`}} className="hero-img">
            <div className="container hero-body">
                <h1>RENTIFY</h1>
                <h5>your one stop solution for vehicle renting</h5>
            </div>
        </div>
        <PageFooter />
        </>
    )
}

export default LandingPage
