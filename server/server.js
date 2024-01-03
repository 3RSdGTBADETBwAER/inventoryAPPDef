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

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
