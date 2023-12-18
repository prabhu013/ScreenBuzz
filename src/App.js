import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

import Home from './pages/home/home';
import Header from './components/header/Header';
import MovieList from './components/movieList/movieList';
import Movie from './pages/movieDetail/movie';
import SearchList from './pages/search/search';

function App() {
  return (
    <div className="App">
     <Router>
      <Header />
        <Routes>
           <Route index element={<Home />}></Route>
           <Route path="movie/:id" element={<Movie />}></Route>
           <Route path="movies/:type" element={<MovieList />}></Route>
           <Route path="movies/search/:x" element={<SearchList />}></Route>
           <Route path="*" element={<h1>Sorry...No result found</h1>}></Route>
        </Routes>
     </Router>
    </div>
  );
}

export default App;
