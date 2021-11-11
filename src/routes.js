import { lazy } from 'react';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'nc-icon nc-grid-45',
    component: lazy(() => import('views/Dashboard')),
    layout: '/admin'
  },
  {
    path: '/category',
    name: 'Category',
    icon: 'nc-icon nc-bullet-list-67',
    component: lazy(() => import('views/Category')),
    layout: '/admin'
  },
  {
    path: '/expense',
    name: 'Expense',
    icon: 'nc-icon nc-chart-pie-36',
    component: lazy(() => import('views/Expense')),
    layout: '/admin'
  }
];

export default dashboardRoutes;
