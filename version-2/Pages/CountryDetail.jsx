
// ----------with saved button, flag on left detail on the right and bordering countries---------

import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CountryDetail({ countries }) {
  const { countryName } = useParams();
  const navigate = useNavigate();

  // State for saved countries
  const [savedCountries, setSavedCountries] = useState([]);

  // Find the selected country from the countries prop
  const country = countries.find(
    (c) => c.name.common.toLowerCase() === countryName.toLowerCase()
  );

  if (!country) {
    return <h2>Country not found</h2>;
  }

  // Handle Save button click
  const handleSave = () => {
    if (!savedCountries.includes(country.name.common)) {
      setSavedCountries([...savedCountries, country.name.common]);
      alert(`${country.name.common} saved!`);
    } else {
      alert(`${country.name.common} is already saved`);
    }
  };

  return (
    <main className="country-detail-page">
      {/* Back button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>

      <div className="country-detail-container">
        {/* Flag */}
        <img
          src={country.flags.png}
          alt={country.name.common}
          className="country-flag"
        />

        {/* Country details */}
        <div className="country-info">
          <h1>{country.name.common}</h1>

          {/* Save button under country name */}
          <button className="save-button" onClick={handleSave}>
            Save 
          </button>

          <p>
            <strong>Population:</strong> {country.population.toLocaleString()}
          </p>
          <p>
            <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
          </p>
          <p>
            <strong>Region:</strong> {country.region}
          </p>

          {/* Bordering countries */}
          {country.borders && country.borders.length > 0 && (
            <div className="border-countries">
              <h3>Bordering Countries:</h3>
              <div className="border-buttons">
                {country.borders.map((borderCca3) => {
                  const borderCountry = countries.find(
                    (c) => c.cca3 === borderCca3
                  );
                  return borderCountry ? (
                    <Link
                      key={borderCca3}
                      to={`/CountryDetail/${borderCountry.name.common}`}
                      className="border-button"
                    >
                      {borderCountry.name.common}
                    </Link>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

