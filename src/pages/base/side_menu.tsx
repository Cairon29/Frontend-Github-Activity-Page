import { useUIStore } from '../../store/ui';

export default function SideMenu() {
    const { isSideMenuOpen, closeSideMenu } = useUIStore();

    if (!isSideMenuOpen) return null;

    return (
        <>
            <div className="menu_backdrop" onClick={closeSideMenu} />
            <aside className="side_menu">
                <div className="menu_container">
                    {/* Here the big menu title */}
                    <b>Code</b>
                    <b>Habits</b>
                </div>
                <div className="menu_container">
                    <ul>
                        <li>Log in / Profile</li>
                        <li>Logout</li> {/* Optional if a session has not been synced. Depends on the current auth state */}
                        <li>Theme</li>
                        <li>About</li>
                        <li>Source code</li>
                    </ul>
                </div>
            </aside>
        </>
    );
}