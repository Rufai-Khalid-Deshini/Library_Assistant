import React from 'react'
import { useParams } from 'react-router-dom'

const Categories = () => {

    const { category } = useParams();

    const sth = category.split("-");
    const cat = sth.join(" ");

    return (
        <div>{cat}</div>
    )
}

export default Categories