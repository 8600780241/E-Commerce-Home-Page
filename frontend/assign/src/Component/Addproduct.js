import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        image: null,
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, price, image } = formData;

        const formDataToSend = new FormData();
        formDataToSend.append('name', name);
        formDataToSend.append('price', price);
        formDataToSend.append('image', image);

        try {
            console.log(formData)
            await axios.post('http://localhost:8000/product/addproduct', formDataToSend);
            navigate('/');
        } catch (error) {
            console.error('Error adding product: ', error);
        }
    };
    return (
        <>
            <div>
                <div >
                    <h2 >Add Product</h2>
                    <form onSubmit={handleSubmit} >
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", marginLeft: "480px", width: "500px", height: "600px", border: "5px solid #135D66", borderRadius: "6px" }}>
                            <div>
                                <input type="text" placeholder='product name' name="name" onChange={handleChange} />
                            </div>
                            <div >
                                <input type="text" placeholder='price' name="price" onChange={handleChange} />
                            </div>

                            <div   >
                                <input type="file" onChange={handleFileChange} name='image'/>
                            </div>
                            <div style={{ position: "relative", top: "70px", left: "100px" }}>
                                <button type="submit" class="btn btn-primary" style={{ margin: "20px" }}>Save</button>
                                <button type="button" class="btn btn-light" style={{ margin: "20px" }} onClick={() => { navigate('/') }} >cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}