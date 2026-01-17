// Imports the useState Hook from React using this react hook
// useState lets this component store and update data (state)
import { useState } from 'react';



// Imports the useState Hook from React
// useState lets this component store and update data (state)
// Export default ---> Exports the default function component named SavedCountries
export default function SavedCountries(countriesData) {
  
  // starts State
  // Creates state  variable called formData and a setter function called setFormData to update it
  // useState initializes the form with empty strings
  // Each key represents a form field
 const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: '',
    bio: '',
  });
  

  //  This function handles typing in input area on the form 
  // This function runs every time the user types in an input or textarea
  // [name]: value,--- is dynamic and allows fields to be updated 
  function handleChange(event) {
    // Destructures the name and value from the element that triggered the event
    // name = input's name attribute (fullName, email, etc.)
    // value = what the user typed
    const { name, value,} = event.target;
    // Updates the formData state
    setFormData((prevFormData) => ({
      // Copies all previous form values
      ...prevFormData,
      // Updates only the field that changed
      // [name] is dynamic (example: fullName, email, country, bio)
      [name]: value,
    }));
    // Logs the current formData to the console
    // Note: This will show the previous state due to async updates
    console.log(formData);
   
  }


  // This function handles form submit and runs when theform is submitted by the user
  function handleSubmit(event) {
    // Prevents the browser from refreshing the page
    event.preventDefault();
    // Logs the submitted form data
    console.log('Form Submitted:', formData);

    // resets the form
    // Resets all form fields back to empty strings
    setFormData({fullName: '', email: '', country: '',  bio: '', });
  }


    // The  return component returns JSX that appears on the screen
    return (
      <>
       {/* React Fragment – groups elements without adding extra HTML */}
      
      {/* section --> groups related form code, className from allows for CSS styling */}
      <section className="Form">

      {/* // <main> --> is a  HTML element for primary/main content on the page*/}
     {/* // className="Titles" --> allows for styling the headings in CSS */}
     <main className="Titles">
       {/* Displays the text "My Saved Countries" and "my profile" on the page with a <h2>heading*/}
      <h2>My Saved Countries</h2>
      <h2> My Proile </h2>
      </main>

  
      {/* onSubmit ----> is a React "EVENT"  attribute that listens for The event 
       and tells react when to call the function called handleSubmit
        handleSubmit ----> is the function that handles the form submission */}
        {/* this line of code connects the form to that function: */}
      <form onSubmit={handleSubmit}>
      
      {/* This is the "name" input  */}
      {/* OnChange={handleChange}-->allows typing on the form  */}
        <input
        // This is the "Text "input field, type describes the type of input.
          type="text"    
          // Matches formData.fullName
          name="fullName" 
          // Hint text that tells the user what info goes into the name input area
          placeholder="Full Name"
          // value={formData.fullName} is Controlled value from state, 
          value={formData.fullName}
          // Allows typing, handleChange runs every time the user types in an input or textarea
          onChange={handleChange} 
        /> 

         {/* Email Input area*/}
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        /> 

        {/* Country Input area*/}
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
        /> 


        {/* Bio input area */}
        <textarea
          type= "text"
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
        /> 
    
        
     {/* Form submit button */}
     <button type="submit">Submit</button>
      </form>

      </section>
     </>
     );
   
}
