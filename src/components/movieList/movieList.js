import React, { useEffect, useState } from "react";
import "./movieList.css"
import { useParams } from "react-router-dom";
import Cards from "../card/card"
const MovieList = () => {
    const [movieList, setMovieList]=useState([])
    const {type} = useParams()

    const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [time, setout]= useState(false);

   

    useEffect(() => {
        getData();
      }, [currentPage]); 
    

    const getData = async () => {
      /*  fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=8d246ff45b6d27c4aff172154aa43166&language=en-US&page=${currentPage}&region=IN`)
        .then(res => res.json())
        .then(data => setMovieList(data.results))
        .then(data => setTotalPages(data.total_pages))
        */
        const response = await fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=8d246ff45b6d27c4aff172154aa43166&language=en-US&page=${currentPage}&region=US`);
      const jsonData = await response.json();

      setMovieList(jsonData.results);
      setTotalPages(jsonData.total_pages);
      setout(true);
    }

    return (
        <div className="movie__list">
            <h2 className="movie__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className="list__cards">
                {
                    movieList.map(movie => (
                        <Cards movie ={movie}/>
                    ))
                }
            </div>
            {
              time && 
            <div className="page-button">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
        >
        ← Previous Page
      </button>
      <span className="page-number">{currentPage}</span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
      >
        Next Page →
      </button>
      </div>
      }
        </div>
        )
}
 
export default MovieList;