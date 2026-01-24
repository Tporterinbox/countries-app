// Home page displays the data, Diplays List

// Imports the reusable card component.
// Each country will be displayed using CountryCard component
import CountryCard from "../src/Components/CountryCard";

// Declares the Home component
// Uses destructuring to receive the "countries" prop from App.jsx
export default function Home({ countries }) {

  // Creates a copy of the countries array
  // Sort countries alphabetically by name
  const sortedCountries = [...countries].sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  );

  //  Starts and Returns the JSX that will be rendered on the screen
  return (

    //  main represents the main content of the page
    <main className="page">

      {/* className Cards Groups all country cards together
      and is styled as a grid in CSS, card styling  */}
      <section className="cards">

        {/* This Loop, 
        Loops through the sorted countries array--> 
        Loops over countries, Runs once per country 
        Sends each country to CountryCard */}
        {sortedCountries.map((country) => (

          // "CountryCard" Renders one CountryCard per country
          // key helps React track list items efficiently
          //  country={country} -->Passes the entire country object as a prop
          <CountryCard
            key={country.cca3}
            country={country}
          />

          // ))} --> Ends the .map() loop 
        ))}

      </section>
    </main>
  );
}

// ------------------------------------------------

// import { useState } from "react";
// import CountryCard from "../src/Components/CountryCard";

// export default function Home({ countries }) {
//   // Search text
//   const [searchTerm, setSearchTerm] = useState("");

//   // Region filter
//   const [selectedRegion, setSelectedRegion] = useState("");

//   // Filter + sort
//   const filteredCountries = [...countries]
//     .filter((country) =>
//       country.name.common
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//     )
//     .filter((country) =>
//       selectedRegion === ""
//         ? true
//         : country.region === selectedRegion
//     )
//     .sort((a, b) =>
//       a.name.common.localeCompare(b.name.common)
//     );

//   return (
//     <main className="page">

//       {/*  SEARCH + REGION FILTER */}
//       <div className="filters">

//         {/* SEARCH */}
//         <input
//           type="text"
//           placeholder="Search for a country..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         {/* REGION DROPDOWN */}
//         <select
//           value={selectedRegion}
//           onChange={(e) => setSelectedRegion(e.target.value)}
//         >
//           <option value="">Filter by Region</option>
//           <option value="Africa">Africa</option>
//           <option value="Americas">Americas</option>
//           <option value="Asia">Asia</option>
//           <option value="Europe">Europe</option>
//           <option value="Oceania">Oceania</option>
//         </select>

//       </div>

//       {/* COUNTRY CARDS */}
//       <section className="cards">
//         {filteredCountries.map((country) => (
//           <CountryCard
//             key={country.cca3}
//             country={country}
//           />
//         ))}
//       </section>

//     </main>
//   );
// }
