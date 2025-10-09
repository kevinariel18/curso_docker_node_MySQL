const express = require("express"); // 1. Importar librerías
const app = express(); // 2. Inicializar la app
require("dotenv").config(); // 3. Cargar variables de entorno

app.use(express.json()); // 4. Middleware para JSON
const cors = require("cors"); // 5. Importar CORS
app.use(cors()); // 6. Activar CORS

const authRoutes = require("./routes/authRoutes");
const librosRoutes = require("./routes/librosRoutes");
// 7. Importar rutas
app.use("/api", authRoutes); // 8. Usar rutas
app.use("/api", librosRoutes);

// Documentacion
const path = require("path");
const { apiReference } = require("@scalar/express-api-reference");

app.use(
  "/docs",
  apiReference({
    theme: "dark",
    layout: "modern",
    spec: {
      url: "/api/openapi.yaml",
    },
    configuration: {
      showSidebar: true,
      hideDownloadButton: false,
      hideTryItPanel: false,
      authentication: {
        preferredSecurityScheme: "bearerAuth",
        http: {
          basic: {
            token: "token",
          },
          apiKey: {
            token: "token",
          },
        },
      },
    },
  })
);

app.get("/api/openapi.yaml", (req, res) => {
  res.setHeader("Content-Type", "application/x-yaml");
  res.sendFile(path.join(__dirname, "..", "docs", "openapi.yaml"));
});
// =====================================================

app.get("/hola", (req, res) => {
  // 9. Ruta de prueba
  res.send("Hola mundo desde el servidor");
  console.log("hola mundo");
});

const PORT = process.env.PORT || 3000; // 10. Definir puerto
const JWT_SECRET = process.env.JWT_SECRET; // 11. Leer variable secreta

app.listen(PORT, () => {
  // 12. Iniciar servidor
  console.log(`Server is running on http://localhost:${PORT}`);
  // documentacion
  console.log(`Documentacion available at http://localhost:${PORT}/docs`);
});
