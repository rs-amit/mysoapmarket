import React, { useState, useEffect } from "react";
import "./Profile.css";
import Header from "../component/Header";
import { useParams } from "react-router-dom"
import axios from 'axios';

function Profile({click}) {

    const [cart, setCart] = useState([])
    console.log(cart)

    const SalesManId = useParams()
    // console.log(SalesManId.id)
    useEffect(() => {
        const cartFunc = async () => {
            const res = await axios.get(`https://server.jerryroy.repl.co/api/cart/${SalesManId.id}`)
            setCart(res.data.cart)
        }
        cartFunc()
    }, [SalesManId.id])

    const DeleteHandler=async(id)=>{
        try{
           const res = await axios.delete(`https://server.jerryroy.repl.co/api/cart/${id}`)
           setCart(res.data.allCartData)
           console.log(res.data.allCartData)

        }catch(error){
           console.log(error.response?.data.message)
        }

    }


    return (
        <>
            <Header click={click}/>
            <div className="cart">
                <div className="cartscreen-right">
                    {
                        cart.map((item) => {
                            return (
                                <div className="cartItem">
                                    <img
                                        src={item.image}
                                        alt="image"
                                        className="cartimg"
                                    />
                                    <div className="cartitem-info">
                                        <div className="cartitem-title">{item.title}</div>
                                        <div className="cartitem-disc">{item.disc}</div>

                                        <div className="cartitem-price">₹ {item.price}</div>

                                        <div className="remove-btn">
                                            <button className="removebtn" onClick={()=>DeleteHandler(item._id)}>Remove From Carts</button>
                                        </div>
                                    </div>
                                </div>

                            )

                        })
                    }
                </div>
                {/* <div className="cartscreen-left">
                    <p className="subtotal">subtotal( {setCartCount()} items) : <strong>₹ {setTotalCartPrice()}</strong></p>
                    <button>proceed to checkout</button>
                </div> */}
            </div>
        </>
    )
}

export default Profile
