import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const NewRequest = () => {
  const token = localStorage.getItem('token');
  const decoded = token ? jwtDecode(token) : null;
  const requester = decoded?.userId;

  const [form, setForm] = useState({
    patientName: '',
    bloodGroup: '',
    unitsNeeded: 1,
    hospital: '',
    contactNumber: '',
    reason: '',
    address: '',
    latitude: '',
    longitude: '',
    neededBefore: ''
  });

  const navigate = useNavigate();

  // Auto-fill location using browser geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setForm((prev) => ({
            ...prev,
            latitude: pos.coords.latitude.toString(),
            longitude: pos.coords.longitude.toString(),
          }));
        },
        (err) => {
          console.warn('Geolocation error:', err);
        }
      );
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = new Date();
    const neededBy = new Date(form.neededBefore);
    const hoursDiff = (neededBy - now) / (1000 * 60 * 60); // in hours

    let calculatedUrgency = 'normal';
    if (hoursDiff <= 6) calculatedUrgency = 'critical';
    else if (hoursDiff <= 24) calculatedUrgency = 'urgent';
    else if (hoursDiff <= 72) calculatedUrgency = 'medium';

    if (isNaN(hoursDiff) || hoursDiff <= 0) {
      alert('Invalid needed before date/time.');
      return;
    }

    const payload = {
      patientName: form.patientName,
      bloodGroup: form.bloodGroup,
      unitsNeeded: parseInt(form.unitsNeeded),
      hospital: form.hospital,
      contactNumber: form.contactNumber,
      reason: form.reason,
      location: {
        address: form.address,
        coordinates: [parseFloat(form.longitude), parseFloat(form.latitude)],
      },
      neededBefore: form.neededBefore,
      urgency: calculatedUrgency,
      requester: requester
    };

    try {
      await axios.post('/requests', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(`Request submitted successfully as "${calculatedUrgency.toUpperCase()}"`);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      const backendMsg = err?.response?.data?.message;
      alert('Failed to create request' + (backendMsg ? `: ${backendMsg}` : ''));
    }
  };

  return (
  <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">
    <h2 className="text-2xl font-semibold mb-4 text-red-700">New Blood Request</h2>
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Only show user-facing fields */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Patient Name</label>
        <input
          type="text"
          name="patientName"
          value={form.patientName}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Blood Group</label>
        <input
          type="text"
          name="bloodGroup"
          value={form.bloodGroup}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Units Needed</label>
        <input
          type="number"
          name="unitsNeeded"
          value={form.unitsNeeded}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          min={1}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Hospital</label>
        <input
          type="text"
          name="hospital"
          value={form.hospital}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Contact Number</label>
        <input
          type="text"
          name="contactNumber"
          value={form.contactNumber}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Reason</label>
        <input
          type="text"
          name="reason"
          value={form.reason}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Needed Before</label>
        <input
          type="datetime-local"
          name="neededBefore"
          value={form.neededBefore}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
      </div>
      <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">Submit</button>
    </form>
  </div>
);
};

export default NewRequest;