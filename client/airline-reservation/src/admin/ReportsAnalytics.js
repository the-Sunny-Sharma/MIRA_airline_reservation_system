import AdminNav from './AdminNav';
import './ReportsAnalytics.css';
import { useNavigate } from 'react-router-dom';
import React, {useEffect} from 'react';

export default function ReportAnalytics() {
    const nav = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if(token !== 'Admin authenticated successfully.')
      {
          alert("Access Denied")
          nav("/");}
    });
    // Dummy data for report analytics
    const analyticsData = {
        totalUsers: 1500,
        activeUsers: 1200,
        inactiveUsers: 300,
        dailyVisits: [400, 350, 420, 380, 410, 390, 430], // Sample data for daily visits
        monthlyRevenue: [25000, 28000, 30000, 27000, 32000, 31000, 33000], // Sample data for monthly revenue
        userStatistics: {
            maleUsers: 700,
            femaleUsers: 800,
            ageGroups: {
                under20: 200,
                '20-30': 600,
                '31-40': 400,
                '41-50': 200,
                over50: 100,
            },
        },
        userActivity: {
            lastLogin: '2023-12-31',
            mostActiveRegion: 'Region A',
            devices: {
                desktop: 800,
                mobile: 600,
                tablet: 100,
            },
        },
        trafficSources: {
            direct: 500,
            organic: 300,
            referral: 200,
        },
        userReports: [
            { id: 1, title: 'User Report 1', description: 'Description for User Report 1' },
            { id: 2, title: 'User Report 2', description: 'Description for User Report 2' },
        ],
        financialReports: [
            { id: 1, title: 'Financial Report 1', description: 'Description for Financial Report 1' },
            { id: 2, title: 'Financial Report 2', description: 'Description for Financial Report 2' },
        ],
    };

    return (
        <>
            <AdminNav />
            <div className="report-analytics-container">
                <h2>Report Analytics</h2>
                <div className="analytics-summary">
                    <div>Total Users: {analyticsData.totalUsers}</div>
                    <div>Active Users: {analyticsData.activeUsers}</div>
                    <div>Inactive Users: {analyticsData.inactiveUsers}</div>
                </div>
                <div className="analytics-charts">
                    {/* Display charts/graphs for daily visits, monthly revenue, user statistics, etc. */}
                </div>
                <div className="user-reports">
                    {/* Display user reports */}
                    {analyticsData.userReports.map((report) => (
                        <div key={report.id} className="report-item">
                            <h3>{report.title}</h3>
                            <p>{report.description}</p>
                        </div>
                    ))}
                </div>
                <div className="financial-reports">
                    {/* Display financial reports */}
                    {analyticsData.financialReports.map((report) => (
                        <div key={report.id} className="report-item">
                            <h3>{report.title}</h3>
                            <p>{report.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
