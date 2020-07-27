import React, { useState } from 'react'
import './Search.css'
export default function Search() {
    const [search,setSearch]=useState('')
    const handleOnChange=(e)=>{
        setSearch(e.target.value)
    }

    return (
        <div className="bg">
        <div>
            <h1>SEARCH COURSE AND MENTOR REVIEWS</h1>
        </div>
        <div>
            <p>FIND THE RIGHT PROGRAM TO HELP ADVANCE YOUR LIFE</p>
        </div>
        <div className="search" >
            <input type="text" name="search" onChange={handleOnChange} placeholder="type here" value={search} />
            <a href="">search</a>
        </div>
    </div>
    )
}
