import React from 'react'

function AddProduct() {
    return (
        <div>
            <h1>Going to add product</h1>     
            <div>
                <form action="">
                <div className="form-group">
                        <label htmlFor="">Name</label>
                        <input type="name" name="name" id="brand" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Brand</label>
                        <input type="text" name="brand" id="brand" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Model</label>
                        <input type="text" name="model" id="model" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Wheels</label>
                        <input type="text" name="wheels" id="wheels" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Seater</label>
                        <input type="text" name="seater" id="seater" className="form-control"/>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default AddProduct
