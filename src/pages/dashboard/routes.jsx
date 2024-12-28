import {
  UserCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  BookOpenIcon,
} from '@heroicons/react/24/solid';
import { SignIn, SignUp } from '@/pages/auth';
import Class from './teacher/class';
import AccountSetting from './teacher/account-setting';
import PracticesList from './teacher/practices-list';
import StudentClass from './student/class';
import StudentAccount from './student/account-setting';
import StudentPractices from './student/practices-list';
import AdminAccount from './admin/account-setting';
import AccountManagement from './admin/account-management';

const icon = {
  className: 'w-5 h-5 text-inherit',
};

export const teacherRoutes = [
  {
    layout: 'dashboard',
    pages: [
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-[20px] h-[20px]"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm8.25 5.25a.75.75 0 0 1 .75-.75h8.25a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        ),
        name: 'class',
        path: '/class',
        element: <Class />,
      },
      {
        icon: <BookOpenIcon {...icon} />,
        name: 'practices',
        path: '/practices',
        element: <PracticesList />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: 'account setting',
        path: '/account-setting',
        element: <AccountSetting />,
      },
    ],
  },
  {
    title: 'auth pages',
    layout: 'auth',
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: 'sign in',
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: 'sign up',
        path: '/sign-up',
        element: <SignUp />,
      },
    ],
  },
];

export const adminRoutes = [
  {
    layout: 'dashboard',
    pages: [
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-[20px] h-[20px]"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm8.25 5.25a.75.75 0 0 1 .75-.75h8.25a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        ),
        name: 'Account management',
        path: '/account-management',
        element: <AccountManagement />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: 'account setting',
        path: '/account-setting',
        element: <AdminAccount />,
      },
    ],
  },
  {
    title: 'auth pages',
    layout: 'auth',
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: 'sign in',
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: 'sign up',
        path: '/sign-up',
        element: <SignUp />,
      },
    ],
  },
];

export const studentRoutes = [
  {
    layout: 'dashboard',
    pages: [
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-[20px] h-[20px]"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm8.25 5.25a.75.75 0 0 1 .75-.75h8.25a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        ),
        name: 'your class',
        path: '/class',
        element: <StudentClass />,
      },
      {
        icon: <BookOpenIcon {...icon} />,
        name: 'your practices',
        path: '/practices',
        element: <StudentPractices />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: 'account setting',
        path: '/account-setting',
        element: <StudentAccount />,
      },
    ],
  },
  {
    title: 'auth pages',
    layout: 'auth',
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: 'sign in',
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: 'sign up',
        path: '/sign-up',
        element: <SignUp />,
      },
    ],
  },
];

export default teacherRoutes;
