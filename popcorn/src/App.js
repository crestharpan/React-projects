import { useEffect, useState } from "react";
import StarRating from "./starRating";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const KEY = "46ca515d";

const average = (arr) => {
  return arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
};
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [query, setQuery] = useState("");
  const [selectedMovieID, setSelectedMovieId] = useState(null);

  //FUNCTION TO HANDLE THE MOVIE THAT IS SELECTED
  function handleSelect(id) {
    setSelectedMovieId((selectedMovieID) =>
      id === selectedMovieID ? null : id
    );
  }
  function handleCloseMovie() {
    setSelectedMovieId(null);
  }

  function handleAddMovie(movie) {
    setWatched([...watched, movie]);
  }

  function removeMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      async function fetchingData() {
        try {
          setIsLoading(true);
          setErrorMessage("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );
          if (!res.ok)
            throw new Error("Something wrong while fetching the movies");

          const data = await res.json();

          if (data.Response === "False") throw new Error(`${data.Error}`);

          setMovies(data.Search);
        } catch (err) {
          setErrorMessage(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setErrorMessage("");
        return;
      }

      fetchingData();
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <SearchBox query={query} setQuery={setQuery} />
        <ResultNum movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !errorMessage && (
            <MovieList movies={movies} onSelectMovie={handleSelect} />
          )}
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </Box>
        <Box>
          {selectedMovieID ? (
            <MovieDetails
              movies={movies}
              selectedMovieID={selectedMovieID}
              onCloseMovie={handleCloseMovie}
              handleAddMovie={handleAddMovie}
              watched={watched}
            />
          ) : (
            <>
              <MovieWatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} handleRemove={removeMovie} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return (
    <div className="loader">
      <p>Loading...</p>
    </div>
  );
}
function ErrorMessage({ message }) {
  return (
    <div className="error">
      <p>{message}</p>
    </div>
  );
}

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function SearchBox({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function ResultNum({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} onSelectMovie={onSelectMovie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDetails({
  selectedMovieID,
  onCloseMovie,
  handleAddMovie,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [moveDetailsLoading, setMovieDetailsLoading] = useState(false);
  const [userRating, setUserRating] = useState();

  const watchedMovieId = watched
    .map((movie) => movie.imdbID)
    .includes(selectedMovieID);

  const watchedMovieUserRating = watched.find(
    (movie) => movie.imdbID === selectedMovieID
  )?.userRating;

  function handleAddWatchedMovie() {
    const newMovie = {
      imdbID: selectedMovieID,
      poster: movie.Poster,
      title: movie.Title,
      year: movie.Year,
      userRating,
      rating: Number(movie.imdbRating),
      runtime: Number(movie.Runtime.split(" ")[0]),
    };

    handleAddMovie(newMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        setMovieDetailsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovieID}`
        );

        const data = await res.json();
        setMovie(data);
        setMovieDetailsLoading(false);
      }
      getMovieDetails();
    },
    [selectedMovieID]
  );

  useEffect(
    function () {
      if (!movie.Title) return;
      document.title = `Movie | ${movie.Title}`;
      return function () {
        document.title = "usePopcorn";
      };
    },

    [movie.Title]
  );

  return (
    <div className="details">
      {moveDetailsLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <img src={movie.Poster} alt={movie.Title} />
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐</span>
                {movie.imdbRating} Average Rating
              </p>
            </div>
          </header>
          <section>
            {!watchedMovieId ? (
              <>
                <div className="rating">
                  <StarRating
                    size={27}
                    maxRating={10}
                    onSetRating={setUserRating}
                  />
                </div>
                {userRating > 0 && (
                  <button className="btn-add" onClick={handleAddWatchedMovie}>
                    + Add
                  </button>
                )}
              </>
            ) : (
              <p>You rated this movie with: ⭐ {watchedMovieUserRating}</p>
            )}
            <em>{movie.Plot}</em>
            <p>Starring: {movie.Actors}</p>
            <p>Directed By: {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function MovieWatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.rating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ watched, handleRemove }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          handleRemove={handleRemove}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, handleRemove }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.rating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => handleRemove(movie.imdbID)}
        >
          x
        </button>
      </div>
    </li>
  );
}
