// En producción el frontend es servido por el mismo servidor backend,
// así que usamos rutas relativas (cadena vacía). En desarrollo apuntamos
// al backend local o a la variable de entorno si está definida.
const API_URL = process.env.REACT_APP_API_URL || "";

export default API_URL;
