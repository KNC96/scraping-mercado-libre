const express = require("express");
const cors = require('cors'); // Importa el paquete cors
const apiProductos = require('./obtener-productos');
const app = express();
const PORT = process.env.PORT || 8081;

// Configura el middleware cors para todas las rutas
app.use(cors());

app.use('/', apiProductos);

app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});



