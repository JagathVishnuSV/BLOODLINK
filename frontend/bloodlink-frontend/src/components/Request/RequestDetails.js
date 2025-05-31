// src/pages/Requests/RequestDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios';

const RequestDetails = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axios.get(`/requests/${id}`);
        setRequest(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to load request');
      }
    };
    fetchRequest();
  }, [id]);

  if (!request) return <div className="text-center mt-20 text-red-600">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-red-700 mb-4">Request Details</h2>
      <div className="space-y-2">
        <p><strong>Patient Name:</strong> {request.patientName}</p>
        <p><strong>Blood Group:</strong> {request.bloodGroup}</p>
        <p><strong>Hospital:</strong> {request.hospital}</p>
        <p><strong>Contact:</strong> {request.contactNumber}</p>
        <p><strong>Reason:</strong> {request.reason}</p>
        <p><strong>Needed Before:</strong> {new Date(request.neededBefore).toLocaleString()}</p>
        
      </div>
    </div>
  );
};

export default RequestDetails;
