

import { useState, useEffect } from "react";
// import "./app.css";

function SavedCountries() {
  // Holds current form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    bio: "",
  });

  // Holds newest user from the backend
  const [newestUserData, setNewestUserData] = useState(null);

  // Handles typing in inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // GET newest user from backend
  const getNewestUserData = async () => {
    try {
      const response = await fetch(
        "https://backend-answer-keys.onrender.com/get-newest-user",
        { method: "GET" }
      );

      const data = await response.json();
      const userData = data[0];

      setNewestUserData({
        fullName: userData.name,
        email: userData.email,
        country: userData.country_name,
        bio: userData.bio,
      });
    } catch (error) {
      console.error("Fetch newest user error:", error);
    }
  };

  // POST form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(
        "https://backend-answer-keys.onrender.com/add-one-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            country_name: formData.country,
            bio: formData.bio,
          }),
        }
      );

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        country: "",
        bio: "",
      });

      // Refresh welcome message
      getNewestUserData();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Load newest user on page load
  useEffect(() => {
    getNewestUserData();
  }, []);

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

export default SavedCountries;
