import { Button, Modal } from 'react-bootstrap';

function MovieDetail({ movie, show, onHide, onToggleFavorite }) {
    if (!movie) return null;

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title className="fw-bold fs-5">
                    {movie.title} <span className="text-muted fw-normal">({movie.year})</span>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="mb-2">
                    <strong>Thể loại: </strong>
                    <span>{movie.genre}</span>
                </div>

                <div className="mb-2">
                    <strong>Điểm đánh giá: </strong>
                    <span>{movie.rating}/10</span>
                </div>

                {movie.duration && (
                    <div className="mb-2">
                        <strong>Thời lượng: </strong>
                        <span>{movie.duration} phút</span>
                    </div>
                )}

                <div className="mb-2">
                    <strong>Đạo diễn: </strong>
                    <span>{movie.director}</span>
                </div>

                <div>
                    <strong>Nội dung tóm tắt: </strong>
                    <p className="text-muted mt-1 mb-0">{movie.description}</p>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant={movie.favorite ? 'danger' : 'outline-danger'}
                    className="me-auto"
                    onClick={() => onToggleFavorite(movie.id)}
                >
                    {movie.favorite ? 'Đã thích' : 'Yêu thích'}
                </Button>
                <Button variant="secondary" onClick={onHide}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MovieDetail;
