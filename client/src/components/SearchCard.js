import React from "react";
import { Link } from "react-router-dom";
import './searchCard.css'

export default function SearchCard({ matches }) {
  return (
    <>
      {matches.map((match) => {
        return (
        <div className="searchCard">
          <Link key={match._id} to={`/item/${match._id}`}>
                <p>{match.productName} <small>in {match.category}</small></p>
          </Link>
          </div>
        );
      })}
    </>
  );
}
