import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    bloodGroup: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/users/me').then(res => {
      setForm({
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone,
        bloodGroup: res.data.bloodGroup
      });
    });
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put('/users/me', form);
      alert('Profile updated!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white mt-10 rounded shadow">
      <h2 className="text-2xl text-red-700 font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'email', 'phone'].map(field => (
          <div key={field}>
            <label className="block text-sm text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>
        ))}
        <div>
          <label className="block text-sm text-gray-700">Blood Group</label>
          <select
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          >
            {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(bg => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
        </div>
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
