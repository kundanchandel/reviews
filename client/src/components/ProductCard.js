import React from "react";
import StarRatings from "react-star-ratings";

export default function ProductCard({ product }) {
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
          <div className="col-xs-12 col-sm-6 col-md-4">
            <div class="card">
              <img
                class="card-img-top"
                src="https://images.unsplash.com/photo-1593642532871-8b12e02d091c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt="Card image cap"
              />
              <div class="card-body">
                <StarRatings
                  rating={3.55}
                  starRatedColor="orange"
                  starDimension="20px"
                  starSpacing="5px"
                />
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
              <div class="card-footer">
                <small class="text-muted">By: Harsh Solanki</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
