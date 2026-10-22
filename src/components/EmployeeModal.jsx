import React, { useState, useEffect } from 'react';
import { X, User, Mail, Building, DollarSign, Briefcase, AlertCircle } from 'lucide-react';
import { DEPARTMENTS } from '../data/initialEmployees';

/**
 * EmployeeModal Component
 * Handles both "Add Employee" and "Edit Employee" operations with full validation.
 *
 * Props:
 * - isOpen: boolean
 * - onClose: function
 * - onSave: function(employeeData)
 * - employeeToEdit: object | null (if null, modal is in "Add" mode)
 */
export default function EmployeeModal({ isOpen, onClose, onSave, employeeToEdit }) {
  const isEditMode = Boolean(employeeToEdit);

  // Form input state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Engineering',
    role: '',
    salary: ''
  });

  // Validation errors state
  const [errors, setErrors] = useState({});

  // Populate or reset form whenever modal opens or employeeToEdit changes
  useEffect(() => {
    if (employeeToEdit) {
      setFormData({
        name: employeeToEdit.name || '',
        email: employeeToEdit.email || '',
        department: employeeToEdit.department || 'Engineering',
        role: employeeToEdit.role || '',
        salary: employeeToEdit.salary ? String(employeeToEdit.salary) : ''
      });
    } else {
      setFormData({
        name: '',
        email: '',
        department: 'Engineering',
        role: '',
        salary: ''
      });
    }
    setErrors({});
  }, [employeeToEdit, isOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Handle input change and clear field errors dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear specific error as user types
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  // Comprehensive Form Validation
  const validateForm = () => {
    const newErrors = {};

    // 1. Name validation: required, at least 2 characters
    if (!formData.name.trim()) {
      newErrors.name = 'Employee full name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long.';
    }

    // 2. Email validation: required & standard email pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@company.com).';
    }

    // 3. Department validation: required
    if (!formData.department) {
      newErrors.department = 'Please select a department.';
    }

    // 4. Salary validation: required, numeric, positive
    if (!formData.salary.toString().trim()) {
      newErrors.salary = 'Annual salary is required.';
    } else {
      const numSalary = Number(formData.salary);
      if (isNaN(numSalary) || numSalary <= 0) {
        newErrors.salary = 'Salary must be a positive number greater than 0.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Prepare cleaned payload
    const payload = {
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      salary: Number(formData.salary),
      role: formData.role.trim() || `${formData.department} Specialist`
    };

    onSave(payload);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="modal-container" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">
              {isEditMode ? 'Edit Employee Details' : 'Add New Employee'}
            </h2>
            <p className="modal-subtitle">
              {isEditMode 
                ? 'Update the employee information and save changes.' 
                : 'Fill in the information below to add a new team member.'}
            </p>
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

        {/* Modal Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name <span className="required-star">*</span>
              </label>
              <div className={`input-wrapper ${errors.name ? 'input-error' : ''}`}>
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={handleChange}
                  autoFocus
                />
              </div>
              {errors.name && (
                <div className="form-error-message">
                  <AlertCircle size={14} />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            {/* Email Address */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address <span className="required-star">*</span>
              </label>
              <div className={`input-wrapper ${errors.email ? 'input-error' : ''}`}>
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="e.g. sarah.jenkins@company.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && (
                <div className="form-error-message">
                  <AlertCircle size={14} />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* Department & Role (Two Columns on Desktop) */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="department" className="form-label">
                  Department <span className="required-star">*</span>
                </label>
                <div className={`input-wrapper ${errors.department ? 'input-error' : ''}`}>
                  <Building size={18} className="input-icon" />
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  >
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.department && (
                  <div className="form-error-message">
                    <AlertCircle size={14} />
                    <span>{errors.department}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="role" className="form-label">
                  Job Role / Title <span className="optional-tag">(Optional)</span>
                </label>
                <div className="input-wrapper">
                  <Briefcase size={18} className="input-icon" />
                  <input
                    type="text"
                    id="role"
                    name="role"
                    placeholder="e.g. Lead Designer"
                    value={formData.role}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Annual Salary */}
            <div className="form-group">
              <label htmlFor="salary" className="form-label">
                Annual Salary (USD) <span className="required-star">*</span>
              </label>
              <div className={`input-wrapper ${errors.salary ? 'input-error' : ''}`}>
                <DollarSign size={18} className="input-icon" />
                <input
                  type="number"
                  id="salary"
                  name="salary"
                  placeholder="e.g. 85000"
                  min="0"
                  step="1000"
                  value={formData.salary}
                  onChange={handleChange}
                />
              </div>
              {errors.salary && (
                <div className="form-error-message">
                  <AlertCircle size={14} />
                  <span>{errors.salary}</span>
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer / Actions */}
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              {isEditMode ? 'Save Changes' : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
