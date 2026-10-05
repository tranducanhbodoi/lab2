import { Form } from 'react-bootstrap';

function SearchBar({ search, setSearch }) {
    return (
        <Form.Control
            className="mb-3"
            type="text"
            placeholder="Search movies by title..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
        />
    );
}

export default SearchBar;
