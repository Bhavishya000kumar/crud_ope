import React from 'react';
import { Menu, Bell, Calendar } from 'lucide-react';

/**
 * Navbar Component
 * Renders the top navigation header with mobile toggle, breadcrumbs/title,
 * current date, and quick action icons.
 */
export default function Navbar({ onToggleSidebar }) {
  // Format current friendly date e.g. "Thursday, Oct 22, 2026"
  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <header className="navbar">
      <div className="navbar-left">
        {/* Mobile menu trigger */}
        <button 
          className="menu-toggle-btn" 
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={22} />
        </button>

        <div className="navbar-title-group">
          <h1 className="navbar-title">Employee Directory</h1>
          <p className="navbar-subtitle">View, search, add and manage your company staff</p>
        </div>
      </div>

      <div className="navbar-right">
        {/* Current Date Badge */}
        <div className="date-badge">
          <Calendar size={16} className="date-icon" />
          <span>{formattedDate}</span>
        </div>

        {/* Notifications Icon */}
        <button className="icon-btn" aria-label="Notifications" title="No unread alerts">
          <Bell size={18} />
          <span className="notification-dot" />
        </button>

        {/* Quick User Avatar */}
        <div className="navbar-avatar" title="Signed in as Admin">
          <span>AD</span>
        </div>
      </div>
    </header>
  );
}
