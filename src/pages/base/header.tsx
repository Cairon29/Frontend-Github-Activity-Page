import { Link, useLocation } from 'react-router-dom';

export default function Header() {
    const location = useLocation();

    // Simple helper to check active status
    const isActive = (path: string) => location.pathname === path;

    return (
        <header id="header">
            <div className="logo-container">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <span className="logo-text">Ur Commit</span>
                </Link>
            </div>

            <nav>
                <Link
                    to="/home"
                    className="nav-link"
                    style={{ color: isActive('/home') ? 'var(--text-primary)' : '' }}
                >
                    Home
                </Link>
                <a href="#" className="nav-link">Features</a>
                <a href="#" className="nav-link">Community</a>
            </nav>

            <div>
                <Link to="/login">
                    <button className="auth-button">
                        Login
                    </button>
                </Link>
            </div>
        </header>
    );
}