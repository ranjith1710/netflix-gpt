import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import lang from "../utils/languageConstants";
import { useRef } from "react";
import openai from "../utils/openai";
import { DEFAULT_MOVIES, MOVIES_API_OPTIONS } from "../utils/constants";
import { addGptMovieResults } from "../utils/gptSlice";

const GptSearchBar = () => {
  const language = useSelector(store => store.config.lang);
  const dispatch = useDispatch();
  const searchText = useRef(null);

  const searchMovie = async movie => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      MOVIES_API_OPTIONS
    );

    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Mersal,Bigil,Ghilli,Sachin,Nanban";
    try {
      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo"
      });

      console.log(gptResults.choices);

      const gptMovies = gptResults.choices?.[0]?.message?.content?.split(",");

      const promiseArray = gptMovies.map(movie => searchMovie(movie));

      const tmbdMovies = await Promise.all(promiseArray);

      dispatch(
        addGptMovieResults({
          movieNames: gptMovies,
          movieResults: tmbdMovies,
          isGptSearchSuccess: true
        })
      );
    } catch (error) {
      console.log("Error in api request to GPT");
      console.log(error);

      const promiseArray = DEFAULT_MOVIES.map(movie => searchMovie(movie));

      const tmbdMovies = await Promise.all(promiseArray);

      dispatch(
        addGptMovieResults({
          movieNames: DEFAULT_MOVIES,
          movieResults: tmbdMovies,
          isGptSearchSuccess: false
        })
      );
    }
  };
  return (
    <div className="flex justify-center  pt-[40%] md:p-[10%]">
      <form
        className="w-screen md:w-1/2 grid grid-cols-12  bg-black p-2 mx-2"
        onSubmit={e => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="col-span-9 p-2"
          type="text"
          placeholder={lang[language].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 bg-red-700 text-white px-4 py-2 ml-2 rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[language].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
