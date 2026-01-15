
// Import Link to navigate between pages without reload
import { Link, useParams } from "react-router-dom";

// CountryCard is  rendering  one "country"
function CountryCard({ country }) {
  const countryName= useParams().countryName;
  console.log(countryName);

  return (
    // The <link to > makes the entire card is clickable
    <Link to={`/CountryDetail${countryName}`} className="card-link">
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


