import React, {  useState } from "react";
import "./Header.css"
import { Link } from "react-router-dom";


const Header = () => {

  const [search,setSearch]=useState("");
  const onTextChange = (event) => {
    setSearch(event.target.value);
    
  }


  const handleKey = (event) => {
    if(event.key === 'Enter')
    if(search !== "")
    window.location.href = `/movies/search/${search}`;
  }

  const handleSearch =() => {

    if(search !== "")
    window.location.href = `/movies/search/${search}`;
  }

  const handleclickpopular = () => {
    window.location.href ="/movies/popular";
    
  }

  const handleclickhome = () => {
   
    window.location.href ="/";
  }

  const handleclicktoprated = () => {
    window.location.href ="/movies/top_rated";
  }

  const handleclickupcoming = () => {
    window.location.href ="/movies/upcoming";
    
  }

  
    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/" onClick={handleclickhome}><img className="header__icon" src="/logo1.png" /></Link>
                <Link to="/movies/popular"  onClick={handleclickpopular} style={{textDecoration: "none"}}><span>Popular</span></Link>
                <Link to="/movies/top_rated" onClick={handleclicktoprated} style={{textDecoration: "none"}}><span>Top Rated</span></Link>
                <Link to="/movies/upcoming" onClick={handleclickupcoming} style={{textDecoration: "none"}}><span>Upcoming</span></Link>
            </div>
            <div className="headerRight">
            <img className="searchIcon" src="/search.svg" />
            <input className="searchInput" type="search" 
             
            value={search} 
            onChange={onTextChange}
            onKeyDown={handleKey}
            />
            <button className="searchButton" onClick={handleSearch}>Search</button>
            
            </div>
            
        </div>
        
    );
}
 
export default Header;