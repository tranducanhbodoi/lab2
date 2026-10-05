import { Button, ListGroup } from 'react-bootstrap';

function MovieItem({ movie, isSelected, onToggleFavorite, onViewDetail }) {
    return (
        <ListGroup.Item
            className={`d-flex justify-content-between align-items-center py-3 ${
                isSelected ? 'bg-body-secondary border-primary' : ''
            }`}
        >
            <div>
                <div className="fw-bold fs-6">
                    {movie.title} <span className="text-muted fw-normal">({movie.year})</span>
                </div>
                <div className="text-muted small mt-1">
                    <span className="me-3">Genre: {movie.genre}</span>
                    <span className="me-3">Rating: {movie.rating}/10</span>
                    {movie.duration && <span>Duration: {movie.duration} mins</span>}
                </div>
            </div>

            <div className="d-flex gap-2">
                <Button
                    size="sm"
                    variant={isSelected ? 'primary' : 'outline-secondary'}
                    onClick={() => onViewDetail(movie)}
                >
                    Details
                </Button>

                <Button
                    size="sm"
                    variant={movie.favorite ? 'danger' : 'outline-danger'}
                    onClick={() => onToggleFavorite(movie.id)}
                >
                    {movie.favorite ? 'Favorited' : 'Favorite'}
                </Button>
            </div>
        </ListGroup.Item>
    );
}

export default MovieItem;
