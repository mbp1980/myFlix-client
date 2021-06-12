import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';



import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { ProfileView } from "../profile-view/profile-view";
import { ProfileUpdate } from "../profile-update/profile-update";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";

import "./main-view.scss";

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      selectedMovies: null,
      user: null,
      token: null
    };
  }

    
getMovies(token) {
  return axios.get("https://bestflixdb.herokuapp.com/movies", {
    headers: { Authorization: `Bearer ${token}`}
    });
}

addToFavoriteMovies(movieID, username, token) {
  return axios.post(
   `http://bestFlixdb.herokuapp.com/users/${username}/Movies/${movieID} `, 
    {},  
   { headers: {"Authorization": `Bearer ${token}`} }
   )
   .then((response) => {
     const user = response.data;
     this.setState({ user: user});
     alert("Movie added to favorites.");                
   })
   .catch(e => {
     console.error(e);
     alert("something went wrong...");
   })
}

removeFromFavoriteMovies(movieID, username, token) {
  return axios.delete(
   `http://bestFlixdb.herokuapp.com/users/${username}/Movies/${movieID} `,     
      { headers: {"Authorization": `Bearer ${token}`} }
      )
      .then((response) => {
        const user = response.data;
        this.setState({ user: user});
        alert("Movie removed from favorites.");                
      })
      .catch(e => {
        console.error(e);
        alert("something went wrong...");
      })
}

componentDidMount() {
  let token = localStorage.getItem("token");
  if (token !== null) {
    this.setState( {
      user: { Username: localStorage.getItem("user") },
      token: token
    });
    axios.get(
      `https://bestflixdb.herokuapp.com/users/${localStorage.getItem("user")}`,
      {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(response => {
        const user =response.data;
      
        return this.getMovies(token)
          .then(response => {
            const movies = response.data;

            this.setState( {
              user: user,
              movies: movies
            })
      });
  })
  .catch (e => {
    alert(`Something went bad...`);
  })
    
  }
}

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token)
      .then(response => {
        const movies = response.data;
        this.setState({
          user: authData.user,
          movies: movies
        });
      })
      .catch (e => { 
        console.error(e)
        alert(`Something went bad...`); 
      });
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null
    });
    console.log("logout successful");
    alert("You have been successfully logged out");
  }

  onRegister(register) {
    this.setState({
      register,
    });
  }

  

  

  render() {
    console.log("Render", this.state, this.props);
    
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies,  user, token } = this.state;

    return (
      <Router>
        <div className="main-view">
          <Link to= {`/profile`}>
            <Button  
              className="button" 
              variant="link"
              >Profile
            </Button>
          </Link>
          <Link to= {`/`}>
            <Button  
              className="button" 
              variant="link"
              >Home
            </Button>
          </Link>
          <Link to= {`/`}>
            <Button variant="link" 
              onClick={
                user => 
                this.onLoggedOut()}
              >Logout
              </Button>
          </Link>
        <Route exact path="/" render={() => {
          if (!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>
          if (movies.length === 0) return <div className="main-view" />;
          return movies.map(m => (
            <Col key={m._id}>
              <MovieCard movie={m} />
            </Col>
          ))
        }} />
        <Route path="/register" render={() => {
          if (user) return <Redirect to="/" />
          return <Col>
            <RegistrationView />
          </Col>
        }} />
        <Route path="/profile" render={() => 
        <ProfileView 
          user={user} 
          favoriteMovies={
            user.FavoriteMovies.map(
              movieID => movies.find(
                movie => movie._id === movieID))}
                onRemoveFromFavorite={(movieID) => 
                  this.removeFromFavoriteMovies(movieID, user.Username, token)}
          />   
        }/>
        <Route
              path="/update/:userId"
              render={() => {
                return <ProfileUpdate />;
              }}
            />          
        <Route path="/movies/:movieId" render={
          ({ match }) => {
            console.log("Render movie")
            if (!user) return <Col>
            <LoginView onLoggedIn={
              user => this.onLoggedIn(user)
              } />
          </Col>
          if (movies.length === 0) return <div className="main-view" />;              
            return <MovieView 
            movie={
              movies.find( 
                m => m._id === match.params.movieId
                )}
            onAddToFavorite= {() => 
              this.addToFavoriteMovies(
                match.params.movieId, 
                user.Username, token
                )
              
            } 
          />
        }
      }/>
        <Route path="/genres/:name" render={({ history, match }) => {
          console.log(history.location);
          if (!user) return <Col>
            <LoginView onLoggedIn={
              user => this.onLoggedIn(user)
              } />
          </Col>
          if (movies.length === 0) return <div className="main-view" />;
          return <GenreView onGoBack={() => 
            history.goBack()} genre=
            {movies.find(
            m => m.Genre.Name === match.params.name).Genre
          }
          />}
        }/>
        <Route path="/directors/:name" render={({ history, match }) => {
          console.log(history.location);
          if (!user) return <Col>
            <LoginView onLoggedIn={
              user => this.onLoggedIn(user)
              }
            />
          </Col>
          if (movies.length === 0) return <div className="main-view" />;
          return <DirectorView onGoBack={() => 
            history.goBack()} director=
            {movies.find(
            m => m.Director.Name === match.params.name).Director
          }
          />}
        }/>
      </div>
      </Router>
    );
  }
}
