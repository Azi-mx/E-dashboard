import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
    // State to hold the list of products
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Call the function to fetch products when the component mounts
        getProducts();
    }, []);

    // Function to fetch the list of products from the server
    const getProducts = async () => {
        // Send a GET request to fetch products, including the authorization token
        let result = await fetch('https://e-dashboard-x01t.onrender.com/products', {
            headers: {
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        // Parse the response as JSON and update the products state
        result = await result.json();
        setProducts(result);
    };

    // Function to delete a product by its ID
    const deleteProduct = async (id) => {
        // Send a DELETE request to delete the product by ID
        let result = await fetch(`https://e-dashboard-x01t.onrender.com/product/${id}`, {
            method: 'Delete',
            headers: {
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }

        });

        // Parse the response as JSON
        result = await result.json();

        if (result) {
            // If deletion is successful, refresh the products list
            getProducts();
        }
    };

    // Function to handle product search
    const searchhandle = async (event) => {
        let key = event.target.value;

        if (key) {
            // Send a GET request to search for products using the provided key
            let result = await fetch(`https://e-dashboard-x01t.onrender.com/search/${key}`);
            result = await result.json();

            if (result) {
                // Update the products state with the search results
                setProducts(result);
            }
        } else {
            // If search key is empty, refresh the products list
            getProducts();
        }
    };

    return (
        <div className='product-list'>
            <h1>Product List</h1>
            {/* Input field for product search */}
            <input type="text" className='search' onChange={searchhandle} placeholder='Search Product' />
            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Actions</li>
            </ul>
            {/* Render product list */}
            {products.length > 0 ? products.map((i, index) =>
                <ul key={i._id}>
                    <li>{index + 1}</li>
                    <li>{i.name}</li>
                    <li>${i.price}</li>
                    <li>{i.category}</li>
                    <li>{i.company}</li>
                    <li>
                        {/* Delete button with an onclick handler */}
                        <button type="button" onClick={() => deleteProduct(i._id)} className="btn btn-danger">Delete</button>
                        {/* Update button as a Link */}
                        <Link to={`/update/${i._id}`}><button type="button" className="btn btn-warning">Update</button></Link>
                    </li>
                </ul>
            )
            :
            <h1>No Result Found</h1>
            }
        </div>
    );
}

export default ProductList;
