// This page main.jsx = bootstraps React

// Imports the core React library, Needed for JSX and React features
import React from 'react';

// Imports ReactDOM’s modern root API, Used to mount your React app into the browser DOM
import ReactDOM from 'react-dom/client';

// Imports the router that enables client-side navigation, 
// Allows <Link />, <Routes />, and <Route /> to work
import { BrowserRouter } from 'react-router-dom';

// Imports your main App component, This is the root component of your application
import App from './App';

// Imports global CSS styles, for CSS styling to be applied 
import './index.css';



// Finds the <div id="root"></div> in index.html, Creates a React root and renders your app into it
ReactDOM.createRoot(document.getElementById('root')).render(

  // Enables extra checks during development, Helps catch:Unsafe lifecycle methods, Deprecated patterns, 
  // Runs only in development, not production
  <React.StrictMode>
    
    {/* Wraps your entire app with routing support, Required for: <Link />, <Routes />, 
    <Route /> Uses the browser’s URL bar for navigation, enables routing*/}
    <BrowserRouter>
    {/* Renders your main App component, App component contains: Header, Routes and Compnents*/}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

