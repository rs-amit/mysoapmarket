import React, { useState, useEffect } from 'react';
import "./Salesman.css";
import { Link } from "react-router-dom"
import axios from 'axios';
import { StateHandler } from "../Context/StoreContext";


function Salesman({ salesman, setSalesman }) {
    const { user, dispatch } = StateHandler()
    console.log(user?.admin)
    const [admin, setAdmin] = useState(user?.admin)
    const [data, setData] = useState(user?.admin)


        
    const deleteHandler = async (salesmanId) => {
        console.log(salesmanId)
        try {
            const res = await axios.delete(`https://server.jerryroy.repl.co/api/salesman/${salesmanId}`)
            setSalesman(res.data.getAllSalesman)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        const salesperson = salesman && salesman.filter((item)=>{
            if(item._id == user?._id){
                return item
            }
        })
        setData(salesperson)
    }, [])


    return (
        <>
            {
              salesman && salesman.map((item, key) => {
                    if(item._id !== user._id){
                        return (
                            <>
                                {
                                    admin ? (
    
                                        <div className="salesman">
                                            <Link to={`/profile/${item._id}`} style={{ textDecoration: "none", color: "black" }}>
                                                <div className="salesman-name">{item.name}</div>
                                            </Link>
                                            <button className="salesman-delete" onClick={() => deleteHandler(item._id)}>Delete</button>
                                        </div>
                                    ) : (
                                        <div className="salesman">
                                            <div className="salesman-name">{item.name}</div>
                                            <Link to={`/profile/${item._id}`}
                                                style={{ textDecoration: "none", color: "black" }}
                                            >
                                                <button className="viewbtn">View</button>
                                            </Link>
                                        </div>)
                                }
                            </>
                        );

                    }
                })

            }
        </>
    )
}

export default Salesman
