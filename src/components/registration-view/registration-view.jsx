import { Form, Button } from "react-bootstrap";
import React, {useState} from "react";
import PropTypes from "prop-types";

import "./registration-view.scss";


export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log(username, password, confirmPassword, email, birthdate);
    props.onRegister(username);
  }

  axios.post("https://bestflixdb.herokuapp.com/users", {
    Username: username,
    Password: password,
    Email: email,
    Birthdate: birthdate
  })
  .then(response => {
    const data = response.data;
    console.log(data);
    window.open("/", "_self"); // the second argument "_self" is necessary so that the page will open in the current tab
  })
  .catch(e => {
    console.log("error registering the user")
  });

  return (
    <Form>
      <label >Username: 
        <input type="text" value={username} onChange= {e => 
        setUsername(e.target.value)}/>
      </label>
      <label >Password: 
        <input type="text" value={password} onChange= {e => 
        setPassword(e.target.value)}/>
      </label>
      <label >Email: 
        <input type="email" value={email} onChange= {e => 
        setEmail(e.target.value)}/>
      </label>
      <label >Birthdate: 
        <input type="text" value={birthdate} onChange= {e => 
        setBirthdate(e.target.value)}/>
      </label>
      <Button type="button" onClick={handleSubmit}>Submit</Button>
    </Form>
  )
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      confirmPassword: PropTypes.string.isRequired,
      birthdate: PropTypes.string.isRequired
  }),
  onRegister: PropTypes.func.isRequired
};