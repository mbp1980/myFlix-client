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
    const { movie, handleBackButton } = this.props; //returnHome

    // next return wont run if this is true
    if (!movie) return null;

   
    return (
      <div className="movie-view">
        <Card>
          <Card.Img className="movie-poster" variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title className="label-title"> {movie.Title}</Card.Title>
              <Card.Text className="label-body"> {movie.Description}</Card.Text>
              <Card.Text className="label-body"><span>Director:</span>
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button className ="button" variant="link">{movie.Director.Name}</Button>
                </Link>
              </Card.Text>
              <Card.Text className="label-body">Genre: 
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button className="button" variant="link">{movie.Genre.Name}</Button>
                </Link>
              </Card.Text>
              <Button className="return-button"
                  variant="primary"
                  size="sm"> Add to Favorites
              </Button>
              <br></br>
              <Link to={`/`}>
              <Button className="return-button" 
                      variant= "primary" 
                      size="sm">Return to Movie List
                </Button>
              </Link>
          </Card.Body>          
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
    director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
    }),
  }).isRequired,
  onClick: PropTypes.func.isRequired
};