import axios from "axios";
import { Form, Button, Card } from "react-bootstrap";
import React, { useState } from "react";
import PropTypes, { checkPropTypes } from "prop-types";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { MovieCard } from '../movie-card/movie-card';

export class ProfileView extends React.Component {
    constructor(props) {
      super(props);
      
    }
    render() {
      console.log("Render", this.props);
      const { user, favoriteMovies, onRemoveFromFavorite } = this.props;
  
      if (!user) return null;
        
      
      return (
        <div className="profile-view">
          <Card>
            <Card.Title>Profile for {user.Username}</Card.Title>
            <Card.Body>
            <Card.Text><strong>Username: </strong>{user.Username}</Card.Text> 
            <Card.Text><strong>Email: </strong>{user.Email}</Card.Text>
            {/* <Card.Text><strong>Password: </strong>{user.Password}</Card.Text> */}
            <Card.Text><strong>Birthdate: </strong>{user.Birthdate}</Card.Text>
            <Card.Text><strong>Favorite Movies: </strong>
            </Card.Text>
              <ul>
                {
                  favoriteMovies.map(
                    movie => 
                    <li key={movie._id}>{movie.Title}
                    <button onClick={() => 
                      onRemoveFromFavorite(movie._id)}>Remove</button> 
                    </li>
                    )
                }
                
              </ul>
              
            
            

           </Card.Body>
          </Card>
        </div>
      );
    }


}
ProfileView.propTypes = {
  movies: PropTypes.array,
  user: PropTypes.string.isRequired,
  favoriteMovies: PropTypes.array,
};
