import React, { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

/**
 * DeleteConfirmModal Component
 * Prompts user for explicit confirmation before removing an employee record.
 */
export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, employee }) {
  // Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !employee) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="modal-container modal-sm" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="delete-icon-badge">
            <AlertTriangle size={24} className="delete-badge-icon" />
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body delete-modal-content">
          <h2 className="modal-title">Delete Employee?</h2>
          <p className="delete-warning-text">
            Are you sure you want to remove <strong>{employee.name}</strong> ({employee.id}) from the employee directory? This action will remove their profile from the dashboard.
          </p>
          <div className="delete-employee-summary">
            <div>
              <span className="summary-label">Department:</span>
              <span className="summary-value">{employee.department}</span>
            </div>
            <div>
              <span className="summary-label">Email:</span>
              <span className="summary-value">{employee.email}</span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            type="button" 
            className="btn btn-danger" 
            onClick={() => onConfirm(employee.id)}
          >
            Yes, Delete Employee
          </button>
        </div>
      </div>
    </div>
  );
}
