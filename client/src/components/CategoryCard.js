import React,{useEffect} from 'react';
import {Link} from 'react-router-dom'
import _ from 'lodash'; 
export default function CategoryCard({groupData}) {
    
    useEffect(() => {
        console.log(subgroup)
        
    }, [])
    const subgroup=_.chain(groupData.sub).groupBy('subCategory').map((value,key)=>({subCatgory:key,subcat:value})).value()
    
    return (
        <div className="col-12 col-md-6 col-lg-4 p-5">
                        <div className="catcard card h-100">
                            <div className="catcard card-body">
                                <h4 className="card-title">
                                 <Link to={`/item/cat/${groupData.category}`}>{groupData.category}</Link>
                                </h4>
                                {subgroup.map(subgroup=>{
                                    return (<h5 key={subgroup.subCatgory}>
                                    <Link to={`/item/sub/${subgroup.subCatgory}`}>{subgroup.subCatgory}</Link>
                                    <span className="badge">{subgroup.subcat.length}</span>
                                </h5>)
                                })}    
                            </div>
                        </div>
                    </div>
    )
}
