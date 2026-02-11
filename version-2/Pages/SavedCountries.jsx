
import { useState, useEffect } from "react";

function SavedCountries() {
  // ---------------- UseSTATE for SAVED COUNTRIES ----------------
  const [savedCountries, setSavedCountries] = useState([]);

  // ---------------- USESTATE  for User Profile----------------
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    bio: "",
  });

  const [newestUserData, setNewestUserData] = useState(null);

  // ---------------- Handle  Input----------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ---------------------------------------------------
    // Post request going on country detail page 
  // const handleSaveCountry = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://backend-answer-keys.onrender.com/save-one-country",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           country_name: country.name.common,
  //         }),
  //       }catch (error) {
  //         console.error("Error saving countries:", error);
  //       }
  //     );

    
  // ---------------- GET REQUEST for  Get-all-SAVED COUNTRIES ----------------
  const getSavedCountries = async () => {
    try {
      const response = await fetch(
        "https://backend-answer-keys.onrender.com/get-all-saved-countries"
      );
      const data = await response.json();
      setSavedCountries(data);
    } catch (error) {
      console.error("Error fetching saved countries:", error);
    }
  };

  // ---------------- GET NEWEST USER ----------------
  const getNewestUserData = async () => {
    try {
      const response = await fetch(
        "https://backend-answer-keys.onrender.com/get-newest-user",
      );
      const data = await response.json();
      const user = data[0];

      setNewestUserData({
        fullName: user.name,
        email: user.email,
        country: user.country_name,
        bio: user.bio,
      });
    } catch (error) {
      console.error("Error fetching newest user:", error);
    }
  };

  // ---------- POST REQUEST add-one-user / USER PROFILE ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(
        "https://backend-answer-keys.onrender.com/add-one-user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            country_name: formData.country,
            bio: formData.bio,
          }),
        }
      );

      setFormData({
        fullName: "",
        email: "",
        country: "",
        bio: "",
      });

      getNewestUserData();
    } catch (error) {
      console.error("Error submitting profile:", error);
    }
  };

  // ---------------- LOAD DATA- ON PAGE LOAD ----------------
  useEffect(() => {
    getSavedCountries();   
    getNewestUserData();
  }, []);

  // ---------------- UI/JSX ----------------
  return (
    <>
      {/* WELCOME MESSAGE */}
      {newestUserData && (
        <h2 className="welcome-message">
          Welcome, {newestUserData.fullName}!
        </h2>
      )}

      {/* SAVED COUNTRIES LIST */}
      <section className="saved-countries">
        <h2>Saved Countries</h2>

        {savedCountries.length === 0 ? (
          <p>No saved countries yet.</p>
        ) : (
          <ul>
            {savedCountries.map((country, index) => (
              <li key={index}>{country.country_name}</li>
            ))}
          </ul>
        )}
      </section>

      {/* PROFILE FORM */}
      <section className="Form">
        <h2>My Profile</h2>

        <form onSubmit={handleSubmit}>
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
