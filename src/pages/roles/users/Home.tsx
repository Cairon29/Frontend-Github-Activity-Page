// @ts-ignore
import { GitHubCalendar } from 'react-github-calendar';
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";
import Tippy from '@tippyjs/react';
import { useAuthStore } from '../../../store/session.ts';
import { supabase } from '../../../supabase_client';
import { useNavigate } from 'react-router-dom';

import './home.css';
import SideMenu from '../../base/side_menu';

export default function Home() {
    const { user, loading, clearAuth } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        clearAuth();
        navigate('/login');
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Please log in to access this page</div>;
    }

    return (
        <>
            <SideMenu />
            <div className="home_container">
                <section className="home_section">
                    <h1>An amazing title</h1>
                </section>
                <section className="home_section">
                    {/* here the input section */}
                    <input type="text" placeholder="GitHub username search..." />
                </section>
                <section className="home_section">
                    {/* here the calendar section */}
                    <p>User ID: {user.id}</p>
                    <p>Email: {user.email}</p>
                    <p>GitHub Username: {user.user_metadata?.user_name}</p>
                    <button onClick={handleLogout}>Logout</button>
                    <GitHubCalendar
                        username={user?.user_metadata?.user_name}
                        renderBlock={(block, activity) => (
                            <Tippy
                                key={activity.date}
                                content={`${activity.count} aportes el ${activity.date}`}
                                animation="shift-away"
                                placement="top"
                            >
                                {block}
                            </Tippy>
                        )}
                    />
                    <img style={{ width: '200px' }} src={user?.user_metadata?.avatar_url} alt="" />
                </section>
            </div>
        </>
    );
}
