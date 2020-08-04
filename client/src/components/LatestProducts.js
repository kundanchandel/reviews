import React from "react";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";

export default function LatestReview({ products }) {
  const trimDesc=(description)=>{
    return description.substring(0,100)
  }
  const products2 = products.slice(0, 3);
  return (
    <div>
      <div className="container latest_review">
        <div className="row latest_review_top">
          <div className="col-12">
            <h2>Latest Reviews</h2>
          </div>
          <div className="col-12">
            <h6>Our authors have released some new reviews</h6>
          </div>
        </div>
        <div className="row">
          {products2.map((product) => {
            return (
              <div key={product._id} className="col-xs-12 col-sm-6 col-md-4">
                <Link to={`/product/${product._id}`}>
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
                      <p className="card-text">{trimDesc(product.productDescription)}</p>
                    </div>
                    <div className="card-footer">
                      <small className="text-muted">{product.category}</small>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
