import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieNames, movieResults, isGptSearchSuccess } = useSelector(
    store => store.gpt
  );

  if (!movieNames) return null;

  return (
    <div className="px-4 mt-5 md:mt-0">
      <div className="bg-black opacity-90 p-4">
        {!isGptSearchSuccess && (
          <p className="text-white text-center">
            Sorry! We couldn't get the movies which you have requested. Please
            find below the top movies
          </p>
        )}
        {movieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
