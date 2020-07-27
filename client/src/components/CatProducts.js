import React, { useState ,useEffect} from 'react'
import Axios from 'axios'
import SIngleProduct from './SIngleProduct'


export default function CatProducts({match}) {
    const [catproducts, setcatproducts] = useState([])
    useEffect(() => {
        Axios.get(`http://localhost:5000/product/cat/${match.params.id}`).then(product=>{
            setcatproducts(product.data)
        })        
    }, [])
    return (
        <div>
        {
            catproducts.map(product=>{
                return <SIngleProduct key={product._id} product={product} />
            })
        }    
        </div>
    )
}
