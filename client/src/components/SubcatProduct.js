import React, { useState, useEffect } from "react";
import Axios from "axios";
import SIngleProduct from "./SIngleProduct";

export default function SingleProduct({ match }) {
  const [productsCatwise, setProdcuts] = useState([]);
  useEffect(() => {
    Axios.get(
      `/product/subcatwise/${match.params.id}`
    ).then((products) => {
      setProdcuts(products.data);
    });
  }, []);

  return (
    <div className="row">
      {productsCatwise.map((product) => {
        return <SIngleProduct  key={product._id} product={product} />;
      })}
    </div>
  );
}
