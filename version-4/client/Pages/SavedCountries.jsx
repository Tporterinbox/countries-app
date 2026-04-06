import { useState, useEffect } from "react";

function SavedCountries({ countries }) {
  const [savedCountries, setSavedCountries] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    bio: "",
  });

  const [newestUserData, setNewestUserData] = useState(null);

  // ---------------- Handle Input ----------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ---------------- GET SAVED COUNTRIES ----------------
  const getSavedCountries = async () => {
    try {
      const response = await fetch("/api/get-all-saved-countries");
      const data = await response.json();

      console.log("Saved countries from DB:", data); // 🔍 DEBUG

      setSavedCountries(data);
    } catch (error) {
      console.error("Error fetching saved countries:", error);
    }
  };

  // ---------------- GET NEWEST USER ----------------
  const getNewestUserData = async () => {
    try {
      const response = await fetch("/api/get-newest-user");
      const data = await response.json();

      if (!data) return;

      setNewestUserData({
        fullName: data.name,
        email: data.email,
        country: data.country_name,
        bio: data.bio,
      });
    } catch (error) {
      console.error("Error fetching newest user:", error);
    }
  };

  // ---------------- SUBMIT USER ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/add-one-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          country_name: formData.country,
          bio: formData.bio,
        }),
      });

      if (!response.ok) throw new Error("Failed to save user");

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

  // ---------------- LOAD DATA ----------------
  useEffect(() => {
    getSavedCountries();
    getNewestUserData();
  }, []);

  return (
    <>
      {/* ---------------- SAVED COUNTRIES ---------------- */}
      <section className="saved-countries">
        <h2>My Saved Countries</h2>

        {savedCountries.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <div className="saved-country-grid">
            {savedCountries.map((saved, index) => {
              // 🔴 IMPORTANT FIX: safer matching
              const country = countries.find(
                (c) =>
                  c.name.common.toLowerCase() ===
                  saved.country_name?.toLowerCase()
              );

              // 🔍 DEBUG fallback (so you SEE missing matches)
              if (!country) {
                return (
                  <div key={index} className="country-card">
                    <p>Not found: {saved.country_name}</p>
                  </div>
                );
              }

              return (
                <div className="country-card" key={index}>
                  <img
                    src={country.flags.png}
                    alt={country.name.common}
                    className="country-flag"
                  />

                  <div className="card-content">
                    <h2>{country.name.common}</h2>
                    <p>
                      <strong>Region:</strong> {country.region}
                    </p>
                    <p>
                      <strong>Capital:</strong>{" "}
                      {country.capital ? country.capital[0] : "N/A"}
                    </p>
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

      {/* ---------------- WELCOME ---------------- */}
      {newestUserData && (
        <h2 className="welcome-message">
          Welcome back, {newestUserData.fullName}!
        </h2>
      )}

      {/* ---------------- FORM ---------------- */}
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