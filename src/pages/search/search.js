import React, { useEffect, useState } from "react";
import "./search.css"
import { useParams } from "react-router-dom";
import Cards from "../../components/card/card";
const SearchList = () => {
    const [searchMovie, setSearchMovies]=useState([])
    const {x} = useParams()
    const [isLoading,setIsLoading] =useState(true);

    
   
    useEffect(() => {
        getData()
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
        
    },[x])

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=8d246ff45b6d27c4aff172154aa43166&query=${x}`)
        .then(res => res.json())
        .then(data => setSearchMovies(data.results)) 
    }

    return <>
    {
        isLoading 
        ?
        <h2 className="load_title">Please Wait...</h2>
        :
        <div className="search__list">
           
            {searchMovie.length !== 0 ? (<h2 className="search__title">Search results of '{x}'</h2>) : (<h2 className="search__title">Sorry, no result found for '{x}'</h2>)}
            <div className="search__cards">
                {
                   searchMovie.map(movie => (
                        <Cards movie ={movie}/>
                    ))
                }
            </div>

        </div>
        
    }
    </>
}
 
export default SearchList;