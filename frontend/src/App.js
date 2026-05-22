import { useState } from "react";
import axios from "axios";

function App() {
  const [endpoint, setEndpoint] = useState("people");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.swapi.tech/api/${endpoint}`
      );

      let data = response.data.results;

      if (search !== "") {
        data = data.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      const detailedResults = await Promise.all(
        data.map(async (item) => {
          const detailResponse = await axios.get(item.url);

          return detailResponse.data.result;
        })
      );

      setResults(detailedResults);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>🌌 Star Wars Explorer</h1>

      <div style={styles.controls}>
        <select
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          style={styles.select}
        >
          <option value="people">People</option>
          <option value="planets">Planets</option>
          <option value="vehicles">Vehicles</option>
          <option value="starships">Starships</option>
          <option value="films">Films</option>
        </select>

        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleSearch} style={styles.button}>
          Consultar
        </button>
      </div>

      <div style={styles.grid}>
        {results.map((item) => (
          <div key={item.uid} style={styles.card}>
            <h2>{item.properties.name}</h2>

            {Object.entries(item.properties).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {value}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#020617",
    color: "white",
    padding: "30px",
    textAlign: "center",
  },

  controls: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "30px",
    flexWrap: "wrap",
  },

  select: {
    padding: "12px",
    borderRadius: "8px",
  },

  input: {
    padding: "12px",
    width: "250px",
    borderRadius: "8px",
    border: "none",
  },

  button: {
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#2563eb",
    color: "white",
    fontWeight: "bold",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "20px",
  },

  card: {
    backgroundColor: "#111827",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "left",
    boxShadow: "0px 0px 10px rgba(255,255,255,0.1)",
  },
};

export default App;