import axios from "axios";
import { Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import PropTypes from "prop-types";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export function LoginView(props) {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  
  const handleSubmit = (e) => {
    e.preventDefault();
    //Send a request to the server for authentication
    axios.post("https://bestflixdb.herokuapp.com/login", {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log("user does not exist");
      console.log(e);
    });
    
  };

  

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Enter username" 
        value={username} onChange={
          e => setUsername(e.target.value)} 
          />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        type="password" 
        placeholder="Password" 
        value={password} onChange={
          e => setPassword(e.target.value)} 
          />
      </Form.Group>
      <Button 
        variant="primary" 
        type="submit" 
        onClick={handleSubmit}
        >Submit
      </Button>
        <br/>
        <br/>
        <p>Don't have an account?  Register below</p>   
         <Link to={`/register`}>
            <Button variant="primary" type="submit">
            Register
            </Button>
          </Link>
  
    </Form>
    
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
};