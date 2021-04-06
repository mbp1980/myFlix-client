import {Card, Button} from "react-bootstrap";
import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";



import "./movie-view.scss";

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;

   
    return (
      <div className='movie-view'>
        <Card>
          <Card.Img className='movie-poster' variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title className='label-title'> {movie.Title}</Card.Title>
              <Card.Text className='label-body'> {movie.Description}</Card.Text>
              <Card.Text className='label-body'>Director:
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant="link">{movie.Director.Name}</Button>
              </Link>
            </Card.Text>
              <Card.Text className="label-body">Genre: {movie.Genre.Name}</Card.Text>
          </Card.Body>
          <Button
            className="return-button"
            variant="primary"
            size="sm"
            onClick={() => this.addFavorite(movie)}
          >
            Add to Favorites
          </Button>
          <Button
            className="return-button"
            variant="primary"
            onClick={() => handleBackButton()}
          >
            Return to Movie List
          </Button>
          {/* <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link> */}

          {/* <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link> */}
        </Card>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
    }),
  }).isRequired,
  onClick: PropTypes.func.isRequired
};