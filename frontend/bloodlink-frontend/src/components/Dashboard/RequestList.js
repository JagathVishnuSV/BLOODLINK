import React from 'react';

const RequestList = ({ requests }) => {
  return (
    <div>
      <h2 className="text-2xl">Nearby Requests</h2>
      <ul>
        {requests.map((request) => (
          <li key={request._id} className="border p-2 mb-2">
            <h3 className="font-bold">{request.patientName}</h3>
            <p>Blood Group: {request.bloodGroup}</p>
            <p>Urgency: {request.urgency}</p>
            <p>Hospital: {request.hospital}</p>
            <p>{request.description}</p>
            <button className="bg-green-500 text-white p-1">Fulfill</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestList;
