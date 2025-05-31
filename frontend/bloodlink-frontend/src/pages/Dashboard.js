// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Search, Clock, User, MapPin, Plus, ChevronDown, Globe, AlertTriangle, Droplet } from 'lucide-react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate(); 
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(undefined);       // undefined = loading, null = error/no auth
  const [activeTab, setActiveTab] = useState('nearby');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ bloodGroup: '', urgency: '' });
  const [requests, setRequests] = useState([]);      // data for current tab
  const [myRequests, setMyRequests] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Token being sent:', localStorage.getItem('token'));
    axios.get('/users/me')
      .then(({ data }) => setUser(data))
      .catch(() => setUser(null))
  }, []);

  
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(p => {
      setCoords({ lat: p.coords.latitude, lng: p.coords.longitude });
      console.log({ latitude: p.coords.latitude, longitude: p.coords.longitude });
    });
  }, []);

  
  useEffect(() => {
    if (user === undefined) return; // still loading
    if (user === null) return;      // no auth

    const fetchTab = async () => {
      setLoading(true);
      setError('');
      try {
        if (activeTab === 'nearby' && coords.lat) {
          const res = await axios.get('/requests/nearby', {
            params: { latitude: coords.lat, longitude: coords.lng }
          });
          setRequests(res.data.requests || res.data);
        }
        if (activeTab === 'all') {
          // we don't have GET /requests — fall back to search without filters
          const res = await axios.get('/requests/search', { params: {} });
          setRequests(res.data);
        }
        if (activeTab === 'my-requests') {
          const res = await axios.get('/requests/me');
          setMyRequests(res.data.requests || res.data);
        }
        if (activeTab === 'search') {
          // keep existing searchResults
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchTab();
  }, [activeTab, user, coords]);

  
  const handleSearch = async e => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('/requests/search', {
        params: {
          hospital: searchTerm,
          bloodGroup: filters.bloodGroup,
          urgency: filters.urgency
        }
      });
      setSearchResults(res.data);
      setActiveTab('search');
    } catch {
      setError('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDonate = async (requestId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/donations", { requestId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Thank you for your donation! 🎉");
    } catch (error) {
      console.error("Donation failed:", error);
      alert(error.response?.data?.message || "Something went wrong.");
    }
  };

  
  const handleFulfillRequest = async id => {
    try {
      await axios.put(`/requests/${id}/fulfill`);
      // refresh the tab
      setActiveTab('nearby'); // or keep same, then trigger useEffect
    } catch {
      setError('Failed to mark fulfilled');
    }
  };

  // Pick which list to display
  const displayData = activeTab === 'my-requests'
    ? myRequests
    : activeTab === 'search'
      ? searchResults
      : requests;

  
  if (user === undefined) return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="animate-pulse flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <Droplet className="text-red-500" size={24} />
        </div>
        <div className="text-red-600 font-semibold">Loading BloodLink...</div>
      </div>
    </div>
  );
  
  if (user === null) return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center">
        <AlertTriangle size={48} className="mx-auto mb-4 text-red-500" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Authentication Required</h2>
        <p className="text-gray-600 mb-6">You need to sign in to access the dashboard.</p>
        <button 
          onClick={() => navigate('/login')}
          className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200 shadow-md hover:shadow-lg w-full"
        >
          Sign In
        </button>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white p-4 transition-all duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header with Logo and Profile */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Droplet className="text-red-600 mr-2" size={24} />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-red-500">BloodLink</h1>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md text-red-600 hover:bg-red-50 transition-all duration-200 border border-red-100"
            >
              <User size={18} className="text-red-500" />
              <span>{user.name}</span>
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-3 w-72 bg-white shadow-xl rounded-xl p-6 z-50 border border-red-100 transition-all duration-300 transform origin-top-right animate-in fade-in-50 slide-in-from-top-5">
                <div className="flex items-center mb-4">
                  <div className="bg-red-100 p-3 rounded-full">
                    <User size={24} className="text-red-600" />
                  </div>
                  <div className="ml-3">
                    <h2 className="text-lg font-bold text-gray-800">{user.name}</h2>
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {user.bloodGroup}
                    </div>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-sm flex items-center text-gray-600">
                    <span className="font-medium w-16">Email:</span> 
                    <span className="text-gray-700">{user.email}</span>
                  </p>
                  <p className="text-sm flex items-center text-gray-600">
                    <span className="font-medium w-16">Phone:</span> 
                    <span className="text-gray-700">{user.phone}</span>
                  </p>
                </div>
                
                {user.badges && user.badges.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Badges</p>
                    <div className="flex flex-wrap gap-2">
                      {user.badges.map((b, i) => (
                        <span key={i} className="bg-gradient-to-r from-red-100 to-red-50 text-red-700 text-xs px-2 py-1 rounded-full border border-red-200">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-2.5 rounded-lg hover:from-red-700 hover:to-red-600 transition-all duration-200 font-medium flex items-center justify-center"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md mb-6 flex items-center animate-in slide-in-from-top duration-300">
            <AlertTriangle className="mr-3 flex-shrink-0 text-red-500" /> 
            <p>{error}</p>
          </div>
        )}

        {/* Search & Filters */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6 transition-all duration-300">
          <form onSubmit={handleSearch} className="flex flex-wrap gap-3">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-400" size={18} />
              </div>
              <input
                type="text"
                placeholder="Search by city…"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all duration-200"
              />
            </div>
            <button 
              type="submit" 
              className="bg-gradient-to-r from-red-600 to-red-500 text-white px-5 py-2.5 rounded-lg hover:from-red-700 hover:to-red-600 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="border border-gray-200 px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-all duration-200 font-medium text-gray-700"
            >
              Filters <ChevronDown size={16} className={`transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            {showFilters && (
              <div className="w-full mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in-50 slide-in-from-top-2 duration-200">
                <div className="relative">
                  <select
                    value={filters.bloodGroup}
                    onChange={e => setFilters(f=>({...f,bloodGroup:e.target.value}))}
                    className="w-full py-2.5 pl-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none appearance-none bg-white transition-all duration-200"
                  >
                    <option value="">All Blood Groups</option>
                    {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(g=>(
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <ChevronDown size={16} />
                  </div>
                </div>
                
                <div className="relative">
                  <select
                    value={filters.urgency}
                    onChange={e => setFilters(f=>({...f,urgency:e.target.value}))}
                    className="w-full py-2.5 pl-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none appearance-none bg-white transition-all duration-200"
                  >
                    <option value="">All Urgencies</option>
                    <option value="critical">Critical</option>
                    <option value="urgent">Urgent</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6 flex overflow-x-auto transition-all duration-300">
          <button
            onClick={()=>setActiveTab('nearby')}
            className={`px-6 py-4 flex items-center gap-2 font-medium transition-all duration-200 ${
              activeTab==='nearby'
                ? 'border-b-2 border-red-500 text-red-600 bg-red-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <MapPin size={18} className={activeTab==='nearby' ? 'text-red-500' : 'text-gray-500'} />
            Nearby
          </button>
          
          <button
            onClick={()=>setActiveTab('all')}
            className={`px-6 py-4 flex items-center gap-2 font-medium transition-all duration-200 ${
              activeTab==='all'
                ? 'border-b-2 border-red-500 text-red-600 bg-red-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Globe size={18} className={activeTab==='all' ? 'text-red-500' : 'text-gray-500'} />
            All
          </button>
          
          <button
            onClick={()=>setActiveTab('my-requests')}
            className={`px-6 py-4 flex items-center gap-2 font-medium transition-all duration-200 ${
              activeTab==='my-requests'
                ? 'border-b-2 border-red-500 text-red-600 bg-red-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Clock size={18} className={activeTab==='my-requests' ? 'text-red-500' : 'text-gray-500'} />
            Mine
          </button>
          
          <button
            onClick={() => navigate('/new-request')}
            className="ml-auto px-6 py-4 flex items-center gap-2 font-medium text-white bg-gradient-to-r from-red-600 to-red-500 rounded-tr-xl hover:from-red-700 hover:to-red-600 transition-all duration-200">
            <Plus size={18} />
            New Request
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-red-100 animate-pulse"></div>
              <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-t-4 border-red-600 animate-spin"></div>
            </div>
          </div>
        )}

        {/* List */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {displayData.length === 0 ? (
              <div className="col-span-full p-12 flex flex-col items-center justify-center bg-white rounded-xl shadow-md">
                <div className="text-gray-300 mb-4">
                  <Droplet size={64} />
                </div>
                <p className="text-gray-500 text-lg font-medium">No requests found</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
              </div>
            ) : (
              displayData.map(r => (
                <div key={r._id} className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                  <div className={`p-2 text-white text-center font-medium ${
                    r.urgency==='critical' ? 'bg-gradient-to-r from-red-700 to-red-600' :
                    r.urgency==='urgent'   ? 'bg-gradient-to-r from-orange-600 to-orange-500' :
                    r.urgency==='medium'   ? 'bg-gradient-to-r from-yellow-600 to-yellow-500' : 
                                            'bg-gradient-to-r from-green-600 to-green-500'
                  }`}>
                    {r.urgency || 'normal'}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">{r.patientName || r.name}</h3>
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin size={14} className="mr-1 text-gray-400" />
                          {r.hospital}
                        </p>
                      </div>
                      <span className="bg-gradient-to-r from-red-100 to-red-50 text-red-700 font-bold px-3 py-1 rounded-full border border-red-200">
                        {r.bloodGroup}
                      </span>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                      <p className="text-sm text-gray-500">
                        {r.createdAt && `Requested: ${new Date(r.createdAt).toLocaleDateString()}`}
                      </p>
                    </div>
                    
                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={()=>window.location.href=`/requests/${r._id}`}
                        className="flex-1 border border-gray-200 px-4 py-2.5 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200"
                      >View Details</button>
                      
                      {(activeTab!=='my-requests') && (
                        <button
                          onClick={()=>handleDonate(r._id)}
                          className="flex-1 bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2.5 rounded-lg font-medium hover:from-red-700 hover:to-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
                        >Donated</button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;