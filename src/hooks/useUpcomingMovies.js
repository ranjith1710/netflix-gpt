import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MOVIES_API_OPTIONS } from "../utils/constants";
import { addUpcomingMovies } from "../utils/moviesSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector(store => store.movies.upcomingMovies);
  useEffect(() => {
    !upcomingMovies && getUpcomingMovies();
  }, []);
  const getUpcomingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      MOVIES_API_OPTIONS
    );

    const json = await data.json();
    console.log(json.results);
    dispatch(addUpcomingMovies(json.results));
  };
};

export default useUpcomingMovies;
