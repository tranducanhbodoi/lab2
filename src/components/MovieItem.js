import { Button, ListGroup } from 'react-bootstrap';

function MovieItem({ movie, onToggleFavorite, onViewDetail }) {
    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
            <div>
                <div className="fw-bold fs-6">
                    {movie.title} <span className="text-muted fw-normal">({movie.year})</span>
                </div>
                <div className="text-muted small mt-1">
                    <span className="me-3">Thể loại: {movie.genre}</span>
                    <span className="me-3">Điểm: {movie.rating}/10</span>
                    {movie.duration && <span>Thời lượng: {movie.duration} phút</span>}
                </div>
            </div>

            <div className="d-flex gap-2">
                <Button
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => onViewDetail(movie)}
                >
                    Chi tiết
                </Button>

                <Button
                    size="sm"
                    variant={movie.favorite ? 'danger' : 'outline-danger'}
                    onClick={() => onToggleFavorite(movie.id)}
                >
                    {movie.favorite ? 'Đã thích' : 'Yêu thích'}
                </Button>
            </div>
        </ListGroup.Item>
    );
}

export default MovieItem;
