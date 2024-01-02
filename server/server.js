const express = require('express')
const server = express()

server.get("/", (req, res) =>{
    res.send("server iniciado")
})

const PORT = 3000

server.listen(3000)    
console.log("serverIniciado")         