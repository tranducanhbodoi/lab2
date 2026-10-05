import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { movies as movieData } from './datas/movies';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import GenreFilter from './components/GenreFilter';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';

// Lấy danh sách thể loại không trùng lặp
const genres = [...new Set(movieData.map((movie) => movie.genre))];

// Thêm trường favorite = false cho mỗi phim ban đầu
const startMovies = movieData.map((movie) => ({ ...movie, favorite: false }));

function App() {
    // ===== STATE =====
    const [movies, setMovies] = useState(startMovies);
    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState('All');
    const [sort, setSort] = useState('none');
    const [onlyFavorite, setOnlyFavorite] = useState(false);
    const [selectedMovieId, setSelectedMovieId] = useState(null);

    // ===== LỌC & SẮP XẾP =====
    // 1. Lọc theo thể loại
    let shownMovies = movies.filter((movie) => genre === 'All' || movie.genre === genre);

    // 2. Lọc theo tên
    if (search.trim()) {
        shownMovies = shownMovies.filter((movie) =>
            movie.title.toLowerCase().includes(search.trim().toLowerCase())
        );
    }

    // 3. Lọc chỉ phim yêu thích
    if (onlyFavorite) {
        shownMovies = shownMovies.filter((movie) => movie.favorite);
    }

    // 4. Sắp xếp
    if (sort === 'desc') {
        shownMovies = [...shownMovies].sort((a, b) => b.rating - a.rating);
    } else if (sort === 'asc') {
        shownMovies = [...shownMovies].sort((a, b) => a.rating - b.rating);
    } else if (sort === 'year') {
        shownMovies = [...shownMovies].sort((a, b) => b.year - a.year);
    }

    // ===== THỐNG KÊ =====
    const favoriteCount = movies.filter((movie) => movie.favorite).length;

    // ===== SỰ KIỆN =====
    function toggleFavorite(id) {
        setMovies((prevMovies) =>
            prevMovies.map((movie) =>
                movie.id === id ? { ...movie, favorite: !movie.favorite } : movie
            )
        );
    }

    function resetFilters() {
        setSearch('');
        setGenre('All');
        setSort('none');
        setOnlyFavorite(false);
    }

    const hasFilter = search !== '' || genre !== 'All' || sort !== 'none' || onlyFavorite;
    const selectedMovie = movies.find((m) => m.id === selectedMovieId);

    return (
        <Container className="movie-container py-4">
            <Header />

            <SearchBar search={search} setSearch={setSearch} />

            <Row className="mb-3 g-2">
                <Col xs={12} sm={4}>
                    <GenreFilter genres={genres} genre={genre} setGenre={setGenre} />
                </Col>
                <Col xs={6} sm={4}>
                    <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="none">Sắp xếp theo...</option>
                        <option value="desc">Điểm: Cao đến thấp</option>
                        <option value="asc">Điểm: Thấp đến cao</option>
                        <option value="year">Năm: Mới nhất</option>
                    </Form.Select>
                </Col>
                <Col xs={6} sm={4}>
                    <Button
                        variant={onlyFavorite ? 'danger' : 'outline-secondary'}
                        className="w-100"
                        onClick={() => setOnlyFavorite(!onlyFavorite)}
                    >
                        {onlyFavorite ? 'Đang lọc yêu thích' : 'Chỉ xem yêu thích'}
                    </Button>
                </Col>
            </Row>

            <div className="d-flex justify-content-between align-items-center border-top border-bottom py-2 mb-3 small">
                <span>
                    Tổng: {movies.length} | Yêu thích: {favoriteCount} | Đang hiển thị: {shownMovies.length}
                </span>
                {hasFilter && (
                    <Button
                        variant="link"
                        size="sm"
                        className="p-0 text-decoration-none text-muted"
                        onClick={resetFilters}
                    >
                        Xóa bộ lọc
                    </Button>
                )}
            </div>

            <MovieList
                movies={shownMovies}
                onToggleFavorite={toggleFavorite}
                onViewDetail={(movie) => setSelectedMovieId(movie.id)}
            />

            <MovieDetail
                movie={selectedMovie}
                show={Boolean(selectedMovie)}
                onHide={() => setSelectedMovieId(null)}
                onToggleFavorite={toggleFavorite}
            />
        </Container>
    );
}

export default App;
