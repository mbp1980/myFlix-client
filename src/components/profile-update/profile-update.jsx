import axios from 'axios';
import { Form, Button } from "react-bootstrap";
import React, {useState} from "react";
import PropTypes from "prop-types";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";




export function ProfileUpdate() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleUpdate = (user) => {
    e.preventDefault(); 
      
  axios.put(`https://bestflixdb.herokuapp.com/users/${user}`, {
    Username: username,
    Password: password,
    Email: email,
    Birthdate: birthdate
  })
  .then(response => {
    const data = response.data;
    // console.log(username, password, email, birthdate, data);
    // props.onUpdate(username);
    localStorage.setItem("user", data.Username);
          // props.setUsername(data.Username);
          alert("Your profile was updated successfully");
    window.open("/", "_self"); // the second argument "_self" is necessary so that the page will open in the current tab
  })
  .catch(e => {
    // console.log(e= "error registering the user")
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
          e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter email" 
          value={email} onChange={
          e => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Password" 
          value={password} onChange={
          e => setPassword(e.target.value)} />
      </Form.Group> 
      <Form.Group controlId="formBirthdate">
          <Form.Label>Enter Date of Birth:</Form.Label>
          <Form.Control 
            className="form-field"
            type="date" 
            placeholder="MM/DD/YYYY" 
            // required
            value={birthdate} 
            onChange={(e) => setBirthdate(e.target.value)}/>
        </Form.Group> 
        <Link to={`/profile`}>     
      <Button type="button" onClick={handleUpdate}>Submit</Button>
      </Link>
    </Form>
  )
}

ProfileUpdate.propTypes = {
  update: PropTypes.shape({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      // confirmPassword: PropTypes.string.isRequired,
      birthdate: PropTypes.string.isRequired
  }),
  // onRegister: PropTypes.func.isRequired
};