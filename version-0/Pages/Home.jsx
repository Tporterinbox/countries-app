// // Import useState so we can store and manage component state, allow me to Filter countries-and make updates
// import { useState } from "react";
// // Import local country data (array of country objects) from countries data located on localData Page
// import localData from "../Data/localData";
// // Import the CountryCard component that displays the cards
// import CountryCard from "../Components/CountryCard";





// // Home page component
// export default function Home() {

//   // useState creates state called "countries"
//   // It is initialized with localData sorted alphabetically by country name
//   // usestate variable and setter function --- with countries sorted alphabetically by name.common
//   //  [...localData]--Creates a copy of the array, Prevents modifying the original data, 

//   const [countries, setCountries] = useState(
//     [...localData].sort((a, b) => a.name.common.localeCompare(b.name.common))
//   );

//   // JSX returned by the Home component
//   return (

//     // <main> is a semantic HTML element for main page content
//     // className="page" is used for page-level styling
//     <main className="page">


//      {/* Render the CountryCard component */}
//       {/* Pass the countries state as a prop */}
//       <CountryCard countries={countries} />
//     </main>
//   );
// }


// --------------------------------------

import { useState } from "react";
import localData from "../src/Data/localData";
import CountryCard from "../src/Components/CountryCard";

export default function Home() {
  const [countries] = useState(
    [...localData].sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    )
  );

  return (
    <main className="page">

      {/* GRID goes here */}
      <section className="cards">
        {countries.map((country) => (
          <CountryCard
            key={country.name.common}
            country={country}
          />
        ))}
      </section>

    </main>
  );
}
