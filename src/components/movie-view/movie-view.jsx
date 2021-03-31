import {Card, Button} from "react-bootstrap";
import React from "react";
import PropTypes from "prop-types";



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
          <Card.Title className='label-title'>{movie.Title}</Card.Title>
            <Card.Body>
              <Card.Text className='label-body'>{movie.Description}</Card.Text>
              <Card.Text className='label-body'>Director: {movie.Director.Name}</Card.Text>
              <Card.Text className='label-body'>Genre: {movie.Genre.Name}</Card.Text>
            </Card.Body>
            <Button className='return-button' variant='primary' onClick={() => onClick(movie)}>Return to Movie List</Button>
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