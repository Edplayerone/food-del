import React, { useContext, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import './Profile.css';

const Profile = () => {
  const { url, token } = useContext(StoreContext);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }

    try {
      const response = await axios.post(
        `${url}/api/user/update-password`,
        { oldPassword, newPassword },
        { headers: {
            Authorization: `Bearer ${token}`, // Correct header format
          },  
        }
      );

      setMessage(response.data.message);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error updating password');
    }
  };

  return (
    <div className="profile">
      <h2>Profile Settings</h2>

      <form onSubmit={handlePasswordUpdate}>
        <div className="form-group">
          <label>Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Update Password</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Profile;