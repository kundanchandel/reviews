import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { FaSearch } from "react-icons/fa";
import "./navbar.css";
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
      <>
        <a className="nav-link nav-item" href="/auth/google">
          Login with Google
        </a>
      </>
    );

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
          <img
            src=" https://i.postimg.cc/NF91c7zR/MRC.jpg"
            width="50"
            height="50"
            alt=""
          />
        </Link>

        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-between "
          id="navbarCollapse"
        >
          <div className="navbar-nav ml-auto">
            
            <Link className="nav-link nav-item" to="/">
              Home
            </Link>
            <Link className="nav-link nav-item" to="/">
              About
            </Link>
            <Link className="nav-link nav-item" to="/">
              Contact
            </Link>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/">
                  Action
                </Link>
                <Link className="dropdown-item" to="/">
                  Another action
                </Link>
              </div>
            </li>
            {isAuthenticated ? authLinks : guestLinks}
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
