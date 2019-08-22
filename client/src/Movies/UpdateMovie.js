import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateMovie = props => {
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: ["", "", ""]
  });

  useEffect(() => {
    const id = props.match.params.id;
    const movieInArr = props.movies.find(movie => `${movie.id}` === id);
    if (movieInArr) setMovie(movieInArr);
  }, [props.movies, props.match.params.id]);

  const handleChange = e => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("new movie: ", movie);
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log("res: ", res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <h1>Test</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={movie.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Director:
          <input
            type="text"
            name="director"
            value={movie.director}
            onChange={handleChange}
          />
        </label>
        <label>
          Metascore:
          <input
            type="number"
            name="metascore"
            value={movie.metascore}
            onChange={handleChange}
          />
        </label>
        <label>
          Actors:
          <input
            type="text"
            name="stars"
            value={movie.stars[0]}
            onChange={handleChange}
          />
          <input
            type="text"
            name="stars"
            value={movie.stars[1]}
            onChange={handleChange}
          />
          <input
            type="text"
            name="stars"
            value={movie.stars[2]}
            onChange={handleChange}
          />
        </label>
        <button>Submit</button>
      </form>
    </>
  );
};

export default UpdateMovie;
