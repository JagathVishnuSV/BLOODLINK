import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from '../../axios';

const UserProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [profileImage, setProfileImage] = useState(user?.profileImage || '');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/users/me', { name, profileImage });
      setUser(response.data);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="p-4">
      <h2 className="text-2xl">Profile</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mb-2"
        required
      />
      <input
        type="text"
        placeholder="Profile Image URL"
        value={profileImage}
        onChange={(e) => setProfileImage(e.target.value)}
        className="border p-2 mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">Update Profile</button>
    </form>
  );
};

export default UserProfile;
