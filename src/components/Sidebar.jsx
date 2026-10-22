import React from 'react';
import { 
  Users, 
  LayoutDashboard, 
  Building2, 
  DollarSign, 
  BarChart3, 
  Settings, 
  X,
  ShieldCheck
} from 'lucide-react';

/**
 * Sidebar Component
 * Renders the persistent left navigation with logo, main links, and user info.
 * Includes mobile open/close support.
 */
export default function Sidebar({ isOpen, onClose }) {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: false },
    { name: 'Employees', icon: Users, active: true },
    { name: 'Departments', icon: Building2, active: false },
    { name: 'Payroll', icon: DollarSign, active: false },
    { name: 'Reports', icon: BarChart3, active: false },
    { name: 'Settings', icon: Settings, active: false },
  ];

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && (
        <div 
          className="sidebar-backdrop" 
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        {/* Sidebar Header / Logo */}
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="brand-icon-wrapper">
              <Users className="brand-icon" size={22} />
            </div>
            <div className="brand-text">
              <span className="brand-name">StaffSync</span>
              <span className="brand-tag">HR Portal</span>
            </div>
          </div>

          {/* Close button for mobile screens */}
          <button 
            className="mobile-close-btn" 
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <span className="nav-section-label">MAIN MENU</span>
          <ul className="nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <button 
                    className={`nav-item-btn ${item.active ? 'nav-item-active' : ''}`}
                    onClick={(e) => {
                      if (!item.active) {
                        e.preventDefault();
                        // For demo, notify only
                      }
                      if (window.innerWidth <= 768) {
                        onClose();
                      }
                    }}
                  >
                    <Icon size={19} className="nav-icon" />
                    <span>{item.name}</span>
                    {item.active && <span className="nav-active-pill" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer / User Profile Card */}
        <div className="sidebar-footer">
          <div className="user-profile-card">
            <div className="user-avatar">
              <span>AD</span>
              <span className="online-indicator" />
            </div>
            <div className="user-info">
              <div className="user-name-row">
                <span className="user-name">Admin User</span>
                <ShieldCheck size={14} className="verified-badge" />
              </div>
              <span className="user-role">HR Administrator</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
