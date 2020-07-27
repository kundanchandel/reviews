import React, { useState,useEffect } from 'react'
import Axios from 'axios';
import SIngleProduct from './SIngleProduct';


export default function SingleProduct({match}) {
    const [productsCatwise,setProdcuts]=useState([])
    useEffect(() => {
         Axios.get(`http://localhost:5000/product/subcatwise/${match.params.id}`).then(products=>{
             setProdcuts(products.data)
         })
        
    }, [])
    
    return (
        <div className="container">
          {
            productsCatwise.map(product=>{
                return <SIngleProduct product={product} />
            })
        }
        </div>
    )
}
