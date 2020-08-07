import React from 'react'
import './Categories.css'
import CategoryCard from './CategoryCard'
export default function Categories({groups}) {
    return (
        <div className="col-lg-12">
            <div className="mid-heading">
                    <h3>Categories</h3>
                    <p>Choose category to start browsing products and services</p>
                </div>
                <div className="row">
                    {groups.map(group=>{
                      return  <CategoryCard  key={group.category} groupData={group}/>
                    })}
                </div>
        </div>
    )
}
