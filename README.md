# StaffSync — Employee Management Dashboard

A clean, modern, beginner-friendly Employee Management Dashboard frontend built with **React**, **Vite**, and pure **CSS**.

---

## 🚀 Features

- **Dashboard Overview**:
  - Live metric card displaying **Total Employees**
  - Metric cards for **Active Departments**, **Average Salary**, and **Total Payroll**
- **Employee Table**:
  - Displays ID, Full Name (with initials avatar and role), Email, Department (color-coded badge), and Annual Salary
  - Inline action buttons: **Edit** and **Delete**
- **Live Search & Filter**:
  - Search employees by name in real-time
  - Filter by department dropdown
  - Clear search & active filter tags
- **Add Employee Modal**:
  - Modal dialog with clean inputs for Name, Email, Department, Role, and Salary
  - Auto-generated unique IDs (`EMP-XXXX`)
- **Edit Employee**:
  - Pre-fills current employee details for quick updates
- **Delete Confirmation Modal**:
  - Protects against accidental deletions with an explicit confirmation dialog
- **Form Validation**:
  - Full Name required (minimum 2 characters)
  - Valid Email format check (`user@example.com`)
  - Department selection required
  - Salary must be a positive number greater than 0
  - Inline real-time error messages
- **Responsive & Modern Design**:
  - Clean white UI with enterprise-grade typography and soft shadows
  - Collapsible navigation sidebar on desktop & slide-in drawer on mobile
  - Responsive tables and forms for desktop, tablet, and mobile devices
- **Pure Frontend State**:
  - State managed entirely via React (`useState`, `useMemo`)
  - Comes pre-populated with realistic dummy employee data
  - Includes a "Reset Demo Data" option if you ever want to restore the initial records

---

## 📁 Project Structure

```text
emp-management/
├── index.html                   # HTML entry point with Plus Jakarta Sans font
├── vite.config.js               # Vite configuration
├── package.json                 # Project dependencies & scripts
├── README.md                    # Project documentation
└── src/
    ├── main.jsx                 # React root renderer
    ├── App.jsx                  # Main application state & layout coordinator
    ├── index.css                # Base CSS variables, typography & reset
    ├── App.css                  # UI styling (sidebar, table, modal, cards, responsive)
    ├── data/
    │   └── initialEmployees.js  # Sample employee records & departments list
    └── components/
        ├── Sidebar.jsx          # Left navigation bar with user profile & mobile toggle
        ├── Navbar.jsx           # Top header bar with title and date
        ├── DashboardStats.jsx   # 4 metric overview cards
        ├── EmployeeTable.jsx    # Search bar, filters, and employee data table
        ├── EmployeeModal.jsx    # Add & Edit modal form with validation
        ├── DeleteConfirmModal.jsx # Confirmation dialog before deletion
        └── Toast.jsx            # Notification alert banner
```

---

## 🛠️ Getting Started (Terminal Commands)

### 1. Install Dependencies
Open your terminal inside this project folder (`d:\emp management`) and run:
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
After running this command, Vite will provide a local URL (typically `http://localhost:3000` or `http://localhost:5173`). Open that URL in your browser to view the dashboard.

### 3. Build for Production
To create an optimized production build:
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```
