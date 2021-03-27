import axios from "axios";
import React from "react";
import Row from "react-bootstrap/Row";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovies: null,
      user: null
    };
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    axios.get("https://bestflixdb.herokuapp.com/movies")
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegister(register) {
    this.setState({
      register,
    });
  }

  onBackClick() {
    this.setState({
      selectedMovie: null
    });
  }


  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies, selectedMovie, user, register } = this.state;

    // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView
    if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>; 

    if (!register) return <RegisterView onRegister={(register) => this.onRegister(register)}/>;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;


    return (
      <div className="main-view">
       {selectedMovie
          ? ( <Row>
                <MovieView movie={selectedMovie} onClick={() => this.onBackClick()}/> 
              </Row> 
            )
            : movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
            ))
        }
      </div>
     );
   }
 }
