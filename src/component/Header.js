import React, { useState } from 'react';
import "./Header.css";
import { Link } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import { StateHandler } from "../Context/StoreContext";



function Header({click}) {

    const { user, dispatch } = StateHandler()

    console.log(user?.admin)
    const [admin, setAdmin] = useState(user?.admin)

    const LogoutHandler = () => {
        console.log("its working...")
        localStorage.removeItem('salesperson')
        dispatch({
            type: "LOGOUT-USER",
        })
    }


    return (
        <div className="header">
            <div className="menu-icon">
                <MenuIcon onClick={click} />
            </div>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}><div className="logo">nexTEDGE</div></Link>
            <div className="navigator">
                {
                    admin ? (
                        <div>
                            <div className="">
                                <Link
                                    to="/Toadd"
                                    style={{ textDecoration: "none", color: "black" }}
                                >
                                    <span className="nav">TO add</span>
                                </Link>
                                <Link
                                    to="/createProduct"
                                    style={{ textDecoration: "none", color: "black" }}
                                >
                                    <span className="nav">UPLoad</span>
                                </Link>
                                <Link
                                    to="/SalesMan"
                                    style={{ textDecoration: "none", color: "black" }}
                                >
                                    <span className="salesMan nav">Salesman</span>
                                </Link>

                                <Link
                                    to="/Login"
                                    style={{ textDecoration: "none", color: "black" }}
                                >
                                    <span className="loginbtn" onClick={LogoutHandler}>{user ? "Logout" : "login"}</span>
                                </Link>
                            </div>
                            <div>

                            </div>
            

                        </div>
                    ) : (
                        <>
                            <div className="navigator">
                                <Link
                                    to={`/Profile/${user?._id}`}
                                    style={{ textDecoration: "none", color: "black" }}
                                >
                                    <span className="nav">{user?.name}</span>
                                </Link>
                                <Link
                                    to="/Login"
                                    style={{ textDecoration: "none", color: "black" }}
                                >
                                    <span className="loginbtn" onClick={LogoutHandler}>{user ? "Logout" : "login"}</span>
                                </Link>
                            </div>
                        </>
                    )
                }
            </div>

        </div>
    )
}

export default Header
