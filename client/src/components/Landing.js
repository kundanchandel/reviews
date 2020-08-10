import React from "react";
import { css } from "@emotion/core";
import ProgateLoader from "react-spinners/PacmanLoader";
import { connect } from "react-redux";
import _ from "lodash";
import { setCurrentUser } from "../actions/authActions";

import "./Landing.css";
import Search from "./Search";
import Categories from "./Categories";
import Axios from "axios";
import LatestReview from "./LatestProducts";
import MostRated from "./MostRated";
import FeaturedProduct from "./FeaturedProduct";
import Footer from "./Footer";

const override = css`
  display: block;
  margin: 30vh auto;
  border-color: red;
`;

class Landing extends React.Component {
  state = {
    products: [],
    groups: [],
    latest: [],
    loading: true,
  };
  async componentDidMount() {
    await this.props.setCurrentUser();
    Axios.get("/product/allProducts").then((products) => {
      this.setState({ products: products.data });
      //  const groups=_.groupBy(this.state.products,'category')
      const groups = _.chain(this.state.products)
        .groupBy("category")
        .map((value, key) => ({ category: key, sub: value }))
        .value();
      this.setState({ groups: groups, loading: false });
      const latest = this.state.products.sort(function compare(a, b) {
        var dateA = new Date(a.createdAt);
        var dateB = new Date(b.createdAt);
        return dateB - dateA;
      });
      this.setState({ latest: latest });
    });
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    {
      if (!this.state.loading) {
        return (
          <>
            <Search products={this.state.products}/>
            <div className="container">
              <div className="row">
                <Categories groups={this.state.groups} />
              </div>
            </div>
            <LatestReview products={this.state.latest} />
            
            <MostRated products={this.state.products} />
            <FeaturedProduct products={this.state.products} />
            <Footer />
          </>
        );
      } else {
        return (
          <>
            <div className="sweet-loading">
              <ProgateLoader
                css={override}
                size={25}
                color={"#9ACC55"}
                loading={this.state.loading}
              />
            </div>
          </>
        );
      }
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setCurrentUser })(Landing);
