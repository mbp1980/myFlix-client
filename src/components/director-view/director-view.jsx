import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import './director-view.scss';

export class DirectorView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies, director } = this.props;

    if (!director) return null;
    // if (!movies) return null;

    
    return (
      <div className="director-view">
        <Card>
          <Card.Title>{movies.Director.name}</Card.Title>
          <Card.Body>
            <Card.Text>{movies.Director.Bio}</Card.Text>
            <Card.Text>Born: {movies.Director.Birth}</Card.Text>                  
          </Card.Body>
        </Card>
      </div>
    );
  }
}


DirectorView.propTypes = {
  movie: PropTypes.shape({
    Director: {
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    },
  }),
};