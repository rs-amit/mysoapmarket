import React, { useState } from 'react';
import "./SideBar.css";
import { Link } from "react-router-dom";
import { StateHandler } from "../Context/StoreContext";



function SideBar({click,show}) {

    const { user, dispatch } = StateHandler()
    console.log(user?.admin)
    const [admin, setAdmin] = useState(user && user.admin)
    console.log(admin)

    return (
        <div className={show ? "sidebar show" : "sidebar"}>
            {
                admin ? (
                    <div className='sidebar-wrap'>
                        <Link 
                            to="/Toadd" 
                            onClick={click}
                        >
                            <div className='sidebaer-nav'>TO Add</div>
                        </Link>
                        <Link 
                            to="createProduct" 
                            onClick={click}
                        >
                            <div className='sidebaer-nav'>UPload</div>
                        </Link>
                        <Link 
                            to="/SalesMan" 
                            onClick={click}
                        >
                            <div className='sidebaer-nav'>salesman</div>
                        </Link>
                    </div>

                ) : (
                    <div className='sidebar-wrap'>
                        <Link to={`/Profile/${user?._id}`} onClick={click}><div>{user?.name}</div></Link>
                    </div>
                )
            }


        </div>
    )
}

export default SideBar
