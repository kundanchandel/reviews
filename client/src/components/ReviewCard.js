import React from "react";
import StarRatings from "react-star-ratings";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import {connect} from 'react-redux';

function ReviewCard({
  image,
  name,
  rating,
  title,
  description,
  comment,
  auth,
  onDelete
}) {
  return (
    <div className="row reviewCard">
      <div className="clo-2 avatar">
        
        <h5>{name}</h5>
      </div>
      <div className="col-10 content">
        <StarRatings
          rating={rating}
          starRatedColor="orange"
          starDimension="20px"
          starSpacing="5px"
        />
        <h5>{title}</h5>
        <p>{description}</p>
        <div className="row">
          <div className="col-6">
        {auth.user._id===comment.author?<button onClick={()=>onDelete(comment._id)} >delete</button>:""}            
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  
  export default connect(mapStateToProps, {})(ReviewCard);