import React from 'react';
import {Link} from 'react-router-dom';

export default function SIngleProduct({product}) {
    
    return (
        <div>
            <Link to={`/product/${product._id}`}>
           <h1> {product.productName}</h1>
           
           </Link>
        </div>
    )
}
