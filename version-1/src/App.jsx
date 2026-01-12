

// This page App.jsx- controls layout + pages
// ----------------------------------

// Imports React Router tools:Routes is the container that holds all routes, Route defines a single page path, 
// Link navigates between pages without reloading
import { Routes, Route, Link } from "react-router-dom";

// Imports page components
import Home from "../Pages/Home";
import SavedCountries from "../Pages/SavedCountries";
import CountryDetail from "../Pages/CountryDetail";
// Imports global CSS styles
import "./App.css";



// Declares the main React component and is the root of your entire application called App.Jsx
function App() {
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

      {/* HIDDEN NAV (OPTIONAL / DEBUG ONLY)
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SavedCountries" element={<SavedCountries />} />
        <Route path="/CountryDetail" element={<CountryDetail />} />
      </Routes>
    </div>    
  );
}

// Makes App available to main.jsx
 export default App;



