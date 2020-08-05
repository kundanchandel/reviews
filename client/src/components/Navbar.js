import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { FaSearch} from "react-icons/fa";
class Navbar extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
     
          <a href="/api/logout" className="nav-link nav-item">
            <img
              className="rounded-circle"
              src={user.photo}
              alt={user.name}
              style={{ width: "25px", marginRight: "5px" }}
              title="You must have a Gravatar connected to your email to display an image"
            />
            Logout
          </a>
       
    );

    const guestLinks = (
     
        
          <a className="nav-link nav-item" href="/auth/google">
            Login with Google
          </a>
        
      
    );

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <Link to='/' className="navbar-brand">
                    <img src=" https://i.postimg.cc/NF91c7zR/MRC.jpg" width="50" height="50" alt=""/>
                </Link>
                <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                    <form className="form-inline m-auto">
                        <div className="input-group">                    
                            <input type="text" className="form-control" placeholder="Find a company or a mentor."/>
                            <div className="input-group-append">
                                <button type="button" className="btn btn-secondary"><FaSearch/></button>
                            </div>
                        </div>
                    </form>
                    <div className="navbar-nav">
                        {isAuthenticated?authLinks:guestLinks}
                    </div>
                </div>
            </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Navbar);
