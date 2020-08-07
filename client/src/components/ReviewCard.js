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
      <div className="row cardTop">
        <div className="col-3 col-sm-2 col-md-1 avatar">
          <img alt="avatar" src={image} />
        </div>
        <div className="col-9">
          <div className="row">
             <h5 style={{marginBottom:"0 !important"}}>{name}</h5>
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
      <div className="row content pt-3">
          <div className="row pl-5">
                <h6>{title}</h6>
          </div>
          <div className="row pl-5" style={{borderBottom:"1px solid lightgrey",marginBottom:"5px"}}>
                <p>{description}</p> 
          </div>
          <hr/>
        <div className="row iconRow pl-3">
          <div className="col-2">
                <button className="icons useful"><FaRegThumbsUp/></button>
          </div>
          <div className="col-2">
                <button className="icons notUseFul"><FaRegThumbsDown/></button>
          </div>
          <div className="col-2">
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
