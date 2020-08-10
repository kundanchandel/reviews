import React from "react";
import { Link } from "react-router-dom";

export default function SearchCard({ matches }) {
  return (
    <>
      {matches.map((match) => {
        return (
          <Link key={match._id} to={`/item/${match._id}`}>
            <div className="search">
              <p style={{ color: "black" }}>{match.productName}</p>
            </div>
          </Link>
        );
      })}
    </>
  );
}
