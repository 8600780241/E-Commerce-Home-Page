import React, { useCallback } from 'react';
import { Link } from "react-router-dom";
import { useRef, useContext } from 'react';
import { CartContext } from './Context';
import useRazorpay from 'react-razorpay'
export default function Cart() {
    const { cart } = useContext(CartContext)
    const total = useRef()
    total.current = 0;
    const Razorpay = useRazorpay();
    const razorpayDisplay = useCallback(async (total) => {
        const options = {
            key: "rzp_test_NrrnluK4fejStNPToN3R2vfxJY",
            amount: total * 1,
            currency: "INR",
            name: "E-Commerce",
            description: "online shopping",
            handler: (res) => {
                console.log(res);
            },
            prefill: {
                name: "saurabh",
                email: "saurabhsakharkar0@gmail.com",
                contact: "8600466004"
            },
            notes: {
                adress: "learning Adress"
            },
            theme: {
                color: "#3399cc",
            }
        }
        const rzp1 = new Razorpay(options);
        rzp1.open();
    }, [Razorpay])
    //   useEffect(() => {
    //     total.current = count.current + 1;
    //   });
    return (<>
        <div className='cartPage'>
            <div className='cart'>

                <header className='shoppingcart'>
                    <h4>Shopping Cart</h4>
                </header>

                <main id="cartData">
                    <section>
                        <section>
                            {cart.map((item, k) => {
                                return (<article key={k}>
                                    <span>
                                        {item.Title}</span>    :
                                    <span>Rs.{item.price}</span>
                                </article>)
                            })}
                        </section>
                    </section>
                </main>

                <footer className='total'>
                    <Link to="/"><button id="btn">continue shopping</button></Link>
                    <>{
                        cart.map((cart) => {
                            total.current = total.current + cart.price
                            // return (
                            //     <h3>total:${total.current}</h3>
                            // )
                        })
                    }
                    </>
                    <h3>total:  Rs. {total.current}</h3>
                    <button type='button' id='checkout' onClick={() => { razorpayDisplay(total.current) }}>CheckOut</button>
                </footer>

            </div>
        </div>
    </>)
}