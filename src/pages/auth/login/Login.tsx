// components/Login/Login.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabase_client';
import { useAuthStore } from '../../../store/session.ts';
import './Login.css';

export default function Login() {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { setSession, setLoading, loading, session } = useAuthStore();
    const baseUrl = 'http://localhost:5555/api';

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

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Welcome Back</h1>
                <p>Sign in to access your dashboard</p>

                <button
                    className="github-btn"
                    onClick={handleGitHubLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <span>Loading...</span>
                    ) : (
                        <>
                            <svg className="github-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            <span>Continue with GitHub</span>
                        </>
                    )}
                </button>

                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
}