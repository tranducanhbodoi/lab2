import { Button } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';

function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
                <h3 className="m-0 fw-bold">Mini Movie Manager</h3>
            </div>

            <Button
                variant={theme === 'light' ? 'outline-secondary' : 'outline-light'}
                size="sm"
                onClick={toggleTheme}
            >
                {theme === 'light' ? 'Dark' : 'Light'}
            </Button>
        </div>
    );
}

export default Header;
