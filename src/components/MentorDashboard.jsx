import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MentorDashboard.css';
const MentorDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [sessionRequests, setSessionRequests] = useState([]);
    const navigate = useNavigate();

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:3001/dashboard-mentor', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            if (!res.ok) {
                navigate('/login');
            } else {
                setDashboardData(data);
                setSessionRequests(data.sessionRequests || []);
            }
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const handleApproveRequest = async (requestId) => {
        try {
            // API call to approve the session request
            await fetch(`http://localhost:3001/approve-session/${requestId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            // Google Calendar API integration (after approval)
            await addToGoogleCalendar(requestId);

            // Refresh session requests after approval
            fetchDashboardData();
        } catch (error) {
            console.error('Error approving session:', error);
        }
    };

    const addToGoogleCalendar = async (requestId) => {
        // Placeholder for actual Google Calendar API integration
        console.log(`Adding session ${requestId} to Google Calendar`);
        // You will need to handle the Google Calendar API integration here
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h1 className="text-2xl font-bold">Mentor Dashboard</h1>

            <div className="flex flex-row space-x-4">
                {/* Left column - Session Requests */}
                <div className="w-1/2 bg-gray-100 p-4 rounded-md">
                    <h2 className="text-xl font-bold mb-4">Session Requests</h2>
                    {sessionRequests.length > 0 ? (
                        <ul>
                            {sessionRequests.map((request, index) => (
                                <li key={index} className="mb-4">
                                    <div className="flex justify-between">
                                        <span>{request.menteeName} - {request.sessionTime}</span>
                                        <button
                                            onClick={() => handleApproveRequest(request.id)}
                                            className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
                                        >
                                            Approve
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No pending session requests</p>
                    )}
                </div>

                {/* Right column - Google Calendar */}
                <div className="w-1/2">
                    <iframe
                        src="https://calendar.google.com/calendar/embed?src=your_calendar_id&ctz=your_timezone"
                        style={{ border: 0 }}
                        width="100%"
                        height="400"
                        frameBorder="0"
                        scrolling="no"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default MentorDashboard;
