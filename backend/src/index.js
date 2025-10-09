require('dotenv').config();

const tareaRoutes = require('./routes/tareaRoutes');
const authRoutes = require('./routes/authRouters');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const jwtSecret = process.env.JWT_SECRET;
const path = require('path');

const { apiReference } = require('@scalar/express-api-reference');

const cors = require('cors');
const corsOptions = {
    origin: '*', // Permitir todas las peticiones para pruebas
    credentials: false
};

app.use(express.json());
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('API backend funcionando');
});

// Endpoint de prueba
app.post('/api/test', (req, res) => {
    console.log('POST recibido en /api/test');
    res.json({message: 'POST funcionando', body: req.body});
});

console.log('Registrando rutas de tareas...');
app.use('/api', tareaRoutes);
console.log('Registrando rutas de autenticación...');
app.use('/api', authRoutes);
console.log('Todas las rutas registradas correctamente');
app.use('/docs', apiReference({
     theme: 'purple',
     layout: 'modern',
     spec: {
        url: '/api/openapi.yaml'
     },
     configuration: {
        showSidebar: true,
        hideDownloadButton: false,
        hideTryItPanel: false,
        authentication: {
            preferredSecurityScheme: 'bearerAuth',
            apiKey: {
                token: 'token'
            }
        }
     }
}))

app.get('/api/openapi.yaml', (req, res) => {
    res.setHeader('Content-Type', 'application/x-yaml');
    res.sendFile(path.join(__dirname, '../docs/openapi.yaml'));
})

app.listen(port, ()=>{
    console.log(`Servidor escuchando en el puerto ${port}`);
    console.log(`Documentacion disponible en: http://localhost:${port}/docs`);
});


// back http://localhost:3000
// origen http://localhost:4200, 192.168.1.100
// front http://localhost:4200