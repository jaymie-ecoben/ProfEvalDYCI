import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaClipboardList } from 'react-icons/fa';
import logo from '../../assets/images/dyci.png';
import './StudentDashboard.css';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <nav className="dashboard-nav">
                <div className="nav-brand">
                    <img src={logo} alt="DYCI Logo" className="nav-logo" />
                    <h1>DYCI - Student Portal</h1>
                </div>
                <div className="nav-user">
                    <FaUser className="user-icon" />
                    <span>{`${user.first_name} ${user.last_name}`}</span>
                </div>
                <button onClick={handleLogout} className="logout-button">
                    <FaSignOutAlt /> Logout
                </button>
            </nav>

            <main className="dashboard-main">
                <div className="dashboard-header">
                    <h2>Welcome, {`${user.first_name} ${user.last_name}`}!</h2>
                    <p>Professor Evaluation System</p>
                </div>

                <div className="dashboard-content">
                    <div className="dashboard-card">
                        <FaClipboardList className="card-icon" />
                        <h3>Evaluate Professors</h3>
                        <p>Submit your evaluations for your professors</p>
                        <button className="action-button">Start Evaluation</button>
                    </div>

                    <div className="dashboard-card">
                        <FaClipboardList className="card-icon" />
                        <h3>View History</h3>
                        <p>View your previous evaluations</p>
                        <button className="action-button">View History</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StudentDashboard; 