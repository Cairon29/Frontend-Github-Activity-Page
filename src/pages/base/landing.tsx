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

        fetch(`https://api.github.com/users/${inputUsername}`)
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
                            <div className='user_data_container user_info_container flex flex-row items-center gap-30'>
                                <div className='user_profile_name_picture flex flex-row items-center gap-7'>
                                    <span>
                                        <img src={userData?.avatar_url || githubIcon_2} width={100} alt="github icon" />
                                    </span>
                                    <span>
                                        <p className='text-3xl font-bold color-5'>{username}</p>
                                        <p className='color-9'>{userData?.name}</p>
                                    </span>
                                    <a className='web_link_svg_wrapper' href="" target="_blank" rel="noopener noreferrer">
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.51194 3.00541C9.18829 2.54594 10.0435 2.53694 10.6788 2.95419C10.8231 3.04893 10.9771 3.1993 11.389 3.61119C11.8009 4.02307 11.9513 4.17714 12.046 4.32141C12.4633 4.95675 12.4543 5.81192 11.9948 6.48827C11.8899 6.64264 11.7276 6.80811 11.3006 7.23511L10.6819 7.85383C10.4867 8.04909 10.4867 8.36567 10.6819 8.56093C10.8772 8.7562 11.1938 8.7562 11.389 8.56093L12.0077 7.94221L12.0507 7.89929C12.4203 7.52976 12.6568 7.2933 12.822 7.0502C13.4972 6.05623 13.5321 4.76252 12.8819 3.77248C12.7233 3.53102 12.4922 3.30001 12.1408 2.94871L12.0961 2.90408L12.0515 2.85942C11.7002 2.508 11.4692 2.27689 11.2277 2.11832C10.2377 1.46813 8.94398 1.50299 7.95001 2.17822C7.70691 2.34336 7.47044 2.57991 7.1009 2.94955L7.058 2.99247L6.43928 3.61119C6.24401 3.80645 6.24401 4.12303 6.43928 4.31829C6.63454 4.51355 6.95112 4.51355 7.14638 4.31829L7.7651 3.69957C8.1921 3.27257 8.35757 3.11027 8.51194 3.00541ZM4.31796 7.14672C4.51322 6.95146 4.51322 6.63487 4.31796 6.43961C4.12269 6.24435 3.80611 6.24435 3.61085 6.43961L2.99213 7.05833L2.94922 7.10124C2.57957 7.47077 2.34303 7.70724 2.17788 7.95035C1.50265 8.94432 1.4678 10.238 2.11799 11.2281C2.27656 11.4695 2.50766 11.7005 2.8591 12.0518L2.90374 12.0965L2.94837 12.1411C3.29967 12.4925 3.53068 12.7237 3.77214 12.8822C4.76219 13.5324 6.05589 13.4976 7.04986 12.8223C7.29296 12.6572 7.52943 12.4206 7.89896 12.051L7.89897 12.051L7.94188 12.0081L8.5606 11.3894C8.75586 11.1941 8.75586 10.8775 8.5606 10.6823C8.36533 10.487 8.04875 10.487 7.85349 10.6823L7.23477 11.301C6.80777 11.728 6.6423 11.8903 6.48794 11.9951C5.81158 12.4546 4.95642 12.4636 4.32107 12.0464C4.17681 11.9516 4.02274 11.8012 3.61085 11.3894C3.19896 10.9775 3.0486 10.8234 2.95385 10.6791C2.53661 10.0438 2.54561 9.18863 3.00507 8.51227C3.10993 8.35791 3.27224 8.19244 3.69924 7.76544L4.31796 7.14672ZM9.62172 6.08558C9.81698 5.89032 9.81698 5.57373 9.62172 5.37847C9.42646 5.18321 9.10988 5.18321 8.91461 5.37847L5.37908 8.91401C5.18382 9.10927 5.18382 9.42585 5.37908 9.62111C5.57434 9.81637 5.89092 9.81637 6.08619 9.62111L9.62172 6.08558Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                                    </a>
                                </div>
                                <div className='divisor_line'></div>
                                <div className='user_data'>
                                    <p>Followers: <span className='color-5'>{userData?.followers}</span></p>
                                    <p>Following: <span className='color-5'>{userData?.following}</span></p>
                                    <p>Number of repositories: <span className='color-5'>{userData?.public_repos}</span></p>
                                </div>
                                <div className='divisor_line'></div>
                                <div className='flex flex-col items-center gap-2'>
                                    <h4 className='color-5 font-bold'>Conect</h4>
                                    <section className='social-icon-container'>
                                        <svg className="social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                                        <svg role="img" className='social-icon' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>X</title><path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" /></svg>
                                        <svg role="img" className='social-icon' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>YouTube</title><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                                        <svg role="img" className='social-icon' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" /></svg>
                                    </section>
                                </div>
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