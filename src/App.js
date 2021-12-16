import React, { useState } from "react";

import MoviesList from "./components/movie-list/MoviesList";
import UsersList from "./components/user-list/UsersList";
import Container from "react-bootstrap/Container";
import "./App.css";
import { Row, Col } from "react-bootstrap";

function App() {
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);

  function fetchMoviesHandler() {
    fetch("https://swapi.py4e.com/api/films/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(transformedMovies);
      });
  }

  function fetchUsersHandler() {
    fetch("https://jsonplaceholder.typicode.com/users/")
      .then((response) => response.json())
      .then((data) => {
        const transformedUsers = data.map((userData) => {
          return {
            id: userData.id,
            name: userData.name,
            username: userData.username,
            email: userData.email,
          };
        });
        setUsers(transformedUsers);
      });
  }
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col>
            <section>
              <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>
              <MoviesList movies={movies} />
            </section>
          </Col>
          <Col>
            <section>
              <button onClick={fetchUsersHandler}>Fetch Users</button>
            </section>
            <section>
              <UsersList users={users} />
            </section>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default App;
