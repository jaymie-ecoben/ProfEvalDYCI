import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import './Login.css';
import logo from '../../assets/images/dyci.png';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Get message from location state (if redirected from registration)
    const message = location.state?.message;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.username.trim()) {
            setError('Username is required');
            return false;
        }
        if (!formData.password) {
            setError('Password is required');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            console.log('Attempting login with:', { username: formData.username }); // Debug log

            const response = await fetch('http://localhost/dyci-professor-evaluation-system/backend/api/auth/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            console.log('Response status:', response.status); // Debug log
            const data = await response.json();
            console.log('Login response:', data); // Debug log

            if (response.ok && data.status === 'success') {
                // Store token and user data
                localStorage.setItem('token', data.token);
                localStorage.setItem('userRole', data.user.role);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                console.log('Stored user data:', {
                    role: data.user.role,
                    token: data.token,
                    user: data.user
                }); // Debug log
                
                // Redirect based on role
                if (data.user.role === 'admin') {
                    console.log('Redirecting to admin dashboard...'); // Debug log
                    navigate('/admin/dashboard', { replace: true });
                } else if (data.user.role === 'student') {
                    console.log('Redirecting to student dashboard...'); // Debug log
                    navigate('/student/dashboard', { replace: true });
                } else {
                    console.log('Invalid role:', data.user.role); // Debug log
                    setError('Invalid user role');
                }
            } else {
                console.log('Login failed:', data.error); // Debug log
                setError(data.error || 'Authentication failed. Please verify your credentials and try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Unable to establish connection to the server. Please check your network connection and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-outer-container">
            <div className="login-header-section">
                <img src={logo} alt="DYCI Logo" className="login-logo" />
                <h2 className="login-school">Dr. Yanga College's Inc.</h2>
                <div className="login-subtitle">Professor Evaluation System</div>
            </div>
            <div className="login-card">
                <h3 className="login-title">Sign In to Your Account</h3>
                <form onSubmit={handleSubmit} className="login-form">
                    {message && <div className="success-message">{message}</div>}
                    {error && <div className="error-message">{error}</div>}
                    <div className="form-group">
                        <label htmlFor="username" className="login-label">Email Address</label>
                        <div className="input-group">
                            <FaUser className="input-icon" />
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter your email"
                                value={formData.username}
                                onChange={handleChange}
                                disabled={isLoading}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="login-label-row">
                            <label htmlFor="password" className="login-label">Password</label>
                            <button type="button" className="forgot-password-btn">Forgot Password?</button>
                        </div>
                        <div className="input-group">
                            <FaLock className="input-icon" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={isLoading}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={isLoading}
                                title={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
                            </button>
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className={`login-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
                <div className="login-footer">
                    <p>Don't have an account? <Link to="/register" className="register-link">Register Now</Link></p>
                </div>
            </div>
            <div className="login-copyright">
                © 2025 Dr. Yanga College's Inc. All rights reserved.
            </div>
        </div>
    );
};

export default Login; 