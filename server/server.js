const express = require('express');
const path = require('path');

const server = express();

server.use(express.static(path.join(__dirname, 'client/build')));

server.get('/api/mensaje', (req, res) => {
    res.json({ mensaje: 'Hola desde la API' });
});

server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
