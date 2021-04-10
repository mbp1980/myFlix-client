import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import "./director-view.scss";

export class DirectorView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director } = this.props;

    if (!director) return null;
    // if (!movies) return null;

    
    return (
      <div className="director-view">
        <Card>
          <Card.Title>{director.Name}</Card.Title>
          <Card.Body>
            <Card.Text><h6>Bio:</h6> {director.Bio}</Card.Text>
            <Card.Text><h6>Born:</h6> {director.Birth}</Card.Text>                  
          </Card.Body>
          <Link to={`/`}>
            <Button className="back-button" variant="link">Return to Movies</Button>
          </Link>
        </Card>
      </div>
    );
  }
}


DirectorView.propTypes = {
  director: PropTypes.shape({
    Director: {
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
    },
  }),
};