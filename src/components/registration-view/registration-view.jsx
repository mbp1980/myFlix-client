import axios from 'axios';
import { Form, Button } from "react-bootstrap";
import React, {useState} from "react";
import PropTypes from "prop-types";

import "./registration-view.scss";


export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); 
      

  axios.post("https://bestflixdb.herokuapp.com/users", {
    Username: username,
    Password: password,
    Email: email,
    Birthdate: birthdate
  })
  .then(response => {
    const data = response.data;
    console.log(username, password, email, birthdate);
    props.onRegister(username);
    window.open("/", "_self"); // the second argument "_self" is necessary so that the page will open in the current tab
  })
  .catch(e => {
    console.log(e= "error registering the user")
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
      <Button type="button" onClick={handleSubmit}>Submit</Button>
    </Form>
  )
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      // confirmPassword: PropTypes.string.isRequired,
      birthdate: PropTypes.string.isRequired
  }),
  // onRegister: PropTypes.func.isRequired
};