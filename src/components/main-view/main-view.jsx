import axios from "axios";
import Col from "react-bootstrap/Col";
import React from "react";
import Row from "react-bootstrap/Row";


import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
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

    // if (!register) return <RegistrationView onRegister={(register) => this.onRegister(register)}/>;

    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;


    return (
      <div className="main-view">
        {selectedMovie
          ? ( 
            <Row className="justify-content-md-center">
              <Col md={8}>
                <MovieView movie={selectedMovie} onClick={() => this.onBackClick()}/> 
              </Col>
            </Row> 
            )
            : (
              <Row className="justify-content-md-center">
                {movies.map(movie => (
                  <Col md={3}>
                  <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
                  </Col>
                ))}
              </Row>
            )
          }
        </div>
      );
   }
 }
