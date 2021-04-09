import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";



import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { ProfileView } from "../profile-view/profile-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";

import "./main-view.scss";

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      selectedMovies: null,
      user: null
    };
  }

    
getMovies(token) {
  axios.get("https://bestflixdb.herokuapp.com/movies", {
    headers: { Authorization: `Bearer ${token}`}
  })
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

componentDidMount() {
  let accessToken = localStorage.getItem("token");
  if (accessToken !== null) {
    this.setState({
      user: localStorage.getItem("user")
    });
    this.getMovies(accessToken);
  }
}

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null
    });
    console.log("logout successful");
    alert("You have been successfully logged out");
    window.open("/", "_self");
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
    const { movies, onBackClick, user, register, director, genre } = this.state;

    // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView
    // if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>; 

    // if (!register) return <RegistrationView onRegister={(register) => this.onRegister(register)}/>;

    // Before the movies have been loaded
    // if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    if (!movies) return <div className="main-view"/>; 

    return (
      <Router>
        <div className="main-view">
          <Link to= {`/profile`}>
            <Button  className="button" variant="link">Profile</Button>
          </Link>
          <Link to= {`/`}>
            <Button  className="button" variant="link">Home</Button>
          </Link>
          <Link to= {`/`}>
            <Button  className="button" variant="link">Logout</Button>
          </Link>
          <Route exact path="/" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            return movies.map(m => <MovieCard key={m._id} movie={m}/>)
            }
          }/>
          <Route path="/register" render={() => <RegistrationView/>
          }/>
          <Route path="/profile" render={() => <ProfileView/>   
          }/>
          {/* <Route exact path="/" render={() => movies.map(m => <MovieCard key={m._id} movie={m}/>)}/> */}
          <Route path="/movies/:movieId" render={
            ({match}) => <MovieView movie={movies.find(
              m => m._id === match.params.movieId)}/>
          }/>
          <Route path="/genre/:name" render={({ match }) => {
            if (!movies) return <div className="main-view"/>;
            return <GenreView genre={movies.find(
              m => m.Genre.Name === match.params.name).Genre}/>}
          }/>
          <Route path="/director/:name" render={({ match }) => {
            if (!movies) return <div className="main-view"/>;
            return <DirectorView director={movies.find(
              m => m.Director.Name === match.params.name).Director}/>}
          }/>
        </div>
      </Router>
    );
  }
}
    
//     return (
//       <div className="main-view">
//         {selectedMovie
//           ? ( 
//             <Row className="justify-content-md-center">
//               <Col md={8}>
//                 <MovieView movie={selectedMovie} onClick={() => this.onBackClick()}/> 
//               </Col>
//             </Row> 
//             )
//             : (
//               <Row className="justify-content-md-center">
//                 {movies.map(movie => (
//                   <Col md={3}>
//                   <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
//                   </Col>
//                 ))}
//               </Row>
//             )
//           }
//         </div>
//       );
//    }
//  }
