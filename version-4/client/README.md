# 🌍 Countries App

Project's Title — Countries App

📌 --Project Description & Purpose--
This project is - A countries app designed to share information about different countries around the world.

🚀 --Live Site--
Here's the link to view the live app: https://countries-app-version-4-tee.netlify.app/


🖼️ --Screenshots--
Here is where I have included a screenshot of my project

<img width="850" height="500" alt="Screenshot 2026-04-06 at 1 01 03 AM" src="https://github.com/user-attachments/assets/7d71ba70-f888-4848-af6f-1e222f978d9d" />


<------------------------------------------------------->

✨--Features--:
--This is what you can do on the app--: (Test Case Scenarios)

--Form data--
As a User, when I submit the form, my data should be stored in a PostgreSQL database
As a User, If I’ve already submitted the form, I should see “Welcome, [my name]!” above the form on the Saved Countries page

--Saved Countries--
As a User, When I click the Save button on a country’s page, that country should be saved in the database
As a User, I should be able to view all saved countries on the Saved Countries page

--View Count--
As a User, Each time I open a country’s detail page, the view count for that country should increase by 1
As a User, I should be able to see the total number of times I’ve viewed each country

<-------------------------------------------------------->

🛠️ Tech Stack
Frontend

Languages: JavaScript
Framework: REACT
Deployment: Github and Netlify
Server/API:

Languages: \***\*\_\_\_\*\***
Framework: \***\*\_\_\_\*\***
Deployment: \***\*\_\_\_\*\***
Database

Languages: \***\*\_\_\_\*\***
Deployment: \***\*\_\_\_\*\***

<-------------------------------------------------------->

🔹 API Documentation
These are the API endpoints I built shown Below:
// -----------------

// --Form Data Endpoints---

 1- /add-one-user Endpoint
'''app.post("/api/add-one-user", async (req, res) => {
const {
name,
country_name,
email,
bio

    } = req.body;

    const user = await addOneUser(
        name,
        country_name,
        email,
        bio

    );

    // res.send(`Success! ${user.name} has been added!`);
     res.json(user);

});```

// -------------------------

// 1a- /get-newest-user Endpoint
app.get("/api/get-newest-user", async (req, res) => {

    const user = await getNewestUser();

    // res.send(`Success! ${user.name} has been added!`);
     res.json(user);

});

// ----with error handiling (/get-newest-user)
// GET endpoint to fetch the newest user
// app.get("/get-newest-user", async (req, res) => {
// try {
// const user = await getNewestUser(); // no parameters needed
// res.json(user); // send the newest user as JSON
// } catch (error) {
// console.error(error);
// res.status(500).send("Error fetching the newest user");
// }
// });

// ------------------------------------

// 2- /save-one-country Endpoint

app.post("/api/save-one-country", async (req, res) => {
const { country_name } = req.body;

try {
const saved = await saveOneCountry(country_name);

    res.json({
      message: "Country saved successfully",
      country: saved,
    });

} catch (error) {
console.error(error);
res.status(500).json({ error: "Failed to save country" });
}
});

// -----------------------------------

// 2a- /get-all-saved-countries Endpoint

app.get("/api/get-all-saved-countries", async (req, res) => {
const countries = await getAllSavedCountries();
res.json(countries);
});

// ----------------------------------

// 3- /update-one-country-count

// Increment count by 1

// -------------------Endpoint for Country Count -----------------
app.post("/api/update-one-country-count", async (req, res) => {
const { country_name } = req.body;

if (!country_name) {
return res.status(400).send("Missing country_name");
}

try {
const updatedCountry = await updateOneCountryCount(country_name);

    res.json({
      count: updatedCountry.count,
    });

} catch (err) {
console.error("Error updating country count in endpoint:", err);
res.status(500).send("Error updating country count");
}
});

<-------------------------------------------------------->

----> Here's the link to the full API documentation: \***\*\_\_\*\***

🗄️ Database Schema
Here’s the SQL I used to create my tables:
Put your CREATE TABLE statements here!

-- -------- users Table ----------

-- Create the users table
-- It should have 5 columns:
-- user_id
-- name
-- country_name
-- email
-- bio

-- Apply these constraints:
-- PRIMARY KEY: Choose one column that uniquely identifies each user
-- NOT NULL: Use on columns that must always have a value
-- UNIQUE: Use on columns that must have unique values across all users

CREATE TABLE users (
user_id SERIAL PRIMARY KEY,
name VARCHAR NOT NULL,
country_name VARCHAR NOT NULL,
email VARCHAR NOT NULL UNIQUE,
bio VARCHAR NOT NULL  
);

-- Insert 3 users into the users table
INSERT INTO users(
name, country_name, email, bio
)

VALUES
('Arianna','Brazil','arianna@gmail.com', 'Hello!'),
('Phil','Mexico','phil@hotmail.com','Howdy!'),

('Ainslie', 'Antartica', 'ainslie@aol.com',
'Hey!');

-- --- saved_countries Table -----
-- Create the saved_countries table
-- It should have 2 columns:
-- saved_country_id
-- country_name

-- Apply these constraints:
-- PRIMARY KEY: Choose one column that uniquely identifies each saved country
-- NOT NULL: Use on columns that must always have a value
-- UNIQUE: Use on columns that must have unique values across all saved countries

CREATE TABLE saved_countries (
saved_country_id SERIAL PRIMARY KEY,
country_name VARCHAR NOT NULL UNIQUE
);

-- Insert these 3 countries into the saved_countries table:
-- Ethiopia
-- Brazil
-- Mexico

INSERT INTO saved_countries (
country_name
)

VALUES
('Ethiopia'),
('Brazil'),
('Mexico');

---

-- ---- country_counts Table-----

---

-- Create the country_counts table
-- It should have 3 columns:
-- country_count_id
-- country_name
-- count

-- Apply these constraints:
-- PRIMARY KEY: Choose one column that uniquely identifies each country count
-- NOT NULL: Use on columns that must always have a value
-- UNIQUE: Use on columns that must have unique values across all country counts

CREATE TABLE country_counts (
country_count_id SERIAL PRIMARY KEY,
country_name VARCHAR NOT NULL UNIQUE,
count INTEGER
);

-- Insert these 3 countries into the country_counts table:
-- Ethiopia
-- Brazil
-- Mexico
-- Each country's count should start at 1.

INSERT INTO country_counts (country_name,
count)

VALUES
('Ethiopia', 1),
('Brazil', 1),
('Mexico', 1);

<------------------------------------------------------>

💭 -Reflections-
What I learned: How to Create Front End and Backend Connectivity for Countries app

What I'm proud of: The projects that I completed and all that I have acomplished in this past year as a Junior Full Stack Developer

What challenged me: What challenged me the most was completing multiple projects simultaneously in which I was sucessfully able to do.

Future ideas for how I'd continue building this project:
I would like to add the primary languages spoken for each country and other relevant information .
