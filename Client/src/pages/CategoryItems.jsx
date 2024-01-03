import React from 'react'
import { useParams } from "react-router-dom"

export default function CategoryItems() {
    const { categoryName } = useParams()

  return (
    <div>
        <h1>CategoryName: <br></br> {categoryName}</h1>
    </div>
  )
}
