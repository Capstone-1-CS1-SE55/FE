// import {
//   UserCircleIcon,
//   ServerStackIcon,
//   BookOpenIcon,
// } from '@heroicons/react/24/solid';
// import { SignIn } from '@/pages/auth';
// import Class from './pages/dashboard/teacher/class.jsx';
// import { AccountSetting } from './pages/dashboard/teacher/account-setting.jsx';
// import PracticesList from './pages/dashboard/teacher/practices-list.jsx';
//
// const icon = {
//   className: 'w-5 h-5 text-inherit',
// };
//
// export const routes = [
//   {
//     layout: 'dashboard',
//     pages: [
//       {
//         icon: (
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="currentColor"
//             className="w-[20px] h-[20px]"
//           >
//             <path
//               fillRule="evenodd"
//               d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm8.25 5.25a.75.75 0 0 1 .75-.75h8.25a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75Z"
//               clipRule="evenodd"
//             />
//           </svg>
//         ),
//         name: 'class',
//         path: '/class',
//         element: <Class />,
//       },
//       {
//         icon: <BookOpenIcon {...icon} />,
//         name: 'test',
//         path: '/tests',
//         element: <PracticesList />,
//       },
//       {
//         icon: <UserCircleIcon {...icon} />,
//         name: 'account setting',
//         path: '/account-setting',
//         element: <AccountSetting />,
//       },
//     ],
//   },
//   {
//     title: 'auth pages',
//     layout: 'auth',
//     pages: [
//       {
//         icon: <ServerStackIcon {...icon} />,
//         name: 'sign in',
//         path: '/sign-in',
//         element: <SignIn />,
//       },
//     ],
//   },
// ];
//
// export default routes;
