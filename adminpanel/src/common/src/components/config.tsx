import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Dashboard',
    path: '/admin/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Brands',
    path: '/admin/brands',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
    disabled: false,
    external: false
  },
  {
    title: 'Create Brand',
    path: '/admin/brands/create',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
    disabled: false,
    external: false
  },
  {
    title: 'Categories',
    path: '/admin/categories',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    ),
    disabled: false,
    external: false
  },
  {
    title: 'Create Category',
    path: '/admin/categories/create',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
    disabled: false,
    external: false
  },
  {
    title: 'Sub Categories',
    path: '/admin/subcategories',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    ),
    disabled: false,
    external: false
  },
  {
    title: 'Sub Categories Create',
    path: '/admin/subcategories/create',
    icon: (
      <SvgIcon fontSize="small">
        <LockClosedIcon />
      </SvgIcon>
    ),
    disabled: false,
    external: false
  },
  {
    title: 'Child Categories',
    path: '/admin/childcategories',
    icon: (
      <SvgIcon fontSize="small">
        <UserPlusIcon />
      </SvgIcon>
    ),
    disabled: false,
    external: false
  },
  {
    title: 'Child Categories Create',
    path: '/admin/childcategories/create',
    icon: (
      <SvgIcon fontSize="small">
        <XCircleIcon />
      </SvgIcon>
    ),
    disabled: false,
    external: false
  },
  {
    title: 'Vendors',
    path: '/admin/vendors',
    icon: (
      <SvgIcon fontSize="small">
        <XCircleIcon />
      </SvgIcon>
    ),
    disabled: false,
    external: false
  },
  {
    title: 'Create Vendor',
    path: '/admin/vendors/create',
    icon: (
      <SvgIcon fontSize="small">
        <XCircleIcon />
      </SvgIcon>
    ),
    disabled: false,
    external: false
  },
  {
    title: 'Products',
    path: '/admin/products',
    icon: (
      <SvgIcon fontSize="small">
        <XCircleIcon />
      </SvgIcon>
    ),
    disabled: false,
    external: false
  },
  {
    title: 'Create Product',
    path: '/admin/products/create',
    icon: (
      <SvgIcon fontSize="small">
        <XCircleIcon />
      </SvgIcon>
    ),
    disabled: false,
    external: false
  },
  {
    title: 'Orders',
    path: '/admin/orders',
    icon: (
      <SvgIcon fontSize="small">
        <XCircleIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Payments',
    path: '/admin/payments',
    icon: (
      <SvgIcon fontSize="small">
        <XCircleIcon />
      </SvgIcon>
    ),
  }
];