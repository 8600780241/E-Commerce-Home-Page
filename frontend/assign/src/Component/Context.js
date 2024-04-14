import React, { useState } from 'react'


const CartContext = React.createContext();

const CartProvider = (props) => {
    const [cart, setCart] = useState([]);
    const addCartData = (data) => {
        setCart([...cart, data])
    }
    return (

        <CartContext.Provider value={{ cart, addCartData }}>
            {props.children}
        </CartContext.Provider>

    )
}

export { CartContext, CartProvider }