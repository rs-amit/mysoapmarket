import React,{useEffect, useState} from 'react';
import "./Products.css";
import {Link} from "react-router-dom"
import axios from 'axios';
import { StateHandler } from "../Context/StoreContext";


function Products({ state, setState}) {

    const { user, dispatch } = StateHandler()
    console.log(user?.admin)
    const [admin, setAdmin] = useState(user?.admin)



    const clickHandler=async(productId)=>{
        try{
           const res = await axios.delete(`https://server.jerryroy.repl.co/api/product/${productId}`)
           setState(res.data.allProductData)
           console.log(res.data.allProductData)
        }catch(error){
           console.log(error)
        }
    }

    const hideHandler=(productId)=>{
        const filterProduct = state.filter((item)=>{
            if(item._id !== productId){
                return item
            }
        })
        setState(filterProduct)
    }

    const CartHandler=async(currentuserId,id,title,disc,img,price)=>{
         try{
             const res = await axios.post(`https://server.jerryroy.repl.co/api/cart`,{
                userId:currentuserId,
                productId:id,
                title:title,
                disc:disc,
                image:img,
                price:price
             })
             console.log(res.data)
         }catch(error){

         }
    }

    return (
        <>
            {
                state?.map((product, keys) => {
                    return (
                        <div className="product" keys={product._id}>
                            <img
                                src={product.image}
                                alt=""
                                className="product-img"
                            />
                            <div className="product-wrap">
                                <div className="product-title">{product.title}</div>
                                <div className="product-disc">{product.disc}</div>
                                <span className="product-price">₹ {product.price}</span>
                                {
                                    admin?(
                                    <div>
                                        <button className="deletebtn" onClick={()=>clickHandler(product._id)}>Delete</button>
                                        <button className="Editbtn" onClick={()=>hideHandler(product._id)}>Hide</button>
                                    </div>):
                                    (<button className="product-button" onClick={()=>CartHandler(user?._id,product._id,product.title,product.disc,product.image,product.price)}>Add To Basket</button>)
                                }
                            </div>
                        </div>
                    )
                })
            }

        </>
    )
}

export default Products
