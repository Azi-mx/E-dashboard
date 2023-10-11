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
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
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
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
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

            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Category</th>
                        <th scope="col">Company</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Render product list */}
                    
                        {products.length > 0 ? products.map((i, index) =>
                        <tr key={i._id}>
                           
                                <td>{index + 1}</td>
                                <td>{i.name}</td>
                                <td>${i.price}</td>
                                <td>{i.category}</td>
                                <td>{i.company}</td>
                                <td>
                                    {/* Delete button with an onclick handler */}
                                    <button type="button" onClick={() => deleteProduct(i._id)} className="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                                    {/* Update button as a Link */}

                                    <Link to={`/update/${i._id}`}><button type="button" className="btn btn-warning"><i class="fa-solid fa-pen"></i></button>
                                    </Link>
                                </td>
                            </tr>
                        )
                             :
                             <tr>
                            <td colSpan="6"><h1>No Result Found</h1></td>
                            </tr>
                        }
                    

                </tbody>
            </table>

        </div>
    );
}

export default ProductList;
