import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MentorDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
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
            }
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        }
    };

    useEffect(() => {
        fetchDashboardData(); // Automatically load dashboard data when the component mounts
    }, []);

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h1 className="text-2xl font-bold">Mentor Dashboard</h1>

            {dashboardData ? (
                <div>
                    <p>
                        <strong>Welcome back, {dashboardData.name}!</strong>
                    </p>
                    <p>
                        <strong>Your Upcoming Sessions:</strong> {dashboardData.upcomingSessions || 'No upcoming sessions'}
                    </p>
                    <p>
                        <strong>Total Mentees:</strong> {dashboardData.totalMentees || 'N/A'}
                    </p>
                    <p>
                        <strong>Recent Activities:</strong>
                    </p>
                    <ul className="list-disc pl-5">
                        {dashboardData.recentActivities && dashboardData.recentActivities.length > 0 ? (
                            dashboardData.recentActivities.map((activity, index) => (
                                <li key={index}>{activity}</li>
                            ))
                        ) : (
                            <li>No recent activities</li>
                        )}
                    </ul>
                </div>
            ) : (
                <p>Loading dashboard data...</p>
            )}
        </div>
    );
};

export default MentorDashboard;
