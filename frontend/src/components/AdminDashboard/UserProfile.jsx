import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Lock, 
  Edit2, 
  Save, 
  X, 
  Camera, 
  Key,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const UserProfile = ({ isOpen, onClose, userData, displayMode = "modal" }) => {
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    joinDate: '',
    avatar: null,
    password: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (userData) {
      setProfileData({
        name: userData.name || 'Admin User',
        email: userData.email || 'admin@dyci.edu.ph',
        phone: userData.phone || '+63 912 345 6789',
        department: userData.department || 'IT Department',
        position: userData.position || 'Administrator',
        joinDate: userData.joinDate || '2023-01-15',
        avatar: userData.avatar || null,
        password: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData({
          ...profileData,
          avatar: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Password validation if changing password
    if (profileData.newPassword) {
      if (profileData.newPassword !== profileData.confirmPassword) {
        setErrorMessage("New passwords don't match");
        return;
      }
      
      if (profileData.newPassword.length < 8) {
        setErrorMessage("New password must be at least 8 characters");
        return;
      }
    }
    
    // Success - would normally save to backend
    setSuccessMessage("Profile updated successfully!");
    setErrorMessage('');
    setEditMode(false);
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const cancelEdit = () => {
    setEditMode(false);
    setErrorMessage('');
    
    // Reset to original data
    if (userData) {
      setProfileData({
        name: userData.name || 'Admin User',
        email: userData.email || 'admin@dyci.edu.ph',
        phone: userData.phone || '+63 912 345 6789',
        department: userData.department || 'IT Department',
        position: userData.position || 'Administrator',
        joinDate: userData.joinDate || '2023-01-15',
        avatar: userData.avatar || null,
        password: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  };

  if (!isOpen) return null;

  // For inline mode with simplified design
  if (displayMode === "inline") {
    return (
      <div className="user-profile-inline">
        {successMessage && (
          <div className="success-message">
            <CheckCircle size={18} />
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="error-message">
            <AlertCircle size={18} />
            {errorMessage}
          </div>
        )}

        {!editMode ? (
          <div className="simple-profile-view">
            <div className="profile-header">
              <div className="avatar-section">
                {profileData.avatar ? (
                  <img src={profileData.avatar} alt="User avatar" className="user-avatar" />
                ) : (
                  <div className="avatar-placeholder">
                    {profileData.name.split(' ').map(name => name[0]).join('').toUpperCase()}
                  </div>
                )}
                <div className="user-info">
                  <h3>{profileData.name}</h3>
                  <p className="user-position">{profileData.position}</p>
                </div>
              </div>
              <button 
                className="edit-profile-button"
                onClick={() => setEditMode(true)}
              >
                <Edit2 size={16} /> Edit Profile
              </button>
            </div>

            <div className="profile-info-section">
              <h3>Personal Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-label">
                    <User size={16} /> Full Name
                  </div>
                  <div className="info-value">{profileData.name}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">
                    <Mail size={16} /> Email Address
                  </div>
                  <div className="info-value">{profileData.email}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">
                    <Phone size={16} /> Phone Number
                  </div>
                  <div className="info-value">{profileData.phone}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">
                    <MapPin size={16} /> Department
                  </div>
                  <div className="info-value">{profileData.department}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">
                    <User size={16} /> Position
                  </div>
                  <div className="info-value">{profileData.position}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">
                    <Calendar size={16} /> Join Date
                  </div>
                  <div className="info-value">
                    {new Date(profileData.joinDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="profile-edit-form">
            <div className="profile-header">
              <div className="avatar-section">
                <div className="profile-avatar">
                  {profileData.avatar ? (
                    <img src={profileData.avatar} alt="User avatar" />
                  ) : (
                    <div className="avatar-placeholder">
                      {profileData.name.split(' ').map(name => name[0]).join('').toUpperCase()}
                    </div>
                  )}
                  <label className="avatar-upload-button">
                    <Camera size={16} />
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange} 
                      style={{ display: 'none' }} 
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="profile-info-section">
              <h3>Personal Information</h3>
              <div className="edit-form-grid">
                <div className="form-group">
                  <label>
                    <User size={16} /> Full Name
                  </label>
                  <input 
                    type="text" 
                    name="name" 
                    value={profileData.name} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>
                    <Mail size={16} /> Email Address
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    value={profileData.email} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>
                    <Phone size={16} /> Phone Number
                  </label>
                  <input 
                    type="text" 
                    name="phone" 
                    value={profileData.phone} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="form-group">
                  <label>
                    <MapPin size={16} /> Department
                  </label>
                  <input 
                    type="text" 
                    name="department" 
                    value={profileData.department} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>
                    <User size={16} /> Position
                  </label>
                  <input 
                    type="text" 
                    name="position" 
                    value={profileData.position} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>
                    <Calendar size={16} /> Join Date
                  </label>
                  <input 
                    type="date" 
                    name="joinDate" 
                    value={profileData.joinDate} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>

              <h3>Change Password</h3>
              <div className="edit-form-grid">
                <div className="form-group">
                  <label>
                    <Lock size={16} /> Current Password
                  </label>
                  <input 
                    type="password" 
                    name="password" 
                    value={profileData.password} 
                    onChange={handleInputChange} 
                    placeholder="Enter current password" 
                  />
                </div>
                <div className="form-group">
                  <label>
                    <Key size={16} /> New Password
                  </label>
                  <input 
                    type="password" 
                    name="newPassword" 
                    value={profileData.newPassword} 
                    onChange={handleInputChange} 
                    placeholder="Enter new password" 
                  />
                </div>
                <div className="form-group">
                  <label>
                    <Key size={16} /> Confirm New Password
                  </label>
                  <input 
                    type="password" 
                    name="confirmPassword" 
                    value={profileData.confirmPassword} 
                    onChange={handleInputChange} 
                    placeholder="Confirm new password" 
                  />
                </div>
              </div>
            </div>

            <div className="profile-action-buttons">
              <button 
                type="button" 
                className="cancel-button" 
                onClick={cancelEdit}
              >
                <X size={16} /> Cancel
              </button>
              <button 
                type="submit" 
                className="save-button"
              >
                <Save size={16} /> Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }

  // Original modal layout
  return (
    <div className="user-profile-overlay">
      <div className="user-profile-container">
        <div className="user-profile-header">
          <h2>Account Profile</h2>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {successMessage && (
          <div className="success-message">
            <CheckCircle size={18} />
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="error-message">
            <AlertCircle size={18} />
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="profile-content">
            <div className="profile-avatar-section">
              <div className="profile-avatar">
                {profileData.avatar ? (
                  <img src={profileData.avatar} alt="User avatar" />
                ) : (
                  <div className="avatar-placeholder">
                    {profileData.name.split(' ').map(name => name[0]).join('').toUpperCase()}
                  </div>
                )}
                {editMode && (
                  <label className="avatar-upload-button">
                    <Camera size={16} />
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange} 
                      style={{ display: 'none' }} 
                    />
                  </label>
                )}
              </div>
              <h3>{profileData.name}</h3>
              <p className="profile-position">{profileData.position}</p>
              
              {!editMode && (
                <button 
                  type="button" 
                  className="edit-profile-button"
                  onClick={() => setEditMode(true)}
                >
                  <Edit2 size={16} /> Edit Profile
                </button>
              )}
            </div>

            <div className="profile-details-section">
              <div className="profile-info-container">
                <h3>Personal Information</h3>
                
                <div className="profile-info-group">
                  <label>
                    <User size={16} /> Full Name
                  </label>
                  {editMode ? (
                    <input 
                      type="text" 
                      name="name" 
                      value={profileData.name} 
                      onChange={handleInputChange} 
                      required 
                    />
                  ) : (
                    <p>{profileData.name}</p>
                  )}
                </div>
                
                <div className="profile-info-group">
                  <label>
                    <Mail size={16} /> Email Address
                  </label>
                  {editMode ? (
                    <input 
                      type="email" 
                      name="email" 
                      value={profileData.email} 
                      onChange={handleInputChange} 
                      required 
                    />
                  ) : (
                    <p>{profileData.email}</p>
                  )}
                </div>
                
                <div className="profile-info-group">
                  <label>
                    <Phone size={16} /> Phone Number
                  </label>
                  {editMode ? (
                    <input 
                      type="text" 
                      name="phone" 
                      value={profileData.phone} 
                      onChange={handleInputChange} 
                    />
                  ) : (
                    <p>{profileData.phone}</p>
                  )}
                </div>
                
                <div className="profile-info-group">
                  <label>
                    <MapPin size={16} /> Department
                  </label>
                  {editMode ? (
                    <input 
                      type="text" 
                      name="department" 
                      value={profileData.department} 
                      onChange={handleInputChange} 
                      required 
                    />
                  ) : (
                    <p>{profileData.department}</p>
                  )}
                </div>
                
                <div className="profile-info-group">
                  <label>
                    <User size={16} /> Position
                  </label>
                  {editMode ? (
                    <input 
                      type="text" 
                      name="position" 
                      value={profileData.position} 
                      onChange={handleInputChange} 
                      required 
                    />
                  ) : (
                    <p>{profileData.position}</p>
                  )}
                </div>
                
                <div className="profile-info-group">
                  <label>
                    <Calendar size={16} /> Join Date
                  </label>
                  {editMode ? (
                    <input 
                      type="date" 
                      name="joinDate" 
                      value={profileData.joinDate} 
                      onChange={handleInputChange} 
                    />
                  ) : (
                    <p>{new Date(profileData.joinDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  )}
                </div>
              </div>

              {editMode && (
                <div className="profile-info-container">
                  <h3>Change Password</h3>
                  
                  <div className="profile-info-group">
                    <label>
                      <Lock size={16} /> Current Password
                    </label>
                    <input 
                      type="password" 
                      name="password" 
                      value={profileData.password} 
                      onChange={handleInputChange} 
                      placeholder="Enter current password" 
                    />
                  </div>
                  
                  <div className="profile-info-group">
                    <label>
                      <Key size={16} /> New Password
                    </label>
                    <input 
                      type="password" 
                      name="newPassword" 
                      value={profileData.newPassword} 
                      onChange={handleInputChange} 
                      placeholder="Enter new password" 
                    />
                  </div>
                  
                  <div className="profile-info-group">
                    <label>
                      <Key size={16} /> Confirm New Password
                    </label>
                    <input 
                      type="password" 
                      name="confirmPassword" 
                      value={profileData.confirmPassword} 
                      onChange={handleInputChange} 
                      placeholder="Confirm new password" 
                    />
                  </div>
                  
                  <p className="password-hint">
                    <AlertCircle size={14} /> Leave password fields empty if you don't want to change it
                  </p>
                </div>
              )}
            </div>
          </div>

          {editMode && (
            <div className="profile-action-buttons">
              <button 
                type="button" 
                className="cancel-button" 
                onClick={cancelEdit}
              >
                <X size={16} /> Cancel
              </button>
              <button 
                type="submit" 
                className="save-button"
              >
                <Save size={16} /> Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserProfile; 