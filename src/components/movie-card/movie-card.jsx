import { Card, Button } from "react-bootstrap";
import React from "react";
import PropTypes from "prop-types";


import { Link } from "react-router-dom";



export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;


    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

//     return (
//       <Card>
//         <Card.Img variant="top" src="holder.js/100px180" />
//         <Card.Body>
//           <Card.Title>{movie.Title}</Card.Title>
//           <Card.Text>{movie.Description}</Card.Text>
//           <Button onClick={() => onClick(movie)} variant="link">Open</Button>
//         </Card.Body>
//       </Card>
//     );
//   }
// }

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};