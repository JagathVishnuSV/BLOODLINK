import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import EditProfile from './pages/EditProfile';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import NotFound from './pages/NotFound';
import Verify from './components/Auth/Verify';
import MyDonations from './components/Donation/MyDonations';
import NewRequest from './components/Request/NewRequest';
import RequestDetails from './components/Request/RequestDetails';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<EditProfile />} />
          <Route path="/donations" element={<MyDonations />} />
          <Route path="/new-request" element={<NewRequest />} />
          <Route path="/requests/:id" element={<RequestDetails />} /> 
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
