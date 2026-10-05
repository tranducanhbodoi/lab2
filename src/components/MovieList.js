import { ListGroup } from 'react-bootstrap';
import MovieItem from './MovieItem';

function MovieList({ movies, onToggleFavorite, onViewDetail }) {
    if (movies.length === 0) {
        return <p className="text-muted text-center py-4">Không tìm thấy phim nào phù hợp.</p>;
    }

    return (
        <ListGroup>
            {movies.map((movie) => (
                <MovieItem
                    key={movie.id}
                    movie={movie}
                    onToggleFavorite={onToggleFavorite}
                    onViewDetail={onViewDetail}
                />
            ))}
        </ListGroup>
    );
}

export default MovieList;
