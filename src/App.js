import React, { useState } from "react";

import MoviesList from "./components/movie-list/MoviesList";
import UsersList from "./components/user-list/UsersList";
import Container from "react-bootstrap/Container";
import "./App.css";
import { Row, Col } from "react-bootstrap";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [wrong, setWrong] = useState(null);

  // SWAPI.DEV
  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.py4e.com/api/films/");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }
  // JSON API
  function fetchUsersHandler() {
    setIsFetching(true);
    setWrong(null);

    fetch("https://jsonplaceholder.typicode.com/users/")
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Something went wrong!!");
        }
        return response;
      })
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
      })
      .catch(function (wrong) {
        setWrong(wrong.message);
      });
    setIsFetching(false);
  }
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col>
            <section>
              <p>Click to Fetch Movie List</p>
              <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>
              {!isLoading && movies.length > 0 && (
                <MoviesList movies={movies} />
              )}
              {!isLoading && movies.length === 0 && <p>No Movie List found</p>}
              {!isLoading && error && <p>{error}</p>}
              {isLoading && <p>Loading your Movie details... </p>}
            </section>
          </Col>
          <Col>
            <section>
              <p>Click to Fetch Users</p>
              <button onClick={fetchUsersHandler}>Fetch Users</button>
            </section>
            <section>
              {!isFetching && users.length > 0 && <UsersList users={users} />}
              {!isFetching && users.length === 0 && <p>No Users Found</p>}
              {!isFetching && wrong && <p>{wrong}</p>}
              {isFetching && <p>Loading your User details..</p>}
            </section>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default App;
