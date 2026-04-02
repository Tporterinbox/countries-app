// Import React hooks for state management 
import { useState, useEffect } from "react";

// Define the SavedCountries component and accept 'countries' as a prop
function SavedCountries({ countries }) {

  // STATE: stores the list of saved countries from backend
  const [savedCountries, setSavedCountries] = useState([]);

  // STATE: stores user input values from the form
  const [formData, setFormData] = useState({
    // User's full name input
    fullName: "",
    // User's email input
    email: "",
    // User's country input
    country: "",
    // User's bio input
    bio: "",
  });

  // STATE: stores the newest user fetched from backend
  const [newestUserData, setNewestUserData] = useState(null);

  // FUNCTION: handles input changes in the form
  const handleInputChange = (e) => {
    // Extract name and value from the input field
    const { name, value } = e.target;

    // Update formData by copying existing values and updating the changed field
    setFormData({ ...formData, [name]: value });
  };

  // FUNCTION: fetch all saved countries from backend API
  const getSavedCountries = async () => {
    try {
      // Send GET request to backend endpoint
      const response = await fetch("/api/get-all-saved-countries");

      // Convert response to JSON format
      const data = await response.json();

      // Store fetched countries in state
      setSavedCountries(data);
    } catch (error) {
      // Log error if request fails
      console.error("Error fetching saved countries:", error);
    }
  };

  // FUNCTION: fetch the most recently added user
  const getNewestUserData = async () => {
    try {
      // Send GET request to backend endpoint
      const response = await fetch("/api/get-newest-user");

      // Convert response to JSON
      const data = await response.json();

      // Get the first user (assumed newest)
      const user = data[0];

      // Update state with mapped user data
      setNewestUserData({
        // Map backend 'name' to frontend 'fullName'
        fullName: user.name,
        // Store email
        email: user.email,
        // Map backend 'country_name'
        country: user.country_name,
        // Store bio
        bio: user.bio,
      });
    } catch (error) {
      // Log error if request fails
      console.error("Error fetching newest user:", error);
    }
  };

  // FUNCTION: handles form submission and sends data to backend
  const handleSubmit = async (e) => {
    // Prevent default form submission behavior (page reload)
    e.preventDefault();

    try {
      // Send POST request to backend endpoint
      await fetch("api/add-one-user", {
        // Specify HTTP method
        method: "POST",
        // Set headers to indicate JSON data
        headers: { "Content-Type": "application/json" },

        // Convert form data into JSON format for backend
        body: JSON.stringify({
          // Map frontend fullName to backend name
          name: formData.fullName,
          // Send email
          email: formData.email,
          // Map frontend country to backend country_name
          country_name: formData.country,
          // Send bio
          bio: formData.bio,
        }),
      });

      // Reset form fields after successful submission
      setFormData({
        fullName: "",
        email: "",
        country: "",
        bio: "",
      });

      // Refresh newest user data to update UI
      getNewestUserData();
    } catch (error) {
      // Log error if submission fails
      console.error("Error submitting profile:", error);
    }
  };

  // EFFECT: runs once when component mounts (on page load)
  useEffect(() => {
    // Fetch saved countries
    getSavedCountries();
    // Fetch newest user
    getNewestUserData();
  }, []);

  // RETURN: JSX UI rendering
  return (
    <>
      {/* SECTION: Saved Countries Display */}
      <section className="saved-countries">
        {/* Section title */}
        <h2> My Saved Countries</h2>

        {/* Conditional rendering: show loading if no data */}
        {savedCountries.length === 0 ? (
          // Loading message
          <p>Loading.....</p>
        ) : (
          // Grid container for country cards
          <div className="saved-country-grid">

            {/* Loop through saved countries */}
            {savedCountries.map((saved, index) => {

              // Find full country details from countries prop
              const country = countries.find(
                (c) => c.name.common === saved.country_name
              );

              // If no matching country found, skip rendering
              if (!country) return null;

              // Render country card
              return (
                <div className="country-card" key={index}>

                  {/* Display country flag */}
                  <img
                    src={country.flags.png}
                    alt={`Flag of ${country.name.common}`}
                    className="country-flag"
                  />

                  {/* Card content container */}
                  <div className="card-content">
                    {/* Country name */}
                    <h2>{country.name.common}</h2>

                    {/* Country region */}
                    <p><strong>Region:</strong> {country.region}</p>

                    {/* Country capital with fallback */}
                    <p>
                      <strong>Capital:</strong>{" "}
                      {country.capital ? country.capital[0] : "N/A"}
                    </p>

                    {/* Country population formatted */}
                    <p>
                      <strong>Population:</strong>{" "}
                      {country.population.toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Conditional rendering: show welcome message if user exists */}
      {newestUserData && (
        <h2 className="welcome-message">
          {/* Display user's name */}
          Welcome back, {newestUserData.fullName}!
        </h2>
      )}

      {/* SECTION: User Profile Form */}
      <section className="Form">
        {/* Form title */}
        <h2>My Profile</h2>

        {/* Form element with submit handler */}
        <form onSubmit={handleSubmit}>

          {/* Input: Full Name */}
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Full name"
            required
          />

          {/* Input: Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />

          {/* Input: Country */}
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="Country"
            required
          />

          {/* Input: Bio */}
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Bio"
            required
          />

          {/* Submit button */}
          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  );
}

// Export component so it can be used in other files
export default SavedCountries;
