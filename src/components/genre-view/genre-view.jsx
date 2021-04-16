import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import "./genre-view.scss";

export class GenreView extends React.Component {

    constructor() {
      super();
  
      this.state = {};
    }
  
    render() {
      const { genre, onGoBack } = this.props;
  
      if (!genre) return null;
        
      
      return (
        <div className="genre-view">
          <Card>
            <Card.Title>{genre.Name}</Card.Title>
            <Card.Body>
              <Card.Text><strong>Description:</strong>{genre.Description}</Card.Text>           
            </Card.Body>
            <Button onClick= {() => onGoBack()} className="back-button" variant="link">Return to Movie</Button>
          </Card>
        </div>
      );
    }
  }

GenreView.propTypes ={
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }),
};