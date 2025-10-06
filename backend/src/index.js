require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const jwSecret = process.env.JWT_SECRET;

app.use(express.json());
console.log('clave secreta: ', jwSecret);
console.log('Puerto del servidor: ', port);

app.get('/', (req, res) =>{
    res.send('API BACKEND FUNCIONANDO');

});

app.listen(port, () => {
    console.log(' SERVIDOR ESCUCHANDO EN EL PUERTO ', port);
})