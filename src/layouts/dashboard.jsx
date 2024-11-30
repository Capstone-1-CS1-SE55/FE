import { Routes, Route } from 'react-router-dom';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { IconButton } from '@material-tailwind/react';
import { Sidenav, DashboardNavbar, Configurator, Footer } from '@/widgets/layout';
import teacherRoutes, { studentRoutes } from '@/pages/dashboard/routes';
import { useMaterialTailwindController, setOpenConfigurator } from '@/context';
import PracticeDetail from '@/pages/dashboard/teacher/practice-detail';
import Student from '@/pages/dashboard/teacher/student';
import StudentMember from '@/pages/dashboard/student/student';
import PracticesParticipant from '@/pages/dashboard/teacher/practices-participant';
import StudentPractice from '@/pages/dashboard/student/practice-detail';
import { useState } from 'react';

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const [role, setRole] = useState('student');

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={role === 'teacher' ? teacherRoutes : studentRoutes}
        brandImg={sidenavType === 'dark' ? '/img/logo-ct.png' : '/img/logo-ct-dark.png'}
        brandName={role === 'teacher' ? 'Welcome Teacher' : 'Welcome Student'}
        role={role}
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <Routes>
          {(role === 'teacher' ? teacherRoutes : studentRoutes).map(
            ({ layout, pages }) =>
              layout === 'dashboard' &&
              pages.map(({ path, element }) => <Route exact path={path} element={element} />)
          )}
          {role === 'teacher' && (
            <>
              <Route exact path="/practices/:practice_id" element={<PracticesParticipant />} />
              <Route
                exact
                path="/practices/:practice_id/:participant"
                element={<PracticeDetail />}
              />
              <Route exact path="/class/:class_id" element={<Student />} />
            </>
          )}
          {role === 'student' && (
            <>
              <Route exact path="/class/:class_id" element={<StudentMember />} />
              <Route exact path="/practices/:practice_id/" element={<StudentPractice />} />
            </>
          )}
        </Routes>
        {/* <div className="text-blue-gray-600">
          <Footer />
        </div> */}
      </div>
    </div>
  );
}

Dashboard.displayName = '/src/layout/dashboard.jsx';

export default Dashboard;
