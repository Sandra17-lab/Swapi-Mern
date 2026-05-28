// En producción React incrusta REACT_APP_* durante el build
// En desarrollo usa localhost:5000
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default API_URL;
