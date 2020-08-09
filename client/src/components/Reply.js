import React from 'react'
import './reply.css'
import {FaRegTrashAlt } from "react-icons/fa";

export default function Reply({
    name,
    photo,
    date,
    data,
    auth,
    author
}) {
        return (
                <div className="row replyCard">
                        <div className="row cardTop">
                                <div className="col-3 col-sm-2 col-md-1 avatar">
                                        <img alt="avatar" src={photo} />
                                </div>
                                <div className="col-9">
                                        <div className="row">
                                                <h5 style={{marginBottom:"0 !important"}}>{name}</h5>
                                        </div> 
                                </div>
                        </div>
                        <div className="row content pt-3">
                                <div className="row pl-5">
                                        <h6>{data}</h6>
                                </div>
                                <div className="row iconRow pl-3">
                                {auth.user._id === author ? (
                                        <button className="delete"><FaRegTrashAlt/></button>
                                ) : (
                                        ""
                                )}
                                </div>
                        </div>
                </div>
        )
}
