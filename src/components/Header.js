import { Button } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';

function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
            <div>
                <h3 className="m-0 fw-bold">Quản lý phim</h3>
                <small className="text-muted">Danh sách và tìm kiếm phim</small>
            </div>

            <Button
                variant={theme === 'light' ? 'outline-secondary' : 'outline-light'}
                size="sm"
                onClick={toggleTheme}
            >
                {theme === 'light' ? 'Giao diện tối' : 'Giao diện sáng'}
            </Button>
        </div>
    );
}

export default Header;
