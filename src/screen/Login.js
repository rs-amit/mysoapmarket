import React,{useState} from 'react';
import Header from '../component/Header';
import LoginImg from "../assert/Login.svg";
import "./Login.css";
import axios from 'axios';
import {StateHandler} from "../Context/StoreContext";


function Login({click}) {

    const [email, setEmail] = useState("sddc@gmail.com");
    const [password, setPassword] = useState("sdds258");
    const [error, setError] = useState(null);
    console.log(error)

    const {user, dispatch} = StateHandler()
    
    const submitHandler=async(e)=>{
        e.preventDefault()
        console.log("email and password",email,password)
        try{
            dispatch({type:"LOGIN-BEGIN"})

            const res = await axios.post('https://server.jerryroy.repl.co/api/salesman/login',{email,password})
            console.log(res.data.user)
            dispatch({type:"LOGIN-SUCCESSFUL",PayLoad:res.data.user})
            if(res){
                setEmail("")
                setPassword("")
            }
        }catch(err){
            setTimeout(()=>{
                setError("")
            },3000)
            setError(err.response?.data.message)
        }
       
    }

    return (
        <>
            {/* <Header click={click}/> */}
            {error && <div>{error}</div>}
            <div className="login">
                <div className="login-Wrap">
                    <div className="login-banner">
                        <img
                            src={LoginImg}
                            alt=""
                            className="imgBanner"
                        />
                    </div>
                    <div className="login-field">
                        <form className="loginForm" onSubmit={submitHandler}>
                            <input 
                               className="loginInput" 
                               placeholder="Email" 
                               value={email}
                               onChange={(e)=>setEmail(e.target.value)}
                               />
                            <input  
                               type="password"  
                               placeholder="password" 
                               className="loginInput"
                               value={password}
                               onChange={(e)=>setPassword(e.target.value)}
                               />
                            <button type="submit" className="loginSubmit" type="pass" placeholder="password" >Submit</button>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
