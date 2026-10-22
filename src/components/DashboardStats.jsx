import React from 'react';
import { Users, DollarSign, Building2, TrendingUp } from 'lucide-react';

/**
 * DashboardStats Component
 * Displays clean white dashboard metric cards including total employees,
 * average salary, department count, and total payroll expenditure.
 */
export default function DashboardStats({ employees }) {
  const totalEmployees = employees.length;

  // Calculate unique departments count
  const departmentsCount = new Set(employees.map(emp => emp.department)).size;

  // Calculate total payroll
  const totalPayroll = employees.reduce((acc, curr) => acc + (Number(curr.salary) || 0), 0);

  // Calculate average salary
  const avgSalary = totalEmployees > 0 ? Math.round(totalPayroll / totalEmployees) : 0;

  // Currency formatter utility
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  const statCards = [
    {
      id: 'total-employees',
      label: 'Total Employees',
      value: totalEmployees,
      badge: `${totalEmployees} Active`,
      badgeType: 'success',
      icon: Users,
      iconColor: '#2563eb',
      iconBg: '#eff6ff',
      subtext: 'Current registered staff'
    },
    {
      id: 'active-departments',
      label: 'Departments',
      value: departmentsCount,
      badge: 'Teams',
      badgeType: 'neutral',
      icon: Building2,
      iconColor: '#8b5cf6',
      iconBg: '#f5f3ff',
      subtext: 'Operational divisions'
    },
    {
      id: 'avg-salary',
      label: 'Average Salary',
      value: formatCurrency(avgSalary),
      badge: 'Per Year',
      badgeType: 'info',
      icon: TrendingUp,
      iconColor: '#059669',
      iconBg: '#ecfdf5',
      subtext: 'Company-wide average'
    },
    {
      id: 'total-payroll',
      label: 'Total Payroll',
      value: formatCurrency(totalPayroll),
      badge: 'Annualized',
      badgeType: 'warning',
      icon: DollarSign,
      iconColor: '#d97706',
      iconBg: '#fffbeb',
      subtext: 'Combined gross salaries'
    }
  ];

  return (
    <section className="stats-grid" aria-label="Dashboard Statistics">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.id} className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-label">{stat.label}</span>
              <div 
                className="stat-icon-wrapper" 
                style={{ backgroundColor: stat.iconBg, color: stat.iconColor }}
              >
                <Icon size={20} />
              </div>
            </div>

            <div className="stat-card-body">
              <span className="stat-card-value">{stat.value}</span>
              <div className="stat-card-footer">
                <span className={`stat-badge stat-badge-${stat.badgeType}`}>
                  {stat.badge}
                </span>
                <span className="stat-subtext">{stat.subtext}</span>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
