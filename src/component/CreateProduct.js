import React, { useState } from 'react';
import "./CreateProduct.css";
import axios from "axios";
import Header from './Header';

function CreateProduct({click}) {
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState("")
    const [disc, setDisc] = useState("")
    const [price, setPrice] = useState("")


    console.log(file)

    const SubmitHandler=async(e)=>{
        e.preventDefault()
        let mainData;

        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "infocus")
        data.append("cloud_name", "philomath")

        try {
            const res = await axios.post("	https://api.cloudinary.com/v1_1/philomath/image/upload", data)
            mainData = res?.data.url;
            console.log(mainData)
        } catch (err) {
            console.log(err)
        }
        console.log(mainData)

        try {
            console.log(mainData)
            const responsedData = await axios.post(`https://server.jerryroy.repl.co/api/product`,{
                title:title,
                image:mainData,
                disc:disc,
                price:price
            })
            console.log("responsedData", responsedData.data)
            setTimeout(()=>{
                setTitle("")
                setDisc("")
                setPrice("")
                setFile(null)
            },3000)
        } catch (err) {
            console.log(err)
        }
        
    }

    return (
        <>
            <Header click={click}/>
            <div className="createProduct">
                <div className="createProduct-wrap">
                    <div className="ulpoadProduct">
                        <label htmlFor="file" >
                            <span className="ulpoad">UPLOAD</span>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                accept=".jpg,.jpeg,.png"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                        {
                            file ? (
                                <div className="uploadedPicture">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt=""
                                        className="productpicture"
                                    />
                                    <span className="cancel-picture" onClick={() => setFile(null)}>x</span>
                                </div>
                            ) : (
                                <div className="uploadedPicture">
                                    + Add Product Picture
                                </div>
                            )
                        }
                    </div>
                    <form className="ulpoadProductDetail" onSubmit={SubmitHandler}>
                        <label htmlFor="title" className="label">
                            Title:
                            <input
                                className="productDetail-title Detail"
                                type="text"
                                name="title"
                                id="title"
                                onChange={(e)=>setTitle(e.target.value)}
                            />
                        </label>
                        <label htmlFor="textarea" className="label">
                            Discription:
                            <textarea
                                className="productDetail-disc Detail"
                                type="text"
                                name="disc"
                                id="textarea"
                                onChange={(e)=>setDisc(e.target.value)}
                            />
                        </label>
                        <label htmlFor="price" className="label">
                            Price:
                            <input
                                className="productDetail-price Detail"
                                type="text"
                                name="price"
                                id="price"
                                onChange={(e)=>setPrice(e.target.value)}
                            />
                        </label>
                        <button
                            type="text"
                            className="upload-submitbtn Detail"
                        >
                            Submit
                        </button>

                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateProduct
