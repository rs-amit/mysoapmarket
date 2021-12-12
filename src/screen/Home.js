import React, { useState, useEffect } from 'react';
import "./Home.css";
import Header from '../component/Header';
import Products from '../component/Products';
import Salesman from '../component/Salesman';
import { StateHandler } from "../Context/StoreContext";
import axios from 'axios';


function Home({click}) {
    const [state, setState] = useState([])
    const [salesman, setSalesman] = useState([])

    const { user, dispatch } = StateHandler()

    console.log(user.admin)


    useEffect(() => {
        const getData = async () => {
            const res = await axios.get('https://server.jerryroy.repl.co/api/product')
            setState(res.data.product)
        }
        getData()
    }, [])
    useEffect(() => {
        const getSaleman = async () => {
            const res = await axios.get('https://server.jerryroy.repl.co/api/salesman')
            setSalesman(res.data.salesman)
        }
        getSaleman()
    }, [])

    return (
        <>
            <Header click={click} />
            <div className="home">
                <div className="home-Wrap">
                    <Products state={state} setState={setState} />
                </div>
                {
                    user.admin === true && (
                        <div className="home-salesman">
                            <Salesman salesman={salesman} setSalesman={setSalesman} />
                        </div>

                    )
                }
            </div>
        </>
    )
}

export default Home
