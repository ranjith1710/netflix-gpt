import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MOVIES_API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector(store => store.movies.popularMovies);

  useEffect(() => {
    !popularMovies && getPopularMovies();
  }, []);
  const getPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      MOVIES_API_OPTIONS
    );

    const json = await data.json();
    console.log(json.results);
    dispatch(addPopularMovies(json.results));
  };
};

export default usePopularMovies;
