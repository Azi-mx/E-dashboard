import React from 'react'
import {useState,useEffect} from 'react';
import {useNavigate,useParams} from 'react-router-dom';

export default function () {
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [category,setCategory] = useState('');
    const [company,setCompany] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        // console.log(params);
        getProductDetails();
    },[])

    const getProductDetails = async ()=>{
        let result = await fetch(`https://e-dashboard-x01t.onrender.com/product/${params.id}`,{
        headers: {
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }})
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);

    }
    const updateProduct = async ()=>{
        console.log(name,price,category,company);
        let result = await fetch(`https://e-dashboard-x01t.onrender.com/product/${params.id}`,
        {
            method:"Put",
            body:JSON.stringify({name,price,category,company}),
            headers:{
                'Content-type':'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`

              }
        })
        //It return a promise so we use await 
        result = await result.json();
        console.log(result);
        navigate('/')
    }
  return (
    <div className="addproduct">
        <h1>Update Product</h1>
        <input type="text" className="inputBox" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Product Name"/>
        

        <input type="text" className="inputBox" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Enter Product Price"/>
       
    
        <input type="text" className="inputBox" value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="Enter Product Category"/>
        
        
        <input type="text" className="inputBox" value={company} onChange={(e)=>setCompany(e.target.value)} placeholder="Enter Product Company"/>
        
        
        <button className="app-button" onClick={updateProduct}>Update</button>
    </div>
  )
}
