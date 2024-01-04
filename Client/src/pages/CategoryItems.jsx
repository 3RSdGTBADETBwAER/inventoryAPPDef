import React, { useState } from 'react'
import { useParams } from "react-router-dom"
import axios from "axios"
import { useEffect } from 'react'


export default function CategoryItems() {
    const { categoryName } = useParams()
    const [newProducts, setNewProducts] = useState([])
                      
    useEffect(() =>{
      axios.get(`http://localhost:3000/Categories/${categoryName}`)
        .then(response =>{
          const Products = response.data
          setNewProducts(Products)
        })
        .catch(error =>{
          console.error("error al obtener el inventario" + error )
        })
    }, [])
  

  return (
    <div>
        <h1>CategoryName: {categoryName}</h1>
        <div>
          {
            newProducts.map((product, index) =>
              <div key={index}>{product.nombre}<br></br>price:{product.precio}<br></br>stok:{product.cantidad}<br></br></div>
            )
          }
        </div>
    </div>
  )
}
