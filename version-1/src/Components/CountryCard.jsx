
// // Import Link to navigate between pages without reloading
// import { Link } from "react-router-dom";

// // CountryCard component receives "countries" as a prop
// // countries is to be  an ARRAY of country objects
// function CountryCard({ countries }) {

//   // JSX returned by the component----returns the JSX code written
//   return (

//     // Section that wraps ALL cards --- className "cards" allows for CSS styling
//     <section className="cards">

//        {/* Loop through the countries array and creates one card per country with that counries data */}
//       {countries.map((country) => (

//         // Link makes the ENTIRE card clickable
//         // Clicking the card navigates to /CountryDetail-Clicking a card → goes to CountryDetail page
//         <Link
//           to="/CountryDetail"    // route to navigate to CountryDetail page, when card clicked goes to Country Detail Page.
//           key={country.name.common} // unique key for rendering in react that helps React track each card
//           className="card-link"     // removes underline & keeps the styling
//         >

//           {/* The actual card UI --  allows for styling of the card in CSS */}
//           <article className="card">
        
//                {/* Country flag image */}
//               <img
//                 src={country.flags.png}    // image URL from data
//                 alt={country.name.common}  // accessibility text
//                 className="card-logo"       // allows CSS styling for flag image
//               />

//                {/* ------------------------------------- */}
//                {/* Card-content div container -- allows for CSS styling */}
//                   <div className="card-content">
              
//                 {/* Country name inside an H2--from the data */}
//                 <h2>{country.name.common}</h2>

//                 {/* Population that appears on the card , from the data - formatted with commas */}
//                 <p>Population: {country.population.toLocaleString()}</p>

//                 {/* Capital city--capital is an array//show first item if it exists//otherwise show "N/A"
//               */}
//                 <p>Capital: {country.capital?.[0] || "N/A"}</p>

//                 {/* Country region ---from the data*/}
//                 <p>Region: {country.region}</p>
             
//              {/* --------------------------------- */}
//             </div>
//           </article>
//         </Link>
//       ))}
//     </section>
//   );
// }
//   // Export so it can be used in other files (Home.jsx, etc.)
//   export default CountryCard;


// ------------------------------------------------

// Import Link to navigate between pages without reload
import { Link } from "react-router-dom";

// CountryCard is  rendering  one "country"
function CountryCard({ country }) {
  return (
    // The entire card is clickable
    <Link to="/CountryDetail" className="card-link">
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


