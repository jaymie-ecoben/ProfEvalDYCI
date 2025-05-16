import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    FiHome, 
    FiUsers, 
    FiCalendar, 
    FiFileText, 
    FiUser,
    FiLogOut
} from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const menuItems = [
        { path: '/', icon: <FiHome />, label: 'Home' },
        { path: '/masterlist', icon: <FiUsers />, label: 'Masterlist' },
        { path: '/calendar', icon: <FiCalendar />, label: 'Calendar' },
        { path: '/evaluation', icon: <FiFileText />, label: 'Evaluation' },
        { path: '/account', icon: <FiUser />, label: 'Account' },
    ];

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <div className="logo-container">
                    <img src="/logo.png" alt="Logo" className="logo" />
                    <span className="logo-text">DYCI Admin</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-label">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button className="logout-btn">
                    <FiLogOut />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar; 