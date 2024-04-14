
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from './Context';
import { useNavigate } from 'react-router-dom';
export default function Home() {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const { cart, addCartData } = useContext(CartContext)
    const nav = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/product/getproduct');
                setProducts(response.data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);
    useEffect(() => {
        const handleSearch = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/product/searchproduct?name=${query}`);
                setResults(response.data.products);
            } catch (error) {
                console.error('Error searching:', error);
            }
        };
        handleSearch();
    }, [query])
    console.log(products)
    return (
        <div>
            <h2 style={{ fontSize: "38px", color: "#003C43" }}>Buy Less, Choose Well</h2>
            <div style={{ display: "flex", justifyContent: "space-around", margin: "40px" }} >
                <div class="form-group has-search">
                    <input type="text" class="form-control" placeholder="Search products...." value={query}
                        onChange={e => setQuery(e.target.value)} style={{ color: "#344955", width: "450px", height: "40px", fontSize: "20px" }} />
                </div>

                <div>
                    <button type="button" class="btn" style={{ backgroundColor: "#662671", color: "white", width: "100px", height: "40px" }} onClick={() => nav('/addproduct')}>Add New</button>
                </div>
            </div>
            {results.length !== 0 ? (<div className="grid-container">
                {results.map(product => (
                    <div key={product._id} className="grid-item">
                        <h3 style={{ marginRight: "100px" }}>{product.name}</h3>
                        <img src={product.image} alt={product.name} />
                        <p style={{ color: "#003C43", fontWeight: "bolder", position: "relative", left: "70px" }}> Rs. {product.price}</p>
                        <Link to={`/editproduct/${product.id}`}>
                            <button className="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit" style={{ backgroundColor: "green", color: "whitesmoke", border: "1px soild #003C43", borderRadius: "4px", width: "60px", height: "26px", position: "relative", left: "40px", bottom: "10px" }}>Edit</button></Link>
                        <Link to={`/deleteproduct/${product.id}`}><button className="btn btn-danger btn-sm rounded-0" type="button" title="Delete" style={{ backgroundColor: "red", color: "whitesmoke", margin: "14px", border: "1px soild #003C43", borderRadius: "4px", position: "relative", left: "40px", bottom: "10px" }}>
                            Delete
                        </button></Link>
                        <Link to="/cart">
                            <button style={{ width: "100px", height: "40px", position: "relative", left: "87px", top: "20px", backgroundColor: "#49243E", color: "white" }} onClick={() => { addCartData(product) }} >Add Cart</button></Link>
                    </div>
                ))}
            </div>) :
                (<div className="grid-container">
                    {products.map(product => (
                        <div key={product._id} className="grid-item">
                            <h3 style={{ marginRight: "100px" }}>{product.name}</h3>
                            <img src={product.image} alt={product.name} />
                            <p style={{ color: "#003C43", fontWeight: "bolder", position: "relative", left: "70px" }}> Rs. {product.price}</p>
                            <Link to={`/editproduct/${product.id}`}>
                                <button className="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit" style={{ backgroundColor: "green", color: "whitesmoke", border: "1px soild #003C43", borderRadius: "4px", width: "60px", height: "26px", position: "relative", left: "40px", bottom: "10px" }}>Edit</button></Link>
                            <Link to={`/deleteproduct/${product.id}`}><button className="btn btn-danger btn-sm rounded-0" type="button" title="Delete" style={{ backgroundColor: "red", color: "whitesmoke", margin: "14px", border: "1px soild #003C43", borderRadius: "4px", position: "relative", left: "40px", bottom: "10px" }}>
                                Delete
                            </button></Link>
                            <Link to='/cart'>
                                <button style={{ width: "100px", height: "40px", position: "relative", left: "87px", top: "20px", backgroundColor: "#49243E", color: "white" }} onClick={() => { addCartData(product) }}>Add Cart</button></Link>
                        </div>
                    ))}
                </div>)
            }
        </div>
    );
};