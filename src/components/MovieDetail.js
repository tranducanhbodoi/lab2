import { Button, Card } from 'react-bootstrap';

function MovieDetail({ movie, onClose, onToggleFavorite }) {
    if (!movie) return null;

    return (
        <Card className="p-3 position-sticky" style={{ top: '20px' }}>
            <div className="d-flex justify-content-between align-items-start mb-3">
                <h5 className="fw-bold mb-0">
                    {movie.title} <span className="text-muted fw-normal fs-6">({movie.year})</span>
                </h5>
                {onClose && (
                    <Button
                        variant="close"
                        aria-label="Close"
                        onClick={onClose}
                    />
                )}
            </div>

            <div className="mb-2">
                <strong>Genre: </strong>
                <span>{movie.genre}</span>
            </div>

            <div className="mb-2">
                <strong>Rating: </strong>
                <span>{movie.rating}/10</span>
            </div>

            {movie.duration && (
                <div className="mb-2">
                    <strong>Duration: </strong>
                    <span>{movie.duration} mins</span>
                </div>
            )}

            <div className="mb-2">
                <strong>Director: </strong>
                <span>{movie.director}</span>
            </div>

            <div className="mb-3">
                <strong>Description: </strong>
                <p className="text-muted mt-1 mb-0">{movie.description}</p>
            </div>

            <div className="d-flex gap-2">
                <Button
                    size="sm"
                    variant={movie.favorite ? 'danger' : 'outline-danger'}
                    onClick={() => onToggleFavorite(movie.id)}
                >
                    {movie.favorite ? 'Favorited' : 'Favorite'}
                </Button>
                {onClose && (
                    <Button size="sm" variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                )}
            </div>
        </Card>
    );
}

export default MovieDetail;
