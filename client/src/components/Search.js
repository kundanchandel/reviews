import React, { useState } from "react";
import "./Search.css";
import SearchCard from "./SearchCard";

export default function Search({ products }) {
  const [search, setSearch] = useState("");
  
  const [matches,setMatches]=useState([]);
  const handleOnChange = (e) => {
    setSearch(e.target.value);
    let matches = products.filter((product) => {
      const regex = new RegExp(`^${search}`, "gi");
      return product.productName.match(regex);
    });
    setMatches(matches);
    console.log(matches);
    
   
    
  };

  return (
    <div className="bg">
      <div>
        <h1>SEARCH COURSE AND MENTOR REVIEWS</h1>
      </div>
      <div>
        <p>FIND THE RIGHT PROGRAM TO HELP ADVANCE YOUR LIFE</p>
      </div>
      <div className="search">
        <input
          type="text"
          name="search"
          onChange={handleOnChange}
          placeholder="Type here"
          value={search}
        />
        <a href="">search</a>
      </div>
        {matches.length>0 && search!==''?<SearchCard matches={matches}/>:''}
    </div>
  );
}
