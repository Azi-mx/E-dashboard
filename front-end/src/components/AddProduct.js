import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
export default function () {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false)

    const navigate = useNavigate();
    const addProduct = async () => {

        if (!name || !price || !category || !company) {
            // Here if anything from name price etc is not entered than the function will not run as is it will
            //return to false 
            setError(true)
            return false
        }

        console.log(name, price, category, company);
        let userid = JSON.parse(localStorage.getItem('user'))._id;

        // console.log(userid)
        const authToken = JSON.parse(localStorage.getItem('token')); // Assuming your authentication token is stored in localStorage

        let result = await fetch('https://e-dashboard-x01t.onrender.com/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userid, authToken }),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${authToken}` // Include the authentication token in the headers
            }
        });

        result = await result.json();

        //
        // let result = await fetch('http://localhost:8000/add-product',{
        //     method:'post',

        //     body:JSON.stringify({name,price,category,company,userid,auth}),
        //     headers:{
        //         'Content-type':'application/json'
        //       }
        // })
        // result = await result.json();
        console.log(result);
        if (result) {
            navigate('/')
        }
    }
    return (
        
            <div class="formbold-main-wrapper">
                <div class="formbold-form-wrapper">
                    <div class="formbold-form-title">
                        <h1>Add Product</h1>
                        <p>There are many variations of passages of Lorem Ipsum available but the majority have.</p>
                    </div>

                    <input type="text" className="formbold-form-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Product Name" />
                    {/*Here we are validating user's input by using useState*/}
                    {error && !name && <span className='invalid-input'>Enter valid name</span>}
                    <input type="text" className="formbold-form-input" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Product Price" />
                    {error && !price && <span className='invalid-input'>Enter valid price</span>}

                    <input type="text" className="formbold-form-input" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter Product Category" />
                    {error && !category && <span className='invalid-input'>Enter valid category</span>}

                    <input type="text" className="formbold-form-input" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Enter Product Company" />
                    {error && !company && <span className='invalid-input'>Enter valid company</span>}
                    <button className="formbold-btn" onClick={addProduct}>Add Product</button>

                </div>
            </div>
       
    )
}
