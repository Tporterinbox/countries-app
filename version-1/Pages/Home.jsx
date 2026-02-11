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

