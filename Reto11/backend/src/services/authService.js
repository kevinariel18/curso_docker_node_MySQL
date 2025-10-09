const bcrypt = require("bcrypt"); // Importa la librería bcrypt para encriptar contraseñas
const userRepository = require("../repository/userRepository"); // Importa el repositorio que accede a la base de datos
const saltRounds = 10; // Define el número de rondas de encriptación para bcrypt (más seguro = más lento)

// ==========================LOGIN DE USUARIO ==============================

const jwt = require("jsonwebtoken");
const jwtSecrete = process.env.JWT_SECRET;
const secrete_key = jwtSecrete;

async function login(dataUser) {
  // verificamos si el correo del usuario que nos envian en el body existe en el respositorio si existe devuelve el objeto usuario si no null
  const usuario = await userRepository.obtenerPorEmail(dataUser.correo);
  if (!usuario) throw new Error("El correo ingresado es incorrecto");
  // una vez pasado el primer filtro verificamos que el correo que si existe tenga la misma contraseña enviada con la de la bd esto devueleve un boolean
  const contraseniaValida = await bcrypt.compare(
    dataUser.contrasenia,
    usuario.contrasenia
  );
  if (!contraseniaValida)
    throw new Error("La contraseña ingresada es incorrecta");

  // si el correo y la contrasela son correctas generamos el token con jwt y lo retornmaos al controlador
  // el jwt pide como parametros el payload, la clave secreta y el tiempo de expuiracion
  const payload = { id: usuario.id, correo: usuario.correo };

  const token = jwt.sign(payload, secrete_key, { expiresIn: "1h" });
  return token;
}

// =========================== Registro de usuario ===========================
async function registrar(dataUser) {
  // verificar si ya existe el usuario mediante el email
  const ExisteUsuario = await userRepository.obtenerPorEmail(dataUser.correo);

  // Si ya existe el usuario, lanzar excepcion
  if (ExisteUsuario)
    throw new Error(
      "El usuario registrado con el correo:" +
        dataUser.correo +
        " ya existe en la base de datos"
    );
  // Encripta la contraseña usando bcrypt y el número de rondas definido
  const hashedPassword = await bcrypt.hash(dataUser.contrasenia, saltRounds);

  // creamos el objeto usuario con la contraseña encriptada

  const newUser = {
    ...dataUser,
    contrasenia: hashedPassword,
  };

  // pasamos el objeto usuario al repositorio para que lo guarde en la base de datos
  await userRepository.crearUsuario(newUser);

  // retornamos el usuario creado

  return newUser;
}
module.exports = { registrar, login }; // Exporta la función para que el controlador pueda usarla
