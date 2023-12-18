import React, {useEffect, useState} from "react"
import "./movie.css"
import { useParams } from "react-router-dom"

const Movie = () => {
    const [currentMovieDetail, setMovie] = useState()
    const { id } = useParams()
    const [trailer, setTrailer] = useState([]);
    const [showModal, setShowModal] = useState(false);
    

  const openModal = () => {
    setShowModal(true);
    setTrailer(currentMovieDetail.videos.results.find(vid => vid.type === "Trailer"))
  };

  const closeModal = () => {
    setShowModal(false);
  };

    useEffect(() => {
        getData()
        
        window.scrollTo(0,0)
        
    }, [])

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=8d246ff45b6d27c4aff172154aa43166&language=en-US&append_to_response=videos`)
        .then(res => res.json())
        .then(data => setMovie(data))

        
    }

    return (
        <div className="movie">
            <div className="movie__intro">
                {currentMovieDetail && currentMovieDetail.backdrop_path ? 
                (<img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail.backdrop_path}`} />)
                :
                (<img className="movie__backdrop" src="/noback.jpg" />)}
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        {currentMovieDetail && currentMovieDetail.poster_path ? (<img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail.poster_path}`} /> ) : 
                            (<img className="movie__poster" src="/noposter.png" />)
                        }
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovieDetail &&  currentMovieDetail.original_title ? currentMovieDetail.original_title : "No Title"}</div>
                        <div className="movie__tagline">{currentMovieDetail && currentMovieDetail.tagline ? currentMovieDetail.tagline : "No Tagline"}</div>
                        <div className="movie__rating">
                            {currentMovieDetail ? currentMovieDetail.vote_average: ""} <i class="fas fa-star" />
                            <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                        </div>  
                        <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                        <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className="movie__genres">
                            {
                               currentMovieDetail && currentMovieDetail.genres.length !== 0
                                ? 
                                (currentMovieDetail.genres.map(genre => (
                                    <><span className="movie__genre" id={genre.id}>{genre.name}</span></>
                                )) )
                                : 
                                <><span className="movie__genre" >Drama</span></>
                            }
                        </div>
                    </div>
                    <div>
                    {currentMovieDetail && currentMovieDetail.videos.results.length === 0 ? (<div className="notrailer">No Trailer Available</div>) : 
                    (<div>
         {showModal && (
         <div className="modal">
          <div className="modal-content">
            <span className="close">
              <button className="closebutton" onClick={closeModal}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 10.586l4.95-4.95a1 1 0 0 1 1.415 1.414L13.415 12l4.95 4.95a1 1 0 0 1-1.414 1.414L12 13.415l-4.95 4.95a1 1 0 0 1-1.415-1.414L10.585 12 5.636 7.05a1 1 0 0 1 1.414-1.415L12 10.586z" />
              </svg>
              </button>
            </span>
            <iframe
              title="YouTube Video"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              allowFullScreen
            ></iframe>
          </div>
         </div>
         )}

         <button className="container" onClick={openModal}>Open Trailer</button>
          </div>
          )}
         </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>
                    
                </div>
            </div>
            <div className="movie__links">
                <div className="movie__heading">Useful Links</div>
                {
                    currentMovieDetail && currentMovieDetail.homepage && <a href={currentMovieDetail.homepage} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__homeButton movie__Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
                {
                    currentMovieDetail && currentMovieDetail.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
            </div>
            <div className="movie__heading">Production companies</div>
            <div className="movie__production">
                {
                    currentMovieDetail && currentMovieDetail.production_companies && currentMovieDetail.production_companies.map(company => (
                        <>
                            {
                                company.logo_path 
                                && 
                                <span className="productionCompanyImage">
                                    <img className="movie__productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                                    <span>{company.name}</span>
                                </span>
                            }
                        </>
                    ))
                }
            </div>

        </div>
            
    )
}

export default Movie