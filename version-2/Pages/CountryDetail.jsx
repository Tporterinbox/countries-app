

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function CountryDetail({ countries }) {
  const { countryName } = useParams();
  const navigate = useNavigate();

  // Find the selected country
  const country = countries.find((c) => c.name.common === countryName);

  // Guard: prevents crash while data loads
  if (!country) return <p style={{ padding: "20px" }}>Loading country details...</p>;

  // State for save feedback
  const [isSaved, setIsSaved] = useState(false);
  const [message, setMessage] = useState("");

  // State for view count
  const [viewCount, setViewCount] = useState(0);

  // ---------------- Save Country ----------------
  async function handleSave() {
    try {
      const response = await fetch(
        "https://backend-answer-keys.onrender.com/api/save-one-country",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country_name: country.name.common }),
        }
      );

      if (!response.ok) throw new Error("Failed to save country");

      const data = await response.json();
      setIsSaved(true);
      setMessage(data.message || "Country saved successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Error saving country");
    }
  }

  // ---------------- Update View Count ----------------
  const updateViewCount = async () => {
    try {
      const response = await fetch(
        "https://backend-answer-keys.onrender.com/api/update-one-country-count",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country_name: country.name.common }),
        }
      );

      if (!response.ok) throw new Error("Failed to update country view count");

      const data = await response.json();
      // Backend should return updated count in data.count
      setViewCount(data.count || 0);
    } catch (error) {
      console.error("Error updating view count:", error);
    }
  };

  // ---------------- Run on page load ----------------
  useEffect(() => {
    updateViewCount();
  }, [countryName]);

  return (
    <div>
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>

      {/* Flag + Details */}
      <div className="country-detail-container">
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          className="country-flag"
        />

        <div className="country-details">
          <h2>{country.name.common}</h2>

          <p>
            <strong>Region:</strong> {country.region || "N/A"}
          </p>

          {country.subregion && (
            <p>
              <strong>Subregion:</strong> {country.subregion}
            </p>
          )}

          <p>
            <strong>Population:</strong>{" "}
            {country.population ? country.population.toLocaleString() : "N/A"}
          </p>

          <p>
            <strong>Capital:</strong>{" "}
            {country.capital && country.capital.length > 0
              ? country.capital[0]
              : "N/A"}
          </p>

          {/* View Count */}
          <p>
            <strong>Views:</strong> {viewCount}
          </p>

          {/* Save Button */}
          {!isSaved ? (
            <button
              className="back-button"
              onClick={handleSave}
              style={{ marginTop: "15px" }}
            >
              Save Country
            </button>
          ) : (
            <p style={{ color: "green", marginTop: "10px" }}>{message}</p>
          )}

          {/* Bordering Countries */}
          {country.borders && country.borders.length > 0 && (
            <div className="border-countries">
              <h4>Bordering Countries:</h4>
              <div className="border-buttons">
                {country.borders.map((code) => {
                  const borderCountry = countries.find((c) => c.cca3 === code);
                  return (
                    borderCountry && (
                      <Link
                        key={code}
                        to={`/CountryDetail/${borderCountry.name.common}`}
                        className="border-button"
                      >
                        {borderCountry.name.common}
                      </Link>
                    )
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
