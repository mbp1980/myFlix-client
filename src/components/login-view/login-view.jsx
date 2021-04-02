import axios from "axios";
import { Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import PropTypes from "prop-types";


export function LoginView(props) {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(username, password);
  //   // Send a request to the server for authentication then call props.onLoggedIn(username)
  //   props.onLoggedIn(username);
  // };

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
      console.log(e.response.data);
    });
  };

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
        </Button>
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