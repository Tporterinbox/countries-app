// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------
import express from "express";
import pg from "pg";
import config from "./config.js";

const db = new pg.Pool({
  connectionString: config.databaseUrl + "&uselibpqcompat=true",
  ssl: true,
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
    
    `INSERT INTO saved_countries(country_name)
    VALUES ('Mexico') ON CONFLICT (country_name) DO NOTHING;`
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
    // Try to increment count if the country exists
    const result = await db.query(
      `INSERT INTO country_counts(country_name, count)
 VALUES
 ('Ethiopia', 1)
 ON CONFLICT (country_name)
 DO UPDATE
 SET count= country_counts.count+1
 RETURNING count;`,
      // [country_name]
    );

    // If country does not exist, insert it with count = 1
    if (result.rows.length === 0) {
      const countryCounted = await db.query(
        `INSERT INTO saved_countries (country_name, count)
         VALUES ($1, 1)
         RETURNING *;`,
        [country_name]
      );
      return countryCounted.rows[0];
    }

    // Return the updated row
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

  //  1) /add-one-use  Endpoint
  app.post("/add-one-user", async (req, res) => {
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
  app.get("/get-newest-user", async (req, res) => {
    
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

app.post("/save-one-country", async (req, res) => {
  const {
      country_name,    
  } = req.body;

  const user = await saveOneCountry(
      
      country_name
  );
  res.send(`Success!The country is saved.`);

});

// ------------------------

//  2a) /get-all-saved-countries Endpoint 

app.get("/get-all-saved-countries", async (req, res) => {
  const countries = await getAllSavedCountries();
  res.json(countries);
});


// --------------------------

// 3) /update-one-country-count

// Increment count by 1
 
// -------------------Endpoint for Country Count -----------------
app.post("/update-one-country-count", async (req, res) => {
  const { country_name } = req.body;

  if (!country_name) {
    return res.status(400).send("Missing country_name");
  }

  try {
    const updatedCountry = await updateOneCountryCount(country_name);
    res.json(updatedCountry); // return updated country info
  } catch (err) {
    console.error("Error updating country count in endpoint:", err);
    res.status(500).send("Error updating country count");
  }
});