


// import { useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";

// export default function CountryDetail({ countries }) {
//   const { countryName } = useParams();
//   const navigate = useNavigate();

//   // Find the selected country from the countries array
//   const country = countries.find(
//     (c) => c.name.common === countryName
//   );

//   // Guard: prevents crash while data loads
//   if (!country) {
//     return <p style={{ padding: "20px" }}>Loading country details...</p>;
//   }

//   // State for save feedback
//   const [isSaved, setIsSaved] = useState(false);
//   const [message, setMessage] = useState("");

//   // Save country to backend
//   async function handleSave() {
//     try {
//       const response = await fetch(
//         "https://your-backend-api.com/saved-countries",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             country: country.name.common,
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to save country");
//       }

//       setIsSaved(true);
//       setMessage("Country saved successfully!");
//     } catch (error) {
//       console.error(error);
//       setMessage("Error saving country");
//     }
//   }

//   return (
//     <div>
//       {/* Back Button */}
//       <button
//         className="back-button"
//         onClick={() => navigate(-1)}
//       >
//         Back
//       </button>

//       {/* Flag + Details Layout */}
//       <div className="country-detail-container">
//         {/* Flag on the LEFT */}
//         <img
//           src={country.flags.png}
//           alt={`Flag of ${country.name.common}`}
//           className="country-flag"
//         />

//         {/* Details on the RIGHT */}
//         <div className="country-details">
//           <h2>{country.name.common}</h2>

//           <p><strong>Region:</strong> {country.region}</p>
//           {country.subregion && (
//             <p><strong>Subregion:</strong> {country.subregion}</p>
//           )}
//           <p>
//             <strong>Population:</strong>{" "}
//             {country.population.toLocaleString()}
//           </p>

//           {/* Save Button */}
//           {!isSaved ? (
//             <button
//               className="back-button"
//               onClick={handleSave}
//               style={{ marginTop: "15px" }}
//             >
//               Save Country
//             </button>
//           ) : (
//             <p style={{ color: "green", marginTop: "10px" }}>
//               {message}
//             </p>
//           )}

//           {/* Bordering Countries */}
//           {country.borders && country.borders.length > 0 && (
//             <div className="border-countries">
//               <h4>Bordering Countries:</h4>

//               <div className="border-buttons">
//                 {country.borders.map((borderCode) => {
//                   const borderCountry = countries.find(
//                     (c) => c.cca3 === borderCode
//                   );

//                   return (
//                     borderCountry && (
//                       <Link
//                         key={borderCode}
//                         to={`/CountryDetail/${borderCountry.name.common}`}
//                         className="border-button"
//                       >
//                         {borderCountry.name.common}
//                       </Link>
//                     )
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
// ------------------------------

import { useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function CountryDetail({ countries }) {
  const { countryName } = useParams();

  // Find the selected country from the countries array
  const country = countries.find(
    (c) => c.name.common === countryName
  );

  // Prevent crash while data is loading
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
        "https://your-backend-api.com/saved-countries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country: country.name.common,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save country");
      }

      setIsSaved(true);
      setMessage("Country saved successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Error saving country");
    }
  }

  return (
    <div>
      {/* Back Button */}
      <Link to="/" className="back-button">
        Back
      </Link>

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
