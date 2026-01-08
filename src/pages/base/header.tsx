import { Link, useLocation } from 'react-router-dom';
import { useUIStore } from '../../store/ui';

export default function Header() {
    const location = useLocation();
    const { toggleSideMenu } = useUIStore();

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
                <button onClick={toggleSideMenu} className="auth-button" style={{ marginLeft: '10px' }}>
                    Menu
                </button>
            </div>
        </header>
    );
}