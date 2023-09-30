import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

const Signup = () => {

  const [credentials, setCredentials] = useState({
    name: "",
    location: "",
    email: "",
    password: ""
  });
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {   

 const response = await axios.post("https://project-weld-nu.vercel.app/creatuser", {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.location
      });
       console.log("response",response.data.message);
     console.log("Data entered:", credentials);
      if (response.status === 200) {
        console.log("User created successfully");
        alert("User created successfully");
      } else {
      console.log("Error creating user");
        }
    } catch(err){
      console.log("User  donot created");
    } 
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }


  return (
    <div className='container fs-5 text-white' >
      
      <form onSubmit={handleSubmit}>
        <div className="form-group ">

          <label htmlFor="exampleInputEmail1">Name</label>
          <input type="text" className="form-control" name='name' onChange={onChange} value={credentials.name} placeholder="Enter Name" />

        </div>
        <div className="form-group">

          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" name='email' onChange={onChange} value={credentials.email} placeholder="Enter email" />

        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control " name='password' onChange={onChange} value={credentials.password} placeholder="Password" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Address</label>
          <input type="text" className="form-control " name='location' onChange={onChange} value={credentials.location} placeholder="Address" />
        </div>
        <button type="submit" className="m-3 btn btn-primary ">Submit</button>
        <Link to="/login" className='m-3 btn btn-danger'>Already a User</Link>
      </form></div>
  )
}

export default Signup
