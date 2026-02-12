

// This page App.jsx- controls layout + pages
// App page owns the data , Fetches API + State


// Imports React Router tools:Routes is the container that holds all routes, Route defines a single page path, 
// Link navigates between pages without reloading
import { Routes, Route, Link } from "react-router-dom";

// Imports page components
import Home from "../Pages/Home";
import SavedCountries from "../Pages/SavedCountries";
import CountryDetail from "../Pages/CountryDetail";
// Imports global CSS styles
import "./App.css";
// Imports useEffect
import {useEffect,useState} from 'react';
// import {localData} from "../Data/localData";


// Declares the main React component and is the root of your entire application called App.Jsx
function App() {


  const getCountriesData = async () => {
    try {
      const apiResponse = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,cca3,borders"
      );
      // API function returns data here
      const apiData = await apiResponse.json();
      return apiData; // REQUIRED
    } catch (error) {
      console.log(error);
      return []; // safe fallback
    }
  };
  

const [countriesData, setCountriesData] = useState([]);
// useEffect runs ONCE when page load, Fetches API data, Saves it in state
// Calls the function on page load using the useEffect hook
// Data is saved in countriesData
useEffect(() => {
  getCountriesData()
  .then((data)=> setCountriesData(data))
}, []);

  return (
    <div>

      {/* GLOBAL HEADER (VISIBLE ON ALL PAGES) 
      Styled in CSS, the Header Appears on every page because it’s outside of <Routes> */}
      <div className="header">
        <h1 className="main-title">
          {/* Navigates to /  and Shows the Home page, 
          Uses Link so the page does not reload*/}
          <Link to="/">Where in the world?</Link>
        </h1>

        {/* Paragraph for tex that is a link- on the Saved Countries Page  */}
        <p className="sub-title">
          <Link to="/SavedCountries">Saved Countries</Link>
        </p>
      </div>

      {/* HIDDEN NAV (OPTIONAL / For Debugging only)
      Hidden in  CSS with (display: none) */}
      <div className="nav"> 
        {/* Unordered list for nav links*/}
        <ul>
          <li><Link to="/">Home</Link></li>  {/*Link to Home page*/}
          <li><Link to="/SavedCountries">SavedCountries</Link></li> {/*Link to Saved Countries page*/}
          <li><Link to="/CountryDetail">CountryDetail</Link></li>   {/*Link to Country Detail page*/}
        </ul>
      </div>  {/*ends the div for the hidden nav bar*/}


      {/* PAGE ROUTES , This <Routes> Wrapper that holds all route definitions
      Route Path= The URL   Element= The component that will be rendered*/}
      {/* :countryName   makes the route dynamic and shows on browser*/}
      {/* countries={countriesData} --> passes "countriesData" as "props" to pages,
       All pages receive the same API data */}
      <Routes>
  <Route
    path="/"
    element={<Home countries={countriesData} />}
  />

  <Route
    path="/SavedCountries"
    element={<SavedCountries countries={countriesData} />}
  />

  <Route
    path="/CountryDetail/:countryName"
    element={<CountryDetail countries={countriesData} />}
  />
</Routes>

    </div>    
  );
}

// Makes App available to main.jsx
 export default App;



