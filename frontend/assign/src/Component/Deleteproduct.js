import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function DeleteCategory() {
    const navigate = useNavigate();
    const { id } = useParams();
    function Cancel() {
        navigate('/')
    }
    const deleteProduct = async () => {
        try {
            await axios.delete(`http://localhost:8000/product/deleteproduct/${id}`);
            navigate('/');
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };
    return (<>
        <form class="modal-content" >
            <div class="container">
                <h1>Delete</h1>
                <p style={{
                    fontFamily: "Poppins",
                    fontSize: "30px",
                    fontWeight: "400",
                    lineHeight: "32px",
                    textAlign: "center",
                }}>Are you sure you want to Delete?</p>

                <div class="clearfix">
                    <button type="button" class="cancelbtn" style={{
                        fontFamily: "Inter",
                        fontSize: "16.17px",
                        borderRadius: '8px',
                        textAlign: "center",
                        width: "100px",
                        margin: '20px'
                    }} onClick={Cancel}>Cancel</button>
                    <button type="button" class="deletebtn" style={{
                        fontFamily: "Inter",
                        fontSize: "16.17px",
                        borderRadius: '8px',
                        textAlign: "center",
                        width: "100px",
                        margin: '20px',
                        backgroundColor: "#662671",
                        color: "white"
                    }} onClick={deleteProduct}>Delete</button>
                </div>
            </div>
        </form>
    </>)
}
