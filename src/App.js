import React, { useState, useEffect, useCallback } from "react";

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
  const fetchMoviesHandler = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

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
  let content = <p>No Movie List found</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p> Loading your Movie details... </p>;
  }

  let userbody = <p>No Users Found</p>;
  if (users.length > 0) {
    userbody = <UsersList users={users} />;
  }
  if (wrong) {
    userbody = <p>{wrong}</p>;
  }
  if (isFetching) {
    userbody = <p> Loading your User details..</p>;
  }

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col>
            <section>
              <p>Click to Refresh Movie List</p>
              <button onClick={fetchMoviesHandler}>Refresh</button>
            </section>
            <section>{content}</section>
          </Col>
          <Col>
            <section>
              <p>Click to Fetch User List</p>
              <button onClick={fetchUsersHandler}>Fetch Users</button>
            </section>
            <section>{userbody}</section>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default App;
