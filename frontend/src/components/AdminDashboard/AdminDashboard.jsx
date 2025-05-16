import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FaHome,
    FaList,
    FaCalendarAlt,
    FaFileAlt,
    FaUserCircle,
    FaSignOutAlt,
    FaBell,
    FaUser,
} from 'react-icons/fa';
import Masterlist from '../Masterlist/Masterlist';
import Calendar from '../Calendar/Calendar';
import Evaluation from '../EvaluationPage/Evaluation';
import UserProfile from './UserProfile';
import './AdminDashboard.css';
import logo from '../../assets/images/dyci.png';
import background from '../../assets/images/background.jpg';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('home');
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    // Sample user data - in a real app this would come from your authentication system
    const userData = {
        name: 'Admin User',
        email: 'admin@dyci.edu.ph',
        phone: '+63 912 345 6789',
        department: 'IT Department',
        position: 'Administrator',
        joinDate: '2023-01-15',
        avatar: null
    };

    const handleProfileClick = () => {
        setShowProfile(false); // Close the dropdown
        setActiveSection('account'); // Navigate to account section
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'home':
                return (
                    <div className="dashboard-content">
                        <h2>Welcome to Admin Dashboard</h2>
                        <div className="dashboard-stats">
                            <div className="stat-card">
                                <h3>Total Professors</h3>
                                <p>24</p>
                            </div>
                            <div className="stat-card">
                                <h3>Active Professors</h3>
                                <p>20</p>
                            </div>
                            <div className="stat-card">
                                <h3>Pending Evaluations</h3>
                                <p>15</p>
                            </div>
                        </div>
                    </div>
                );
            case 'masterlist':
                return <Masterlist />;
            case 'calendar':
                return <Calendar />;
            case 'evaluation':
                return <Evaluation />;
            case 'account':
                return (
                    <div className="dashboard-content account-content">
                        <h2>Account Settings</h2>
                        <UserProfile 
                            isOpen={true} 
                            onClose={() => {}} 
                            userData={userData}
                            displayMode="inline"
                        />
                    </div>
                );
            default:
                return (
                    <div className="dashboard-content">
                        <h2>Welcome to Admin Dashboard</h2>
                        <div className="dashboard-stats">
                            <div className="stat-card">
                                <h3>Total Professors</h3>
                                <p>24</p>
                            </div>
                            <div className="stat-card">
                                <h3>Active Professors</h3>
                                <p>20</p>
                            </div>
                            <div className="stat-card">
                                <h3>Pending Evaluations</h3>
                                <p>15</p>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    const navItems = [
        { id: 'home', icon: <FaHome />, label: 'Home' },
        { id: 'masterlist', icon: <FaList />, label: 'Masterlist' },
        { id: 'calendar', icon: <FaCalendarAlt />, label: 'Calendar' },
        { id: 'evaluation', icon: <FaFileAlt />, label: 'Evaluation' },
        { id: 'account', icon: <FaUserCircle />, label: 'Account' },
    ];

    return (
        <div className="dashboard-container" style={{ backgroundImage: `url(${background})` }}>
            <div className="dashboard-overlay"></div>
            
            <header className="dashboard-header">
                <div className="header-left">
                    <img src={logo} alt="DYCI Logo" className="header-logo" />
                    <h1>DYCI Admin</h1>
                </div>
                <div className="header-right">
                    <div className="notification-wrapper">
                        <button 
                            className="icon-button"
                            onClick={() => setShowNotifications(!showNotifications)}
                        >
                            <FaBell />
                            <span className="notification-badge">3</span>
                        </button>
                        {showNotifications && (
                            <div className="notification-dropdown">
                                <div className="notification-item">
                                    <p>New evaluation submitted</p>
                                    <span>2 minutes ago</span>
                                </div>
                                <div className="notification-item">
                                    <p>Professor profile updated</p>
                                    <span>1 hour ago</span>
                                </div>
                                <div className="notification-item">
                                    <p>System maintenance scheduled</p>
                                    <span>1 day ago</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="profile-wrapper">
                        <button 
                            className="icon-button"
                            onClick={() => setShowProfile(!showProfile)}
                        >
                            <FaUser />
                            <span>{userData.name}</span>
                        </button>
                        {showProfile && (
                            <div className="profile-dropdown">
                                <div className="profile-info">
                                    <p><strong>Name:</strong> {userData.name}</p>
                                    <p><strong>Email:</strong> {userData.email}</p>
                                    <p><strong>Role:</strong> {userData.position}</p>
                                    <button 
                                        className="view-profile-btn"
                                        onClick={handleProfileClick}
                                    >
                                        View/Edit Profile
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <aside className="sidebar">
                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                            onClick={() => setActiveSection(item.id)}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>
                <div className="sidebar-footer">
                    <button className="logout-button" onClick={() => navigate('/login')}>
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            <main className="dashboard-main">
                {renderContent()}
            </main>
        </div>
    );
};

export default AdminDashboard;