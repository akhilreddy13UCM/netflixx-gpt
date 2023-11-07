import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";

const VideoBackground = ({movieId}) => {
    const trailerVideo=useSelector((store)=>store.movies?.trailerVideo); 
    const dispatch = useDispatch();
    //fetching the trailer video and updating the store with trailer video data
    const getMovieVideos= async()=>{
        const data=await fetch(
            "https://api.themoviedb.org/3/movie/"+ movieId + "/videos?language=en-US",API_OPTIONS
        );
        const json=await data.json();
        //console.log(json.);
        const filterData=json.results.filter(video=>video.type==="Trailer");
        const trailer=filterData.length? filterData[0]:json.results[0];
        //console.log(trailer);
        dispatch(addTrailerVideo(trailer));
    };
    useEffect(()=>{
        getMovieVideos();
    },[]);
  return (
    <div className="w-screen">
        <iframe
        className="w-screen aspect-video"
        src={"https://www.youtube.com/embed/"+trailerVideo?.key+"?&autoplay=1&mute=1"}
        title="YouTube video player"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
    </div>
  )
}

export default VideoBackground;