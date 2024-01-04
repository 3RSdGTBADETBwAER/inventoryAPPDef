
import React, { useState } from 'react'
import axios from "axios"
import { useEffect } from 'react'

export default function AdminInventory(props) {
    const [newProducts, setNewProducts] = useState([])
                      
    useEffect(() =>{
      axios.get(`http://localhost:3000/Categories/${props.product}`)
        .then(response =>{
          const Products = response.data
          setNewProducts(Products)
       
          
        })
        .catch(error =>{
          console.error("error al obtener el inventario" + error )
        })
    }, [])

    function handleClick(product, productindex){

        console.log("the product " + product + " has been deleted from this category")
        const updatedProducts = [...newProducts]
        updatedProducts.splice(productindex, 1)
        setNewProducts(updatedProducts)
    
        axios.delete(`http://localhost:3000/Admin/delete/${props.categoria}/${product}`)
    }
    function handleSave(){
      
    }
  return (
    <div>    
        <div>{props.product} inventory</div> 
        {
        newProducts.map((product, index) =>
          <div key={index}>
            <form>
                <input type='text' value={product.nombre}></input>
                <input type='text' value={product.precio}></input>
                <input type='text' value={product.cantidad}></input> 
                <input type="button" onClick={() => handleClick(product.nombre, index)} value="Delete" />
              
            </form>
            </div>
        )}
        <input type='submit' value='Save' onClick={handleSave}></input>
    </div> 
  )
}
