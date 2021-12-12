import React, { useState } from 'react';
import Header from '../component/Header';
import "./Toadd.css";
import img from "../assert/Authantication.svg";
import axios from "axios";

function Toadd({click}) {

    // const [dataInput, setdataInput] = useState({})
    const [UserName, setUserName] = useState("")
    const [Email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [admin, setAdmin] = useState(false)
    const [message, setMessage] = useState("")


    function SubmitHandler(e) {
        e.preventDefault()
        if (UserName && Email && password) {
            const getSaleman = async () => {
                const res = await axios.post('https://server.jerryroy.repl.co/api/salesman', {
                    name:UserName,
                    email:Email,
                    admin:admin,
                    password:password
                })
                setMessage(res.data.message)
                setTimeout(() => {
                    setMessage("")
                    setUserName("")
                    setPassword("")
                    setEmail("")
                    setAdmin(false)
                }, 1000)
            }
            getSaleman()

        } else {
            setMessage("Please complete all the Fields")
            setTimeout(() => {
                setMessage("")
            }, 1000)
        }
    }


    return (
        <>
            <Header click={click}/>
            <div className="toadd">
                {message && <div className="alertmessage">{message}</div>}
                <div className="toadd-wrap">
                    <div className="banner">
                        <img
                            src={img}
                            alt=""
                            className="banner-image"
                        />
                    </div>
                    <div className="toadd-salesman">
                        <form className="Register-input" onSubmit={SubmitHandler}>
                            <input
                                className="toadd-input"
                                type="text"
                                name="name"
                                value={UserName}
                                placeholder="Enter FirstName"
                                onChange={(e)=>setUserName(e.target.value)}
                            />
                            <input  
                                className="toadd-input"
                                type="text"
                                name="email"
                                value={Email}
                                placeholder="Enter Email"
                                onChange={(e)=>setEmail(e.target.value)}

                            />
                            <input
                                className="toadd-input"
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Enter Password"
                                onChange={(e)=>setPassword(e.target.value)}

                            />
                            <label className="adminlebal">
                                <input 
                                   type="checkbox" 
                                   checked={admin ? true : false}
                                   className="checkAdmin"   
                                   onClick={()=>setAdmin(true)}
                                /> 
                                Are You Owner Shop?
                            </label>  
                            <button
                                type="submit"
                                className="submit"
                            >Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Toadd
