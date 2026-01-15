import { useState } from 'react';
// import "./App.css";



// Exports the default function component named SavedCountries
export default function SavedCountries() {
  // starts State
 const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: '',
    bio: '',
  });

  //  This function handles typing in input area on the form 
  // [name]: value,--- is dynamic and allows fields to be updated 
  function handleChange(event) {
    const { name, value,} = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    console.log(formData);
  }

  // This function handles form submit
  function handleSubmit(event) {
    event.preventDefault();
    console.log('Form Submitted:', formData);

    // resets the form
    setFormData({fullName: '', email: '', country: '',  bio: '', });
  }

    // The  return component returns JSX that appears on the screen
    return (
      <>

     


      <section className="Form">

      {/* // <main> is a  HTML element for primary page content */}
     {/* // className="Titles" allows for styling this page’s heading in CSS */}
     <main className="Titles">
       {/* Displays the text "My Saved Countries"  on the page with a <h2>heading*/}
      <h2>My Saved Countries</h2>
      <h2> My Proile </h2>
      </main>



      <form onSubmit={handleSubmit}>
      
      {/* <input type= "text" name="fullName" placeholder="Full Name" value >  */} 
      {/* <label htmlFor="fullName">Full name *</label> */}
      {/* OnChange={handleChange}-->allows typing on the form  */}
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange} 
        /> 


        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        /> 


        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
        /> 


       
        <textarea
          type= "text"
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
        /> 
    
        
       
    <button type="submit">Submit</button>
      </form>

      </section>
    </>
    );
   
}
