import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MOVIES_API_OPTIONS } from "../utils/constants";
import { addTopRatedMovies } from "../utils/moviesSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector(store => store.movies.topRatedMovies);
  useEffect(() => {
    !topRatedMovies && getTopRatedMovies();
  }, []);
  const getTopRatedMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      MOVIES_API_OPTIONS
    );

    const json = await data.json();
    console.log(json.results);
    dispatch(addTopRatedMovies(json.results));
  };
};

export default useTopRatedMovies;
