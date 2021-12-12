import React, { useState, useEffect } from 'react';
import "./SalesMan.css";
import Header from '../component/Header';
import Salesman from '../component/Salesman';
import axios from 'axios';

function SalesMan({ click }) {

    const [salesman, setSalesman] = useState();

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
            <div className="sakesman">
                <div className="sakesman-wrap">
                    <Salesman salesman={salesman} setSalesman={setSalesman}/>
                </div>
            </div>
        </>
    )
}

export default SalesMan
