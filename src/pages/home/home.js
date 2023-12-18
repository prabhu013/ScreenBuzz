import React, { useEffect, useRef, useState } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";

const Home = () => {

    const [ popularMovies, setPopularMovies] =useState([])
    const [timer, setout] =useState(false);
    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=8d246ff45b6d27c4aff172154aa43166&language=en-US&page=1&region=IN")
        .then(res => res.json())
        .then(data => setPopularMovies(data.results))
        setTimeout (() => {
            setout(true);
        },1500)
    }, [])

   

   
    return (
        <>
        {
            timer && 
            <div className="poster">
                <Carousel 
                showThumbs={false}
                autoPlay={true}
                transitionTime={3}
                infiniteLoop={true}
                showStatus={false}
               
                >
                    {
                        popularMovies.map(movie => (
                            <Link style={{textDecoration:"none",color:"white"}} to={`/movie/${movie.id}`} >
                            <div className="posterImages">
                                <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} />
                            </div>
                            <div className="posterImage__overlay">
                                <div className="posterImage__title">{movie ? movie.original_title: ""}</div>
                                <div className="posterImage__runtime">
                                    {movie ? movie.release_date : ""}
                                    <span className="posterImage__rating">
                                        {movie ? movie.vote_average :""}
                                        <i className="fas fa-star" />{" "}
                                    </span>
                                </div>
                                <div className="posterImage_description">{movie ? movie.overview : ""}</div>
                            </div>
                            </Link>
                        ))
                    }
                </Carousel>
                <MovieList />
            </div>
}
        </>
     );
}
 
export default Home;