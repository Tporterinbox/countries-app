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


// -------------------------------

