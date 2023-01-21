import movieTrailer from "movie-trailer";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "../../axios"; /* Can import instace as axois no problem */
import "./Row.css";

function Row({ title, fetchURL, isRowLarge }) {
  /*Destructuring the props that we get from App.js */

  const [movies, setmovies] = useState([]);
  {
    /* Empty array in the start*/
  }

  const [trailerURL, setTrailerURL] = useState("");

  const base_URL = "https://image.tmdb.org/t/p/w500";

  {
    /* A code snippet that will run on specific conditions and variables.(useEffect)
The useEffect Hook allows you to perform side effects in your components.
Some examples of side effects are: fetching data, directly updating the DOM, and timers.
*/
  }

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  useEffect(() => {
    //if [] then run once, row loads and then dont run again.
    //fetching the data might take time that is why we have used the async function.
    //await is used inside the async function.
    async function fetchData() {
      const results = await axios.get(fetchURL);
      setmovies(results.data.results);
      return results;
    }
    fetchData(); //syntax of useEffects that is async function is there then call it immediately.
  }, [fetchURL]);

  function handleClick(movie) {
    if (trailerURL) {
      setTrailerURL(""); // if some trailer is already playing then set the tariler url to empty;
    } else {
      movieTrailer(`${movie?.name}`) //sometimes the name is undefined;
        .then((url) => {
          //https://www.youtube.com/watch?v=XtMThy8QKqU&t=9638s we only want v part
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerURL(urlParams.get("v"));
        })
        .catch((err) => console.log(err));
    }
  }
  // ******imp -> if you are using useEffects and your are passing extenal variable from outside the you have to spcify it in the [], bcox it is <dependency> i.e useEffect is dependent on it otherwise if the fetchURL changes then also you will get earlier output.

  return (
    <div className="row">
      {/*Title*/}
      <h2>{title}</h2>
      {/*posters*/}
      <div className="row__posters">
        {movies.map((movie) => {
          return (
            <img
              key={movie.id}
              onClick={() => {
                handleClick(movie);
              }}
              className={`row__poster ${isRowLarge && "row__posterLarge"}`}
              src={`${base_URL}${
                isRowLarge ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          );
        })}
      </div>
      {trailerURL && <YouTube videoId={trailerURL} opts={opts} />}{" "}
      {/*if there is trailerURL then only play the video */}
    </div>
  );
}

export default Row;
