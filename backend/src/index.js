const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) =>{
    res.send('API BACKEND FUNCIONANDO');

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(' SERVIDOR ESCUCHANDO EN EL PUERTO ${PORT}');
})