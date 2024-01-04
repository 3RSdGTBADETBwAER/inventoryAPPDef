import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from "react-router-dom"


export default function home() {

  const [newCategories, setNewCategories] = useState([])

  useEffect(() =>{
    axios.get("http://localhost:3000/Categories")
      .then(Response =>{
        const categoriesData = Response.data
        const categoriesNames = categoriesData.map(doc => doc.nombre)
        setNewCategories(categoriesNames)
      })
      .catch(error =>{
        console.error("error al obtener las categorias" + error )
      })
  }, [])


  return (
    <div>
        <h1>Categories</h1>
        {newCategories.map((categoria, index) => 
           <Link to={`/category/${categoria}`} key={index}>
           <div>{categoria}</div>
          </Link>
        )}
        
    </div>  
  )
}
