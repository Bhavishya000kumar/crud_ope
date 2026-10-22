// import React, { useState, useMemo } from 'react';
import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardStats from './components/DashboardStats';
import EmployeeTable from './components/EmployeeTable';
import EmployeeModal from './components/EmployeeModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';
import { initialEmployees } from './data/initialEmployees';
import './App.css';

/**
 * Main App Component
 * Central state hub for Employee Management Dashboard.
 * Manages:
 * - Employee records (pure React state with dummy data fallback)
 * - Search query & department filter
 * - Add/Edit modal state
 * - Delete confirmation modal state
 * - Responsive mobile sidebar toggle
 * - Toast notification feedback
 */
export default function App() {
  // 1. Employee records state (initialized with dummy data)
  // const [employees, setEmployees] = useState(() => {
  //   const saved = localStorage.getItem('staffsync_employees');
  //   if (saved) {
  //     try {
  //       return JSON.parse(saved);
  //     } catch (e) {
  //       console.error('Failed to parse saved employees:', e);
  //     }
  //   }
  //   return initialEmployees;
  // });
  const [employees, setEmployees] = useState([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  fetch('https://employee-management-backend-yb0m.onrender.com/api/employees')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      return response.json();
    })
    .then((data) => {
      setEmployees(data);
    })
    .catch((error) => {
      console.error('Error fetching employees:', error);
    })
    .finally(() => {
      setIsLoading(false);
    });
}, []);



  // Keep localStorage synchronized so user doesn't lose modifications on reload
  const updateEmployees = (newEmployeesList) => {
    setEmployees(newEmployeesList);
    try {
      localStorage.setItem('staffsync_employees', JSON.stringify(newEmployeesList));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  };

  // 2. Search & filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');

  // 3. Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  // 4. UI feedback & navigation states
  const [toast, setToast] = useState(null); // { message, type }
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Helper to trigger feedback toast
  const triggerToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Filtered employees list based on name search and department filter
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      // Name search (case-insensitive)
      const matchesName = employee.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim());

      // Department filter
      const matchesDept = 
        departmentFilter === 'ALL' || employee.department === departmentFilter;

      return matchesName && matchesDept;
    });
  }, [employees, searchTerm, departmentFilter]);

  // Open modal in "Add" mode
  const handleOpenAddModal = () => {
    setEmployeeToEdit(null);
    setIsModalOpen(true);
  };

  // Open modal in "Edit" mode
  const handleOpenEditModal = (employee) => {
    setEmployeeToEdit(employee);
    setIsModalOpen(true);
  };

  // Close Add/Edit modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEmployeeToEdit(null);
  };

  // Generate next unique Employee ID
  const generateEmployeeId = () => {
    const highestNum = employees.reduce((max, emp) => {
      const match = emp.id.match(/\d+/);
      const num = match ? parseInt(match[0], 10) : 1000;
      return num > max ? num : max;
    }, 1000);
    return `EMP-${highestNum + 1}`;
  };

  // Save Employee handler (handles both Add and Edit)
  // const handleSaveEmployee = (formData) => {
  //   if (employeeToEdit) {
  //     // EDIT existing employee
  //     const updatedList = employees.map((emp) =>
  //       emp.id === employeeToEdit.id ? { ...emp, ...formData } : emp
  //     );
  //     updateEmployees(updatedList);
  //     triggerToast(`Successfully updated "${formData.name}".`, 'success');
  //   } else {
  //     // ADD new employee
  //     const newEmployee = {
  //       ...formData,
  //       id: generateEmployeeId(),
  //       status: 'Active',
  //       joinDate: new Date().toISOString().split('T')[0]
  //     };
  //     updateEmployees([newEmployee, ...employees]);
  //     triggerToast(`Added "${formData.name}" to the directory!`, 'success');
  //   }

  //   handleCloseModal();
  // };
  
  // Save Employee handler (handles both Add and Edit)
  const handleSaveEmployee = async (formData) => {
    try {
      const isEditing = Boolean(employeeToEdit);

     const url = isEditing
  ? `https://employee-management-backend-yb0m.onrender.com/api/employees/${employeeToEdit.id}`
  : 'https://employee-management-backend-yb0m.onrender.com/api/employees';

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save employee');
      }

      const savedEmployee = await response.json();

      if (isEditing) {
        setEmployees((prev) =>
          prev.map((emp) =>
            emp.id === employeeToEdit.id ? savedEmployee : emp
          )
        );
        triggerToast(`Successfully updated "${savedEmployee.name}".`, 'success');
      } else {
        setEmployees((prev) => [savedEmployee, ...prev]);
        triggerToast(`Added "${savedEmployee.name}" to the directory!`, 'success');
      }

      handleCloseModal();
    } catch (error) {
      console.error('Error saving employee:', error);
      triggerToast('Could not save employee. Please try again.', 'danger');
    }
  };


  // Delete employee trigger
  const handleOpenDeleteModal = (employee) => {
    setEmployeeToDelete(employee);
  };

  const handleCloseDeleteModal = () => {
    setEmployeeToDelete(null);
  };

  // Confirm delete

  // Confirm delete
  const handleConfirmDelete = async (id) => {
    const target = employees.find((emp) => emp.id === id);

    try {
      const response = await fetch(
        `https://employee-management-backend-yb0m.onrender.com/api/employees/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }

      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      setEmployeeToDelete(null);

      triggerToast(
        target
          ? `Removed "${target.name}" from directory.`
          : 'Employee deleted.',
        'danger'
      );
    } catch (error) {
      console.error('Error deleting employee:', error);
      triggerToast('Could not delete employee. Please try again.', 'danger');
    }
  };


  // Reset sample dummy data
  const handleResetData = () => {
    updateEmployees(initialEmployees);
    setSearchTerm('');
    setDepartmentFilter('ALL');
    triggerToast('Sample employee directory restored.', 'success');
  };
  if (isLoading) {
  return <div style={{ padding: '40px' }}>Loading employees...</div>;
}
  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        {/* Top Header Navbar */}
        <Navbar 
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} 
        />

        {/* Dashboard Body Container */}
        <main className="dashboard-content">
          <div className="content-container">
            {/* Quick Stats Overview Cards */}
            <DashboardStats 
              employees={employees} 
            />

            {/* Employee Directory Table & Toolbar */}
            <EmployeeTable
              employees={filteredEmployees}
              totalCount={employees.length}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              departmentFilter={departmentFilter}
              onDepartmentChange={setDepartmentFilter}
              onOpenAddModal={handleOpenAddModal}
              onOpenEditModal={handleOpenEditModal}
              onOpenDeleteModal={handleOpenDeleteModal}
              onResetData={handleResetData}
            />
          </div>
        </main>
      </div>

      {/* Add / Edit Employee Modal Form */}
      <EmployeeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEmployee}
        employeeToEdit={employeeToEdit}
      />

      {/* Confirmation Modal for Delete */}
      <DeleteConfirmModal
        isOpen={Boolean(employeeToDelete)}
        employee={employeeToDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      {/* Toast Notification Alert */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
