import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const Login = () => {
  const nevigate=useNavigate();
  // Initialize the state to hold form input values
  const [credentials, setCredentials] = useState({
    name: "",
    location: "",
    email: "",
    password: ""
  });
// Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {  
      // Send a POST request to the server with user credentials
      const response = await axios.post("http://localhost:5000/api/loginuser", {
        email: credentials.email,
        password: credentials.password,
      });
      // Log the entered credentials
      console.log("Data entered:", credentials);
      if (response.status === 200) {
          // If login is successful, update the UI and store the auth token
        console.log("User Login successfully");
        alert("User successfully Login");
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", response.data.authToken);
      console.log(localStorage.getItem("authToken"));
       // Navigate to the desired page (e.g., homepage)
        nevigate("/");
      } else {
        console.log("Error creating user");
      }
    } catch (err) {
        // Handle any errors that occur during the login process
      console.log("User  donot created", err);
    }
  };
  // Function to update the state when input fields change
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  return (
    <div className='text-white'>
      <div className='container fs-5 text-white' >
        {/* name:'name'  */}
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">

            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" name='email' onChange={onChange} value={credentials.email} placeholder="Enter email" />

          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control " name='password' onChange={onChange} value={credentials.password} placeholder="Password" />
          </div>
         
          <button type="submit" className="m-3 btn btn-primary ">Submit</button>
          <Link to="/creatuser" className='m-3 btn btn-danger'>Singup</Link>
        </form>
      </div>

    </div>
  )
}

export default Login