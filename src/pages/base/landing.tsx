import { GitHubCalendar } from 'react-github-calendar';
import Tippy from '@tippyjs/react';
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";
import { useState, type ReactElement } from 'react';
import './landing.css';

import Cubes from '../../components/Cubes'


export default function Landing() {
    const [inputUsername, setInputUsername] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    const searchUser = () => {
        setLoading(true);
        setUsername(inputUsername);
        setTimeout(() => setLoading(false), 500);
    }

    return (
        <div className="landing_container">
            <section className="landing_section">
                <h1>An amazing title</h1>
                <div style={{ height: '600px', position: 'relative' }}>
                    <Cubes
                        gridSize={8}
                        maxAngle={60}
                        radius={4}
                        borderStyle="2px dashed #5227FF"
                        faceColor="#1a1a2e"
                        rippleColor="#ff6b6b"
                        rippleSpeed={1.5}
                        autoAnimate={true}
                        rippleOnClick={true}
                    />
                </div>
            </section>
            <section className="landing_section">
                <input
                    type="text"
                    value={inputUsername}
                    onChange={(e) => setInputUsername(e.target.value)}
                    placeholder="GitHub username search..."
                />
                <button onClick={searchUser} disabled={!inputUsername}>Search</button>
                <button onClick={() => setUsername('')}>X</button>
            </section>
            <section className="landing_section">
                {
                    username ? (
                        <GitHubCalendar
                            username={username}
                            renderBlock={(block: ReactElement, activity: any) => (
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
                    ) : (
                        <p>Search for a GitHub user to see their activity calendar</p>
                    )}
            </section>
        </div>
    );
}