import { Link, useLocation } from 'react-router-dom';
import { useUIStore } from '../../store/ui';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/session';
import { supabase } from '../../supabase_client';

// @ts-ignore
import StaggeredMenu from '../../components/StaggeredMenu';
import SideMenu from './side_menu';

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
        <>
            <SideMenu />
            <header id="header">
                <div className="logo-container">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <span className="logo-text color-5">Code Habits</span>
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

                <div className='inline-flex'>
                    <Link to="/login">
                        <button onClick={handleGitHubLogin} className="auth-button">
                            <svg className="medium-icon" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                        </button>
                    </Link>
                    <button onClick={toggleSideMenu} className="auth-button" style={{ marginLeft: '10px' }}>
                        <svg className="medium-icon" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                    </button>

                </div>
            </header>
        </>
    );
}