
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function CountryDetail({ countries }) {
  const { countryName } = useParams();
  const navigate = useNavigate();

  // Find the selected country from the countries array
  const country = countries.find(
    (c) => c.name.common === countryName
  );

  // Guard: prevents crash while data loads
  if (!country) {
    return <p style={{ padding: "20px" }}>Loading country details...</p>;
  }

  // State for save feedback
  const [isSaved, setIsSaved] = useState(false);
  const [message, setMessage] = useState("");

  // Save country to backend
  async function handleSave() {
    try {
      const response = await fetch(
        "https://backend-answer-keys.onrender.com/save-one-country",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country_name: country.name.common,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save country");
      }

      setIsSaved(true);
      // saved message show after save button is clicked
      setMessage("Country saved successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Error saving country");
    }
  }
  // -------------------------------

  //     // Post request for Save-One-Country
  // const handleSaveCountry = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://backend-answer-keys.onrender.com/save-one-country",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ country_name: country.name.common }),
  //       }
  //     );

  //     if (!response.ok) throw new Error("Failed to save country");

  //     const data = await response.json();
  //     setIsSaved(true);
  //     setMessage(data.message || "Success! The country is saved.!");

  //     // Notify parent to refresh saved countries
  //     if (onCountrySaved) onCountrySaved();
  //   } catch (error) {
  //     console.error("Error saving country:", error);
  //     setMessage("Failed to save country.");
  //   }
  // };
// --------------------------------

  return (
    <div>
      {/* Back Button */}
      <button
        className="back-button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      {/* Flag + Details Layout */}
      <div className="country-detail-container">
        {/* Flag on the LEFT */}
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          className="country-flag"
        />

        {/* Details on the RIGHT */}
        <div className="country-details">
          <h2>{country.name.common}</h2>

          <p><strong>Region:</strong> {country.region}</p>
          {country.subregion && (
            <p><strong>Subregion:</strong> {country.subregion}</p>
          )}
          <p>
            <strong>Population:</strong>{" "}
            {country.population.toLocaleString()}
          </p>

          <p> 
          <strong>Capital:</strong>{" "}
          {country.capital}
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
            <p style={{ color: "green", marginTop: "10px" }}>
              {message}
            </p>
          )}

          {/* Bordering Countries */}
          {country.borders && country.borders.length > 0 && (
            <div className="border-countries">
              <h4>Bordering Countries:</h4>

              <div className="border-buttons">
                {country.borders.map((borderCode) => {
                  const borderCountry = countries.find(
                    (c) => c.cca3 === borderCode
                  );

                  return (
                    borderCountry && (
                      <Link
                        key={borderCode}
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


