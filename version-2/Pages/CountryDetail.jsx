
// // ----------with saved button, flag on left detail on the right and bordering countries---------

// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useState } from "react";

// export default function CountryDetail({ countries }) {
//   const { countryName } = useParams();
//   const navigate = useNavigate();

//   // State for saved countries
//   const [savedCountries, setSavedCountries] = useState([]);

//   // Find the selected country from the countries prop
//   const country = countries.find(
//     (c) => c.name.common.toLowerCase() === countryName.toLowerCase()
//   );

//   if (!country) {
//     return <h2>Country not found</h2>;
//   }

//   // Handle Save button click
//   const handleSave = () => {
//     if (!savedCountries.includes(country.name.common)) {
//       setSavedCountries([...savedCountries, country.name.common]);
//       alert(`${country.name.common} saved!`);
//     } else {
//       alert(`${country.name.common} is already saved`);
//     }
//   };

//   return (
//     <main className="country-detail-page">
//       {/* Back button */}
//       <button className="back-button" onClick={() => navigate(-1)}>
//         Back
//       </button>

//       <div className="country-detail-container">
//         {/* Flag */}
//         <img
//           src={country.flags.png}
//           alt={country.name.common}
//           className="country-flag"
//         />

//         {/* Country details */}
//         <div className="country-info">
//           <h1>{country.name.common}</h1>

//           {/* Save button under country name */}
//           <button className="save-button" onClick={handleSave}>
//             Save 
//           </button>

//           <p>
//             <strong>Population:</strong> {country.population.toLocaleString()}
//           </p>
//           <p>
//             <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
//           </p>
//           <p>
//             <strong>Region:</strong> {country.region}
//           </p>

//           {/* Bordering countries */}
//           {country.borders && country.borders.length > 0 && (
//             <div className="border-countries">
//               <h3>Bordering Countries:</h3>
//               <div className="border-buttons">
//                 {country.borders.map((borderCca3) => {
//                   const borderCountry = countries.find(
//                     (c) => c.cca3 === borderCca3
//                   );
//                   return borderCountry ? (
//                     <Link
//                       key={borderCca3}
//                       to={`/CountryDetail/${borderCountry.name.common}`}
//                       className="border-button"
//                     >
//                       {borderCountry.name.common}
//                     </Link>
//                   ) : null;
//                 })}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }

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
