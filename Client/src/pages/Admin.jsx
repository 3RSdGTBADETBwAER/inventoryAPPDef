import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios"
import AdminInventory from '../Components/AdminInventory'

export default function Admin() {
  const [newCategories, setNewCategories] = useState([])
    const [adminCategories, setAdmincategories] = useState(true)
    const [adminproduct, setAdminProduct] = useState("")


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

    function handleClick(categoria){
        setAdmincategories(false)
        setAdminProduct(categoria)
    }

    return (
        <div>
          {adminCategories ? (
            <>
              <h1>Gestionar Categorias</h1>
              {newCategories.map((categoria, index) => (
                <div key={index} onClick={() => handleClick(categoria)}>
                  {categoria}
                </div>
              ))}
            </>
          ) : (
            <div>
                <AdminInventory product={adminproduct} categoria={adminproduct}></AdminInventory>

            </div>
          )}
        </div>
      );
      
}
