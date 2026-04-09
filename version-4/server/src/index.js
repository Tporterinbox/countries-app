// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------
import express from "express";
import pg from "pg";
// import config from "./config.js";

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true, // use SSL encryption when connecting to the database
});

const app = express();
app.use(express.json());

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


// ---------------------------------
// Helper Functions
// ---------------------------------

  // ----Form Data Helper Functions -------


//   1) --> addOneUser Helper Function
  async function addOneUser(
    name,
   country_name,
    email,
    bio
  
  ) {
    const result = await db.query(
      `INSERT INTO users (name,country_name, email, bio)
        VALUES ($1, $2, $3, $4)
        RETURNING *;`,
       
      [
        name,
        country_name,
        email,
        bio
      ],


    );
  
    return result.rows[0];
  }
//   Note: VALUES + RETURNING is only for INSERT when adding "info:
//  Only need to add parameter when you are inserting info into a table 
// use req.body  when inserting info.


//  --------------------------------

// 1a) --> getNewestUser  Helper Function
async function getNewestUser() {
  const result = await db.query(
    `SELECT * FROM users ORDER BY user_id DESC LIMIT 1;`
  
  );

  return result.rows[0];
}

// ------------------  Saved Countries Helper Functions-----------

//  2) --> saveOneCountry   Helper Function

async function saveOneCountry(country_name) {
  const result = await db.query(
    `INSERT INTO saved_countries (country_name)
     VALUES ($1)
     ON CONFLICT (country_name) DO NOTHING
     RETURNING *;`,
    [country_name]
  );

  return result.rows[0];
}

// -------------------------------------

//  2a) --> getAllSavedCountries

async function getAllSavedCountries() {
//  gets all the saved countries 
  const result = await db.query("SELECT * FROM saved_countries;");
  return result.rows;
}

// -------------------Country Count Helper Functions-----------

// INSERT INTO country_counts(country_name, count)
//  VALUES
//  ('Ethiopia', 1)
//  ON CONFLICT (country_name)
//  DO UPDATE
//  SET count= country_counts.count+1
//  RETURNING count;
// 3)  ---> updateOneCountryCount

async function updateOneCountryCount(country_name) {
  try {
    const result = await db.query(
      `INSERT INTO country_counts (country_name, count)
       VALUES ($1, 1)
       ON CONFLICT (country_name)
       DO UPDATE SET count = country_counts.count + 1
       RETURNING count;`,
      [country_name]
    );

    return result.rows[0];

  } catch (error) {
    console.error("Error updating country count:", error);
    throw error;
  }
}
// ----------------------------------------------------------------
// API Endpoints
// ----------------------------------------------------------------

  // --Form Data Endpoints--- 

  //  1) /add-one-user  Endpoint
  app.post("/api/add-one-user", async (req, res) => {
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
  });
  

  // -------------------------


//  1a) /get-newest-user  Endpoint 
  app.get("/api/get-newest-user", async (req, res) => {
    
    const user = await getNewestUser();
  
    // res.send(`Success! ${user.name} has been added!`);
     res.json(user);
  });
  

  // ----with error handiling  (/get-newest-user)
  // GET endpoint to fetch the newest user
// app.get("/get-newest-user", async (req, res) => {
//   try {
//     const user = await getNewestUser(); // no parameters needed
//     res.json(user); // send the newest user as JSON
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error fetching the newest user");
//   }
// });

// ------------------------------------

// 2) /save-one-country Endpoint 

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
// ------------------------

//  2a) /get-all-saved-countries Endpoint 

app.get("/api/get-all-saved-countries", async (req, res) => {
  const countries = await getAllSavedCountries();
  res.json(countries);
});


// --------------------------

// 3) /update-one-country-count

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