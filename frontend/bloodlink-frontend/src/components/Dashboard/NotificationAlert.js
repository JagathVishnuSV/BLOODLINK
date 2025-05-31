import React, { useEffect, useState } from 'react';
import axios from '../../axios';

const NotificationAlert = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="mb-4">
      <h2 className="text-xl">Notifications</h2>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id} className={`border p-2 mb-2 ${notification.isRead ? 'bg-gray-200' : 'bg-yellow-200'}`}>
              <p>{notification.message}</p>
              <button className="text-blue-500" onClick={() => markAsRead(notification._id)}>Mark as Read</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No new notifications</p>
      )}
    </div>
  );
};

const markAsRead = async (id) => {
  try {
    await axios.post(`/notifications/mark-read/${id}`);
    // Optionally, refresh notifications after marking as read
  } catch (error) {
    console.error('Error marking notification as read:', error);
  }
};

export default NotificationAlert;
