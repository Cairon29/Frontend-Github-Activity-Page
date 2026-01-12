import { Link, useLocation } from 'react-router-dom';
import { useUIStore } from '../../store/ui';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/session';
import { supabase } from '../../supabase_client';

export default function Header() {
    const location = useLocation();
    const { toggleSideMenu } = useUIStore();

    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { setSession, setLoading, loading, session } = useAuthStore();
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

    useEffect(() => {
        // Check active session on mount
        const initAuth = async () => {
            setLoading(true);
            const { data: { session } } = await supabase.auth.getSession();

            if (session) {
                setSession(session);
                console.log(session);

                await handleUserSync(session);
            } else {
                setLoading(false);
            }
        };

        initAuth();

        // Listen for auth state changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session);
            if (session) {
                await handleUserSync(session);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleUserSync = async (session: any) => {
        try {
            console.log('Syncing user session:', session);

            // Check if user exists in backend
            const checkResponse = await fetch(
                `${baseUrl}/users?supabase_uid=${session?.user?.id}`
            );
            const checkJson = await checkResponse.json();

            if (checkJson?.data && !checkJson?.data?.error) {
                console.log('User already exists, redirecting...');
                navigate('/home');
                return;
            }

            // Register new user in backend
            const metadata = session?.user?.user_metadata;
            const userData = {
                email: session?.user?.email,
                phone: session?.user?.phone || '',
                github_username: metadata?.user_name,
                fullname: metadata?.full_name || '',
                supabase_id: session?.user?.id,
                profile_picture: metadata?.avatar_url || '',
            };

            const signupResponse = await fetch(`${baseUrl}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const signupJson = await signupResponse.json();
            console.log('Signup result:', signupJson);

            navigate('/home');
        } catch (err: any) {
            console.error('Sync error:', err);
            setError(err.message || 'An error occurred during login.');
        }
    };

    const handleGitHubLogin = async () => {
        try {
            setLoading(true);
            setError(null);

            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                    redirectTo: window.location.origin, // Redirect to the current origin i guess this is why the github login doesnt appear
                },
            });

            if (error) throw error;
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    // Redirect if already logged in
    useEffect(() => {
        if (session && !loading) {
            navigate('/home');
        }
    }, [session, loading, navigate]);

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
                    <button onClick={handleGitHubLogin} className="auth-button">
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