import AdminNav from './AdminNav';
import './Settings.css';
import { useNavigate } from 'react-router-dom';
import React, {useEffect} from 'react';

export default function Settings() {
    const nav = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if(token !== 'Admin authenticated successfully.')
      {
          alert("Access Denied")
          nav("/");}
    });
    return (
        <>
            <AdminNav />
            <div className="settings-container">
                <h2>Settings</h2>
                <div className="settings-options">
                    <div className="option">
                        <h3>Profile</h3>
                        {/* Profile settings */}
                    </div>
                    <div className="option">
                        <h3>Notifications</h3>
                        {/* Notification settings */}
                    </div>
                    <div className="option">
                        <h3>Security</h3>
                        {/* Security settings */}
                    </div>
                    <div className="option">
                        <h3>Preferences</h3>
                        {/* Preferences settings */}
                    </div>
                    <div className="option">
                        <h3>Privacy</h3>
                        {/* Privacy settings */}
                    </div>
                    <div className="option">
                        <h3>Appearance</h3>
                        {/* Appearance settings */}
                    </div>
                    <div className="option">
                        <h3>Language</h3>
                        {/* Language settings */}
                    </div>
                </div>
            </div>
        </>
    );
}
