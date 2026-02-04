// CountryCard.jsx → display one country per card

// Import Link to navigate between pages without reload
import { Link } from "react-router-dom";

// CountryCard is  rendering  one "country"
function CountryCard({ country }) {
  
  return (
    // The <link to > makes the entire card is clickable
    <Link to={`/CountryDetail/${country.name.common}`} className="card-link">
      <article className="card">

        {/* Country flag */}
        <img
          src={country.flags.png}
          alt={country.name.common}
          className="card-logo"
        />

        {/* Card content */}
        <div className="card-content">
          <h2>{country.name.common}</h2>

          <p>Population: {country.population.toLocaleString()}</p>

          <p>Capital: {country.capital?.[0] || "N/A"}</p>

          <p>Region: {country.region}</p>
        </div>

      </article>
    </Link>
  );
}

  export default CountryCard;


// ----------------------------

// // CountryCard.jsx → display one country per card

// // Import Link to navigate between pages without page reload
// import { Link } from "react-router-dom";

// // CountryCard renders one country card
// function CountryCard({ country }) {
//   return (
//     // Link navigates to CountryDetail AND passes the country object via state
//     <Link
//       to={`/CountryDetail/${country.name.common}`}
//       state={{ country }}
//       className="card-link"
//     >
//       <article className="card">

//         {/* Country flag */}
//         <img
//           src={country.flags.png}
//           alt={`Flag of ${country.name.common}`}
//           className="card-logo"
//         />

//         {/* Card content */}
//         <div className="card-content">
//           <h2>{country.name.common}</h2>

//           <p>Population: {country.population.toLocaleString()}</p>

//           <p>Capital: {country.capital?.[0] || "N/A"}</p>

//           <p>Region: {country.region}</p>
//         </div>

//       </article>
//     </Link>
//   );
// }

// export default CountryCard;

// // -----------------------


// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function CountryDetail() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get country from router state
//   const country = location.state?.country;

//   const [isSaved, setIsSaved] = useState(false);
//   const [message, setMessage] = useState("");

//   // Guard: prevents crash if country is missing
//   if (!country) {
//     return <p>Loading country details...</p>;
//   }

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
//             fullName: "Anonymous User",
//             country: country.name.common,
//           }),
//         }
//       );

//       if (!response.ok) throw new Error("Network response was not ok");

//       await response.json();
//       setIsSaved(true);
//       setMessage(`Country ${country.name.common} saved successfully!`);
//     } catch (error) {
//       console.error("Error saving country:", error);
//       setMessage("Failed to save country.");
//     }
//   }

//   return (
//     <div>
//       {/* Back Button */}
//       <button className="back-button" onClick={() => navigate("/")}>
//         Back
//       </button>

//       <div className="country-detail-container">
//         {/* Flag */}
//         <img
//           src={country.flags.png}
//           alt={`Flag of ${country.name.common}`}
//           className="country-flag"
//         />

//         {/* Country Details */}
//         <div className="country-details">
//           <h2>{country.name.common}</h2>
//           <p>Region: {country.region}</p>
//           <p>Subregion: {country.subregion}</p>
//           <p>Population: {country.population.toLocaleString()}</p>

//           {/* Save Button */}
//           {!isSaved ? (
//             <button className="back-button" onClick={handleSave}>
//               Save Country
//             </button>
//           ) : (
//             <p style={{ color: "green", marginTop: "10px" }}>
//               Country saved!
//             </p>
//           )}

//           {message && <p style={{ color: "green" }}>{message}</p>}

//           {/* Bordering countries */}
//           {country.borders && country.borders.length > 0 && (
//             <div className="border-countries">
//               <h4>Bordering Countries:</h4>
//               <div className="border-buttons">
//                 {country.borders.map((border) => (
//                   <button key={border} className="border-button">
//                     {border}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
