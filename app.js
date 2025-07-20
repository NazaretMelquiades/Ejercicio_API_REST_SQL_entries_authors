const express = require('express');
const cowsay = require('cowsay');
const app = express();
const port = 3000;

//leer fichero .env
// require('dotenv').config(); //DEJAR SOLO ESTO

//Para parsear el body entrante a JSON
app.use(express.json());

// Rutas
const entriesRoutes = require("./routes/entries.routes");

// Habilitar 
app.use('/api/entries', entriesRoutes);

app.listen(port, () => {
    console.log(
        cowsay.say({
            text: `Example app listening on port http://localhost:3000`,
            f: 'owl',
        })
    )
});

module.exports = app;