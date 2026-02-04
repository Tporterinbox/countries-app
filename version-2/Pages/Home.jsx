


// Home.jsx
// Displays list of countries with Search + Region Filter

import { useState } from "react";
import CountryCard from "../src/Components/CountryCard";

export default function Home({ countries }) {
  //  Search input state
  const [searchTerm, setSearchTerm] = useState("");

  //  Region filter state
  const [selectedRegion, setSelectedRegion] = useState("");

  // Filter + sort countries
  const filteredCountries = [...countries]
    // Search by country name
    .filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    // Filter by region
    .filter((country) =>
      selectedRegion
        ? country.region === selectedRegion
        : true
    )
    // Sort alphabetically
    .sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );

  return (
    <main className="page">

      {/*  SEARCH + REGION FILTER */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      {/*  Country Cards */}
      <section className="cards">
        {filteredCountries.map((country) => (
          <CountryCard
            key={country.cca3}
            country={country}
          />
        ))}
      </section>

    </main>
  );
}
