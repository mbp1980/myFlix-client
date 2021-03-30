import { Form, Button } from "react-bootstrap";
import React, {useState} from "react";
import PropTypes from "prop-types";


export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log(username, password, email, birthdate);
    props.onRegister(username);
  }

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