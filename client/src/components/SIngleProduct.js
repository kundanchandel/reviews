import React from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

export default function SIngleProduct({ product }) {
  return (
    <div className="col-xs-12 col-sm-6 col-md-3 p-3">
      <Link to={`/item/${product._id}`} style={{color:"grey"}}>
        <div className="card">
          <img
            className="card-img-top"
            src={product.photoUrl}
            alt="Card image cap"
          />
          <div className="card-body">
            <StarRatings
              rating={3.55}
              starRatedColor="orange"
              starDimension="20px"
              starSpacing="5px"
            />
            <h5 className="card-title">{product.productName}</h5>
            <p className="card-text">{product.productDescription}</p>
          </div>
          <div className="card-footer">
            <small className="text-muted">{product.category}</small>
          </div>
        </div>
      </Link>
    </div>
  );
}
