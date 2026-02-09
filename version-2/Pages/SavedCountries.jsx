
// Import React hooks used for state and and useEffect
import { useState, useEffect } from "react";
// import "./app.css";

// This is the SavedCountries React functional component
function SavedCountries() {

  // Holds current form state---this is  "state"
   // Holds the current values of the form inputs (controlled form)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    bio: "",
  });

  // Holds newest user from the backend
   // Holds the most recently added user fetched from the backend
  const [newestUserData, setNewestUserData] = useState(null);

  // --->INPUT HANDLING <------
  // Runs every time the user types into an input field
  // Handles typing in inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update only the changed field, keep the rest the same
    setFormData({ ...formData, [name]: value });
  };

   // ------> GET REQUEST <-----

  // GET Fetches newest user from backend
  const getNewestUserData = async () => {
    // JavaScript will attempt to run everything inside the "try" block
    try {
     
      
      // Calls the fetch() API
      // await pauses execution until the server responds
      // The result is stored in response, it’s the HTTP response object
      //response contains status, headers, and body (not the data yet)

      const response = await fetch(
        // The backend URL endpoint is responsible for returning the newest user
        "https://backend-answer-keys.onrender.com/get-newest-user",
        // Send GET request to backend endpoint, This is where the GET request is sent
        // request is reading data-->(GET), not sending data like Post does 
        // Tells the server--“I want to retrieve data”
        { method: "GET" }
      );
      
       // Convert response to JavaScript object
      //  Converts the response body from JSON → JavaScript
      const data = await response.json();
      // Grabs the first (newest) user from the array
      // backend returns an array of users
      // Accesses the first element in the array
      const userData = data[0];

      // useState setter  function
      // Store formatted data in state for display
      // Calls the useState setter and Stores user info so JSX can use it
      setNewestUserData({
        fullName: userData.name,
        email: userData.email,
        country: userData.country_name,
        bio: userData.bio,
      });
       // Log errors if fetch fails, Runs only if something inside try fails
    } catch (error) {
      console.error("Fetch newest user error:", error);
    }
  };

   // ----> POST REQUEST <----
  // POST form data, // Runs when the form is submitted
  const handleSubmit = async (e) => {
    // prevents the default activity from happening
    e.preventDefault();

    // wrapped in a try block
    try {
       // Send form data to backend,"fetch()" sends an HTTP request
      // "await" pauses this function until the request finishes 
      // and This only works because function is an async function
      // Without await, the code would keep running before the request completes
      await fetch(
        // This is the API endpoint (URL) I am sending data to
        // The backend listens at this route for new users
        "https://backend-answer-keys.onrender.com/add-one-user",
        {
          // Specifies the HTTP method, "post" means sending new data to the server
          // Without this:Backend may reject the request or fail to parse the data
          // necessary and critical for POST requests with JSON
          // request is reading data-->(POST),
          method: "POST",
          // headers tell the server how to interpret what’s coming
          headers: {
            // Tell backend that the request body coming is JSON 
            "Content-Type": "application/json",
          },

          // body is the actual data being sent
          // JSON.stringify- Converts a JavaScript object into a JSON string
          body: JSON.stringify({
            // Creates a key called "name", 
            // Its value comes from:formData.fullName (state)
            // Matches frontend → backend field names
            name: formData.fullName,
            email: formData.email,
            country_name: formData.country,
            bio: formData.bio,
          }),
        }
      );

      // Clear the form after successful submit// Resets form
      setFormData({
        fullName: "",
        email: "",
        country: "",
        bio: "",
      });

      // Refresh welcome message with newest user
      getNewestUserData();
    } catch (error) {
      // Log errors if POST fails
      console.error("Error submitting form:", error);
    }
  };

  // ---------------- UseEffect CYCLE ----------------
  // Load newest user on page load
  //  // Runs once when the page loads
  useEffect(() => {
    getNewestUserData();
    // Empty dependency array ---> run only once
  }, []);

  // ---------------- JSX (UI) ----------------
  return (
    <>
      {/* Welcome message above the form */}
      {newestUserData && (
        <h2 className="welcome-message">
          Welcome, {newestUserData.fullName}!
        </h2>
      )}

      <section className="Form">
        <h2>My Profile</h2>

        <form onSubmit={handleSubmit} name="my-profile">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Full name"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />

          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="Country"
            required
          />

          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Bio"
            required
          />

          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  );
}

// Export component so it can be used in other files
export default SavedCountries;


