import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';
import lang from '../utils/languageConstants';
import openai from '../utils/openai';

const GptSearchBar = () => {
    const langKey=useSelector((store)=>store.config.lang);
    const searchText = useRef(null);
    const dispatch=useDispatch();
    
    const searchMovieTMDB= async(movie)=>{
      const data= await fetch('https://api.themoviedb.org/3/search/movie?query='
      +movie+
      '&include_adult=false&language=en-US&page=1',
      API_OPTIONS
      );
      const json=await data.json();
      return json.results; 
     }
    
    
      const handleGptSearchClick=async()=>{
     // console.log(searchText.current.value);
      //Make API Call to get movie results
      const gptQuery="Act as movie recommendation system and suggest some movies for the query:"
      + searchText.current.value  + "only give me 5 movie names, comma seperated like the example result given ahead.Example result:abc,jbw,aekuc,aldiak,sec ajc";

      const gptResults=await openai.chat.completions.create({
        messages: [{ role: 'user', content:gptQuery}],
        model: 'gpt-3.5-turbo',
      }); 
      if(!gptResults.choices)
      {
        //Erorr handling;
      }
     // console.log(gptResults.choices?.[0]?.message?.content);
      const gptMovies=gptResults.choices?.[0]?.message?.content.split(",") ;
      //for each movie search tmdb api
       const promiseArray =gptMovies.map((movie)=>searchMovieTMDB(movie));
       const tmdbResults=await Promise.all(promiseArray);
       //console.log(tmdbResults);
       dispatch(addGptMovieResult({movieNames:gptMovies,movieResults:tmdbResults}));
    }
    
  return (
    <div className='pt-[10%] flex justify-center'>
        <form className='w-1/2 bg-black grid grid-cols-12' onSubmit={(e)=>e.preventDefault()}>
            <input ref={searchText} type="text" className="p-4 m-4 col-span-9" 
            placeholder={ lang[langKey].gptSearchPlaceholder}/>
            <button className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg'
            onClick={handleGptSearchClick}>
                {lang[langKey].search}</button>
        </form>
    </div>
  );
};

export default GptSearchBar;