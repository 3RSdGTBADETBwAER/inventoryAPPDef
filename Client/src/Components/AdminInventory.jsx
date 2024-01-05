  import React, { useState, useEffect } from 'react';
  import axios from "axios";

  export default function AdminInventory(props) {
      const [newProducts, setNewProducts] = useState([]);
      const [addContainer, setAddContainer] = useState(false);

      const [newProduct, setNewProduct] = useState({nombre: '', cantidad : 0, precio : 0})

      useEffect(() => {
          axios.get(`http://localhost:3000/Categories/${props.product}`)
              .then(response => {
                  const Products = response.data;
                  setNewProducts(Products);
              })
              .catch(error => {
                  console.error("Error al obtener el inventario" + error);
              });
      }, []);

      function handleClick(product, productindex) {
          console.log("the product " + product + " has been deleted from this category");
          const updatedProducts = [...newProducts];
          updatedProducts.splice(productindex, 1);
          setNewProducts(updatedProducts);
          axios.delete(`http://localhost:3000/Admin/delete/${props.categoria}/${product}`);
      }

      function handleSave() {
          axios.put(`http://localhost:3000/AdminPut/${props.categoria}/products`, newProducts);
      }

      function handleChange(event, index, field) {
          const updatedProducts = [...newProducts];
          updatedProducts[index][field] = event.target.value;
          setNewProducts(updatedProducts);
      }

      function handleAdd() {
          setAddContainer(!addContainer);
      }
      function handleChangeProducts(e, field){
        setNewProduct({...newProduct, [field] : e.target.value})
      }

      function handleAddProduct(e){
        e.preventDefault()
        axios.post(`http://localhost:3000/AdminPost/${props.categoria}/products`, newProduct)
        setNewProduct({nombre: "", cantidad: 0 , precio: 0})
        setAddContainer(false)
       
      }

      return (
          <div>
              <div>{props.product} inventory</div>
              {newProducts.map((product, index) => (
                  <div key={index}>
                      <form>
                          <input type='text' value={product.nombre} onChange={(e) => handleChange(e, index, 'nombre')}></input>
                          <input type='text' value={product.precio} onChange={(e) => handleChange(e, index, 'precio')}></input>
                          <input type='text' value={product.cantidad} onChange={(e) => handleChange(e, index, 'cantidad')}></input>
                          <input type="button" onClick={() => handleClick(product.nombre, index)} value="Delete" />
                      </form>
                  </div>
              ))}
              <input type='button' onClick={() => handleAdd()} value={"Add+"}></input>
              {addContainer ? <div className="addContainer">
                <form onSubmit={handleAddProduct}>
                  <label>Product Name:</label>
                  <input type='text' onChange={(e) => handleChangeProducts(e, "nombre")} ></input>
                  <label>Stock:</label>
                  <input type="number" onChange={(e) => handleChangeProducts(e, "cantidad")}></input>
                  <label>price:</label>
                  <input type='number' onChange={(e) => handleChangeProducts(e, "precio")}></input>
                  <input type='submit' value="Add Product"></input>
                </form>
              </div> : null}
              <input type='submit' value='Save' onClick={handleSave}></input>
          </div>
      );
  }
