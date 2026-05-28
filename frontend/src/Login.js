import { useState } from "react";
import axios from "axios";

const API_URL = "https://swapi-mern-production.up.railway.app";

function Login({ onLogin, onGoToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("currentUser", JSON.stringify(user));
      onLogin(user);
    } catch (err) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>🌌 Star Wars Explorer</h1>
        <h2 style={styles.subtitle}>Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Cargando..." : "Entrar"}
          </button>
        </form>

        <p style={styles.switchText}>
          ¿No tienes cuenta?{" "}
          <span style={styles.link} onClick={onGoToRegister}>
            Regístrate
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "#020617",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#111827",
    padding: "40px",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0px 0px 20px rgba(255,255,255,0.1)",
    textAlign: "center",
  },
  title: { color: "white", marginBottom: "8px" },
  subtitle: { color: "#9ca3af", fontWeight: "normal", marginBottom: "24px" },
  form: { display: "flex", flexDirection: "column", gap: "14px" },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #374151",
    backgroundColor: "#1f2937",
    color: "white",
    fontSize: "15px",
    outline: "none",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#2563eb",
    color: "white",
    fontWeight: "bold",
    fontSize: "15px",
    marginTop: "6px",
  },
  error: { color: "#f87171", margin: "0", fontSize: "14px" },
  switchText: { color: "#9ca3af", marginTop: "20px", fontSize: "14px" },
  link: { color: "#2563eb", cursor: "pointer", fontWeight: "bold" },
};

export default Login;
