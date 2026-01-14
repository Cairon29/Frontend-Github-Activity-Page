import { GitHubCalendar } from 'react-github-calendar';
import Tippy from '@tippyjs/react';
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";
import { useState, type ReactElement } from 'react';
import { motion } from 'motion/react';
import './landing.css';

// @ts-ignore
import Particles from '../../components/Particles';
// @ts-ignore
import RotatingText from '../../components/RotatingText';


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
                <div className='title_container' id='title_container'>
                    <motion.div className="title" layout transition={{ type: "spring", damping: 30, stiffness: 400 }}>
                        <motion.span layout className="mr-5 white">Track your</motion.span>
                        <RotatingText
                            texts={['habits', 'code', 'progress', 'calendar']}
                            mainClassName="color-5"
                            staggerFrom={"last"}
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-120%" }}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden"
                            transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            rotationInterval={3000}
                            animatePresenceMode="popLayout"
                        />
                    </motion.div>

                    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
                        <Particles
                            particleColors={['#ffffff', '#29a1a1']}
                            particleCount={250}
                            particleSpread={20}
                            speed={0.1}
                            particleBaseSize={200}
                            moveParticlesOnHover={true}
                            alphaParticles={false}
                            disableRotation={false}

                        />
                    </div>
                </div>
            </section>
            <section className="landing_section">
                <div className="search-wrapper">
                    <input
                        type="text"
                        value={inputUsername}
                        onChange={(e) => setInputUsername(e.target.value)}
                        placeholder="GitHub username search..."
                    />
                    <div className="search-actions">
                        {inputUsername && (
                            <button className="clear-btn" onClick={() => { setInputUsername(''); setUsername(''); }}>✕</button>
                        )}
                        <button className="search-btn" onClick={searchUser} disabled={!inputUsername}>Search</button>
                    </div>
                </div>
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
                            colorScheme='dark'
                            theme={{
                                light: ['hsl(0, 0%, 92%)', 'firebrick'],
                                dark: ['#333', 'rgb(214, 16, 174)'],
                            }}
                        />
                    ) : (
                        <p>Search for a GitHub user to see their activity calendar</p>
                    )}
            </section>
        </div>
    );
}