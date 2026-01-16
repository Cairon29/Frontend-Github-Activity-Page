import { GitHubCalendar } from 'react-github-calendar';
import Tippy from '@tippyjs/react';
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";
import { useEffect, useState, type ReactElement } from 'react';
import { motion } from 'motion/react';
import './landing.css';

// @ts-ignore
import Particles from '../../components/Particles';
// @ts-ignore
import RotatingText from '../../components/RotatingText';
// @ts-ignore
import CardSwap, { Card } from '../../components/CardSwap'
import githubIcon_1 from '../../assets/free-github-icon-rCdaAPGQJ_SP.svg';
import githubIcon_2 from '../../assets/free-github-icon-qeC3XYNouIkk.svg';


export default function Landing() {
    const [inputUsername, setInputUsername] = useState('');
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const searchUser = () => {
        setLoading(true);
        setUsername(inputUsername);
        setTimeout(() => setLoading(false), 500);

        fetch(`http://localhost:5555/api/users/githubInfo/${inputUsername}`)
            .then(response => response.json())
            .then(data => setUserData(data));
    }

    useEffect(() => {
        console.log(userData);
    }, [userData]);



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
                <div className='flex flex-row items-center gap-5 p-7'>
                    <img src={githubIcon_1} width={60} alt="github icon" />
                    <span className='text-center not_so_big'> <span className='color-6 font-bold'>Type</span> a user to see their amazing <span className='color-6 font-bold'>calendar</span></span>
                </div>
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
            <section className={`landing_section ${username ? 'structure_flex' : 'structure_grid'}`}>
                {
                    username ? (

                        <article className='user_github_info_container'>
                            <div className='user_data_container user_info_container'>
                                <img src={userData?.avatar_url || githubIcon_2} width={100} alt="github icon" />
                                <span>{username}</span>
                            </div>
                            <div className='user_data_container calendar_container'>

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
                            </div>
                            <div className='user_data_container github_stats_container'>
                                <span className='data_label'>Total contributions</span>
                                <span className='data_label'>Streak</span>
                                <span className='data_label'>Best day</span>
                                <span className='data_label'>Most active repositories</span>
                                <span className='data_label'>Most active languages</span>
                                <span className='data_label'>Streak</span>
                                <span className='data_label'>Best day</span>
                            </div>
                        </article>
                    ) : (
                        <article className='slider_article'>
                            <div className='slider_container'>
                                <h3>
                                    <span className='color-9'>Each day counts, </span>
                                    <span className='color-5'>each push matters</span>
                                </h3>
                                <p>Track your progress and stay motivated with our developer community</p>
                            </div>

                            <div className='slider_container'>
                                <div style={{ height: '600px', position: 'relative' }}>
                                    <CardSwap
                                        cardDistance={60}
                                        verticalDistance={70}
                                        delay={2500}
                                        pauseOnHover={false}
                                    >
                                        <Card>
                                            <h3>Card 1</h3>
                                            <p>Your content here</p>
                                        </Card>
                                        <Card>
                                            <h3>Card 2</h3>
                                            <p>Your content here</p>
                                        </Card>
                                        <Card>
                                            <h3>Card 3</h3>
                                            <p>Your content here</p>
                                        </Card>
                                    </CardSwap>
                                </div>
                            </div>
                        </article>
                    )}
            </section>
        </div>
    );
}