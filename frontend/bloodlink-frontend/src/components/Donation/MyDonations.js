import React, { useEffect, useState } from 'react';
import axios from '../../axios';

const MyDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/donations/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDonations(res.data.donations);
      } catch (error) {
        console.error("Failed to fetch donations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading your donations...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold text-red-700 mb-4">My Donations</h2>
      {donations.length === 0 ? (
        <p className="text-gray-600">You haven’t donated yet.</p>
      ) : (
        donations.map((donation) => (
          <div key={donation._id} className="border p-4 rounded mb-3">
            <p><strong>Patient:</strong> {donation.request?.patientName}</p>
            <p><strong>Hospital:</strong> {donation.request?.hospital}</p>
            <p><strong>Blood Group:</strong> {donation.request?.bloodGroup}</p>
            <p><strong>Donated On:</strong> {new Date(donation.createdAt).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyDonations;
