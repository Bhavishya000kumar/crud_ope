import React from 'react';
import { 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Filter, 
  X, 
  UserX, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { DEPARTMENTS } from '../data/initialEmployees';

/**
 * EmployeeTable Component
 * Renders the top search bar, department filter, "Add Employee" button,
 * and the responsive employee data table with edit/delete actions.
 */
export default function EmployeeTable({
  employees,
  totalCount,
  searchTerm,
  onSearchChange,
  departmentFilter,
  onDepartmentChange,
  onOpenAddModal,
  onOpenEditModal,
  onOpenDeleteModal,
  onResetData
}) {
  // Department color palette generator for badges
  const getDepartmentBadgeStyle = (dept) => {
    switch (dept) {
      case 'Engineering':
        return { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' };
      case 'Design':
        return { bg: '#faf5ff', color: '#7e22ce', border: '#e9d5ff' };
      case 'Product':
        return { bg: '#fdf4ff', color: '#a21caf', border: '#f5d0fe' };
      case 'Marketing':
        return { bg: '#fff1f2', color: '#be123c', border: '#fecdd3' };
      case 'Human Resources':
        return { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0' };
      case 'Finance':
        return { bg: '#fefce8', color: '#a16207', border: '#fef08a' };
      case 'Sales':
        return { bg: '#ecfeff', color: '#0e7490', border: '#a5f3fc' };
      default:
        return { bg: '#f1f5f9', color: '#334155', border: '#cbd5e1' };
    }
  };

  // Helper to get initials from employee name
  const getInitials = (name) => {
    if (!name) return 'EP';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  // Currency formatter
  const formatSalary = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <section className="table-section-card">
      {/* Table Toolbar: Search, Filters, and Add Button */}
      <div className="table-toolbar">
        <div className="toolbar-left">
          {/* Search Box */}
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search employees by name..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search employees by name"
            />
            {searchTerm && (
              <button 
                className="search-clear-btn" 
                onClick={() => onSearchChange('')}
                aria-label="Clear search query"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Department Filter Dropdown */}
          <div className="filter-dropdown-wrapper">
            <Filter size={16} className="filter-icon" />
            <select
              className="filter-select"
              value={departmentFilter}
              onChange={(e) => onDepartmentChange(e.target.value)}
              aria-label="Filter by department"
            >
              <option value="ALL">All Departments</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="toolbar-right">
          {/* Add Employee Button */}
          <button 
            type="button" 
            className="btn btn-primary add-employee-btn"
            onClick={onOpenAddModal}
          >
            <Plus size={18} />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      {/* Meta status summary */}
      <div className="table-meta-bar">
        <span className="results-count">
          Showing <strong>{employees.length}</strong> of <strong>{totalCount}</strong> employees
        </span>

        {(searchTerm || departmentFilter !== 'ALL') && (
          <div className="active-filters-row">
            <span className="filter-tag-label">Active filters:</span>
            {searchTerm && (
              <span className="filter-tag">
                Name: "{searchTerm}"
                <button onClick={() => onSearchChange('')}>×</button>
              </span>
            )}
            {departmentFilter !== 'ALL' && (
              <span className="filter-tag">
                Dept: {departmentFilter}
                <button onClick={() => onDepartmentChange('ALL')}>×</button>
              </span>
            )}
            <button 
              className="clear-all-filters-btn"
              onClick={() => {
                onSearchChange('');
                onDepartmentChange('ALL');
              }}
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Table Container */}
      <div className="table-responsive-wrapper">
        <table className="employee-table">
          <thead>
            <tr>
              <th scope="col" className="th-id">Employee ID</th>
              <th scope="col" className="th-name">Employee</th>
              <th scope="col" className="th-email">Email</th>
              <th scope="col" className="th-dept">Department</th>
              <th scope="col" className="th-salary">Annual Salary</th>
              <th scope="col" className="th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => {
                const badgeStyle = getDepartmentBadgeStyle(employee.department);
                return (
                  <tr key={employee.id} className="employee-row">
                    {/* ID */}
                    <td className="td-id">
                      <span className="id-badge">{employee.id}</span>
                    </td>

                    {/* Name + Avatar + Role */}
                    <td className="td-name">
                      <div className="employee-info-cell">
                        <div className="table-avatar">
                          {getInitials(employee.name)}
                        </div>
                        <div className="name-role-group">
                          <span className="employee-name">{employee.name}</span>
                          <span className="employee-role">{employee.role || employee.department}</span>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="td-email">
                      <span className="employee-email">{employee.email}</span>
                    </td>

                    {/* Department */}
                    <td className="td-dept">
                      <span 
                        className="dept-badge"
                        style={{
                          backgroundColor: badgeStyle.bg,
                          color: badgeStyle.color,
                          borderColor: badgeStyle.border
                        }}
                      >
                        {employee.department}
                      </span>
                    </td>

                    {/* Salary */}
                    <td className="td-salary">
                      <span className="salary-text">{formatSalary(employee.salary)}</span>
                    </td>

                    {/* Actions: Edit & Delete */}
                    <td className="td-actions">
                      <div className="action-buttons-group">
                        <button
                          type="button"
                          className="action-btn edit-action-btn"
                          title={`Edit ${employee.name}`}
                          onClick={() => onOpenEditModal(employee)}
                          aria-label={`Edit ${employee.name}`}
                        >
                          <Edit3 size={16} />
                          <span className="action-btn-text">Edit</span>
                        </button>
                        <button
                          type="button"
                          className="action-btn delete-action-btn"
                          title={`Delete ${employee.name}`}
                          onClick={() => onOpenDeleteModal(employee)}
                          aria-label={`Delete ${employee.name}`}
                        >
                          <Trash2 size={16} />
                          <span className="action-btn-text">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : null}
          </tbody>
        </table>

        {/* Empty Search / Filter State */}
        {employees.length === 0 && totalCount > 0 && (
          <div className="empty-state">
            <div className="empty-icon-circle">
              <UserX size={32} className="empty-icon" />
            </div>
            <h3 className="empty-title">No employees found</h3>
            <p className="empty-description">
              No employee names match your current search query <strong>"{searchTerm}"</strong>.
            </p>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => {
                onSearchChange('');
                onDepartmentChange('ALL');
              }}
            >
              Clear Search Filters
            </button>
          </div>
        )}

        {/* Empty Overall State (when all employees deleted) */}
        {totalCount === 0 && (
          <div className="empty-state">
            <div className="empty-icon-circle">
              <Sparkles size={32} className="empty-icon" />
            </div>
            <h3 className="empty-title">Employee directory is empty</h3>
            <p className="empty-description">
              You have no active employees in the directory. You can add one or restore the sample data.
            </p>
            <div className="empty-actions">
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={onOpenAddModal}
              >
                <Plus size={16} />
                <span>Add First Employee</span>
              </button>
              <button 
                type="button" 
                className="btn btn-outline"
                onClick={onResetData}
              >
                <RotateCcw size={16} />
                <span>Reset Demo Records</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
