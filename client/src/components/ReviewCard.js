import React from "react";
import StarRatings from "react-star-ratings";
import { FaRegThumbsUp, FaRegThumbsDown,FaRegTrashAlt } from "react-icons/fa";
import { connect } from "react-redux";

function ReviewCard({
  image,
  name,
  rating,
  title,
  description,
  comment,
  auth,
  onDelete,
}) {
  return (
    <div className="row reviewCard">
      <div className="row">
        <div className="col-2 avatar">
          <img alt="avatar" src={image} />
        </div>
        <div className="col-10">
          <div className="row">
             <h5>{name}</h5>
          </div>
          <div className="row">
          <StarRatings
              rating={rating}
              starRatedColor="orange"
              starDimension="20px"
              starSpacing="5px"
            />
          </div>
              
        </div>
      </div>
      <div style={{width:"100%", height:"2px",backgroundColor:"grey", marginTop:"2px"}}></div>
      <div className="row content pt-3">
          <div className="row pl-5">
                <h6>{title}</h6>
          </div>
          <div className="row pl-5">
                <p>{description}</p> 
          </div>
          
        <div className="row iconRow">
          <div className="col-6 col-sm-4">
                <button className="icons useful"><FaRegThumbsUp/> USEFUL</button>
          </div>
          <div className="col-6 col-sm-4">
                <button className="icons notUseFul"><FaRegThumbsDown/> NOT USEFUL</button>
          </div>
          <div className="col-12 col-sm-4">
            {auth.user._id === comment.author ? (
              <button className="delete" onClick={() => onDelete(comment._id)}><FaRegTrashAlt/></button>
            ) : (
              ""
            )}
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
