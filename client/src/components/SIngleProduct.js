import React from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import './singleProduct.css'

export default function SIngleProduct({ product }) {
  
  return (
    <div className="col-12 col-sm-6 col-md-4 p-2">
      <Link to={`/item/${product._id}`} style={{color:"grey"}}>
        <div className="card">
          <img
            className="card-img-top"
            src={product.photoUrl}
            alt="Card image cap"
          />
          <div className="card-body">
            <StarRatings
              rating={product.avgRating}
              starRatedColor="orange"
              starDimension="20px"
              starSpacing="5px"
            />
            <h5 className="card-title">{product.productName}</h5>
            
          </div>
          <div className="card-footer">
            <small className="text-muted">{product.category}</small>
          </div>
        </div>
      </Link>
    </div>
  );
}
