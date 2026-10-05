import { ListGroup } from 'react-bootstrap';
import MovieItem from './MovieItem';

function MovieList({ movies, selectedMovieId, onToggleFavorite, onViewDetail }) {
    if (movies.length === 0) {
        return <p className="text-muted text-center py-4">No movies found.</p>;
    }

    return (
        <ListGroup>
            {movies.map((movie) => (
                <MovieItem
                    key={movie.id}
                    movie={movie}
                    isSelected={movie.id === selectedMovieId}
                    onToggleFavorite={onToggleFavorite}
                    onViewDetail={onViewDetail}
                />
            ))}
        </ListGroup>
    );
}

export default MovieList;
