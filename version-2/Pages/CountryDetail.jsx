

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CountryDetail({ country }) {
  const navigate = useNavigate();

  // State to track if user has saved this country
  const [isSaved, setIsSaved] = useState(false);
  const [message, setMessage] = useState("");

  // Function to handle saving the country
  async function handleSave() {
    try {
      const response = await fetch("https://your-backend-api.com/saved-countries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: "Anonymous User", // You could replace this with actual user info
          country: country.name.common,
        }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const result = await response.json();
      console.log("Country saved:", result);
      setIsSaved(true);
      setMessage(`Country ${country.name.common} saved successfully!`);
    } catch (error) {
      console.error("Error saving country:", error);
      setMessage("Failed to save country.");
    }
  }

  return (
    <div>
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate("/")}>
        Back
      </button>

      <div className="country-detail-container">
        {/* Flag */}
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          className="country-flag"
        />

        {/* Country Details */}
        <div className="country-details">
          <h2>{country.name.common}</h2>
          <p>Region: {country.region}</p>
          <p>Subregion: {country.subregion}</p>
          <p>Population: {country.population.toLocaleString()}</p>

          {/* Save Button */}
          {!isSaved ? (
            <button className="back-button" onClick={handleSave}>
              Save Country
            </button>
          ) : (
            <p style={{ color: "green", marginTop: "10px" }}>
              Country saved!
            </p>
          )}

          {/* Optional success/failure message */}
          {message && <p style={{ color: "green" }}>{message}</p>}

          {/* Bordering countries */}
          {country.borders && country.borders.length > 0 && (
            <div className="border-countries">
              <h4>Bordering Countries:</h4>
              <div className="border-buttons">
                {country.borders.map((border) => (
                  <button key={border} className="border-button">
                    {border}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
