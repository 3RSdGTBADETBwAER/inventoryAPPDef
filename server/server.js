const express = require('express');
const { db } = require("./firebase.js");
const cors = require("cors")
const server = express();

server.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,DELETE,PUT', // Agrega aquí los métodos permitidos si necesitas más que solo GET
  }));
  
server.use(express.json());
server.use(cors())
server.get("/", (req, res) =>{
    res.send("Server Iniciado");
});

server.get("/test", async (req, res) =>{
     try{
        const categoriasRef = db.collection("Categorias")
        const categoriasSnapshot = await categoriasRef.doc("CategoriasID_1").collection("Instrumentos").doc("InstrumentosID_1").get()
        const instrumentData  = categoriasSnapshot.data()

        res.send(instrumentData)
     }catch(error){
        if (error){
            throw(error)
            res.status(500).send("error al obtener la solicitud")
        }
     }
});

server.get("/Categories", async (req,res)=>{
    try{
        const CategoriesRef = db.collection("Categorias")
        const CategoriasSnapshot = await CategoriesRef.get()
        
        const CategoriasData = []
        CategoriasSnapshot.forEach((doc) =>{
            CategoriasData.push(doc.data())
        })
        res.send(CategoriasData)
    }catch(error){
        res.status(500).send("Category not founded")
    }
})

server.get("/Categories/:instrumento", async (req, res) => {
    try {
        const instrumento = req.params.instrumento; 
        
        const productsRef = db.collection("Categorias");
        const querySnapshot = await productsRef.where("nombre", "==", instrumento).get();
        
        let categoryRef; 
        
        querySnapshot.forEach((doc) => {
            categoryRef = doc.ref;
        });
        
        if (!categoryRef) {
            return res.status(404).send("Instrumento no encontrado");
        }
        
        const inventoryRef = categoryRef.collection("Instrumentos");
        const inventorySnapshot = await inventoryRef.get();
        const inventoryArray = [];
        
        inventorySnapshot.forEach((doc) => {
            inventoryArray.push(doc.data());
        });

        res.send(inventoryArray);
    } catch (error) {
        res.status(500).send("Error al obtener la información: " + error);
    }
});

server.delete("/Admin/delete/:category/:product", async (req, res) => {
    try {
        const { category, product } = req.params;

        const categoryRef = db.collection("Categorias");

        const categoryQuerySnapshot = await categoryRef.where("nombre", "==", category).get();

        let categoryDocRef;

        categoryQuerySnapshot.forEach((doc) => {
            categoryDocRef = doc.ref;
        });

        if (!categoryDocRef) {
            throw new Error("Categoría no encontrada");
        }

        const productsRef = categoryDocRef.collection("Instrumentos");

        const productQuerySnapshot = await productsRef.where('nombre', "==", product).get();

        let productDocRef;

        productQuerySnapshot.forEach((doc) => {
            productDocRef = doc.ref;
        });

        if (!productDocRef) {
            throw new Error("Producto no encontrado");
        }

        await productDocRef.delete();

        res.send("Producto eliminado");
    } catch (error) {
        res.status(500).send(error.message);
    }
});


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
