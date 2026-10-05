import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { movies as movieData } from './datas/movies';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import GenreFilter from './components/GenreFilter';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';

// Get unique list of genres
const genres = [...new Set(movieData.map((movie) => movie.genre))];

// Initial movie list with favorite = false
const startMovies = movieData.map((movie) => ({ ...movie, favorite: false }));

function App() {
    // ===== STATE =====
    const [movies, setMovies] = useState(startMovies);
    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState('All');
    const [sort, setSort] = useState('none');
    const [selectedMovieId, setSelectedMovieId] = useState(null);

    // ===== FILTER & SORT =====
    // 1. Filter by genre
    let shownMovies = movies.filter((movie) => genre === 'All' || movie.genre === genre);

    // 2. Filter by search query
    if (search.trim()) {
        shownMovies = shownMovies.filter((movie) =>
            movie.title.toLowerCase().includes(search.trim().toLowerCase())
        );
    }

    // 3. Sort by rating
    if (sort === 'desc') {
        shownMovies = [...shownMovies].sort((a, b) => b.rating - a.rating);
    } else if (sort === 'asc') {
        shownMovies = [...shownMovies].sort((a, b) => a.rating - b.rating);
    }

    // ===== COUNTERS =====
    const favoriteCount = movies.filter((movie) => movie.favorite).length;

    // ===== EVENT HANDLERS =====
    function toggleFavorite(id) {
        setMovies((prevMovies) =>
            prevMovies.map((movie) =>
                movie.id === id ? { ...movie, favorite: !movie.favorite } : movie
            )
        );
    }

    function handleViewDetail(movie) {
        setSelectedMovieId((prevId) => (prevId === movie.id ? null : movie.id));
    }

    function resetFilters() {
        setSearch('');
        setGenre('All');
        setSort('none');
    }

    const hasFilter = search !== '' || genre !== 'All' || sort !== 'none';
    const selectedMovie = movies.find((m) => m.id === selectedMovieId);

    return (
        <Container className="movie-container py-4">
            <Header />

            <div className="d-flex flex-wrap align-items-start gap-4">
                {/* Cột danh sách phim: cố định kích thước, không bị co lại khi bật detail */}
                <div style={{ flex: '1 1 680px', maxWidth: '720px' }}>
                    <SearchBar search={search} setSearch={setSearch} />

                    <Row className="mb-3 g-2">
                        <Col xs={12} sm={6}>
                            <GenreFilter genres={genres} genre={genre} setGenre={setGenre} />
                        </Col>
                        <Col xs={12} sm={6}>
                            <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
                                <option value="none">Sort by rating...</option>
                                <option value="desc">Rating: High to Low</option>
                                <option value="asc">Rating: Low to High</option>
                            </Form.Select>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-between align-items-center mb-3 text-muted small">
                        <span>
                            Total: {movies.length} | Favorites: {favoriteCount} | Showing: {shownMovies.length}
                        </span>
                        {hasFilter && (
                            <Button
                                variant="link"
                                size="sm"
                                className="p-0 text-decoration-none text-muted"
                                onClick={resetFilters}
                            >
                                Clear Filters
                            </Button>
                        )}
                    </div>

                    <MovieList
                        movies={shownMovies}
                        selectedMovieId={selectedMovieId}
                        onToggleFavorite={toggleFavorite}
                        onViewDetail={handleViewDetail}
                    />
                </div>

                {/* Cột chi tiết phim: hiện ở bên phải mà không làm co bảng list */}
                {selectedMovie && (
                    <div style={{ width: '360px', flexShrink: 0 }}>
                        <MovieDetail
                            movie={selectedMovie}
                            onClose={() => setSelectedMovieId(null)}
                            onToggleFavorite={toggleFavorite}
                        />
                    </div>
                )}
            </div>
        </Container>
    );
}

export default App;
