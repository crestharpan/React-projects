import { useState, useEffect } from "react";

const KEY = "46ca515d";

//CUTOME HOOK
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchingData() {
        try {
          setIsLoading(true);
          setErrorMessage("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something wrong while fetching the movies");

          const data = await res.json();

          if (data.Response === "False") throw new Error(`${data.Error}`);

          setMovies(data.Search);
          setErrorMessage("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setErrorMessage(err.message);
          }
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

      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, errorMessage, isLoading };
}
