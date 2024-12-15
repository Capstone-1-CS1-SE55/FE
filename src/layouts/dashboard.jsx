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
import {useEffect, useState} from 'react';
import {getRole} from "@/service/Token.jsx";
import CreateAssignment from "@/pages/assignment/CreateAssignment.jsx";

export function Dashboard() {
    const [controller, dispatch] = useMaterialTailwindController();
    const {sidenavType} = controller;
    const [role, setRole] = useState('UNKNOWN')
    const getRoleOfAccount = async () => {
            const tempRole = await getRole();
            setRole(tempRole);
    };

    useEffect(() => {
        getRoleOfAccount()
    }, []);


    if (role === 'UNKNOWN') {
        return <div>Loading...</div>;  // Hiển thị Loading trong khi chưa có role
    }

    return (
        <div className="min-h-screen bg-blue-gray-50/50">
            <Sidenav
                routes={role === 'TEACHER' ? teacherRoutes : studentRoutes}
                brandImg={sidenavType === 'dark' ? '/img/logo-ct.png' : '/img/logo-ct-dark.png'}
                brandName={role === 'TEACHER' ? 'Welcome Teacher' : 'Welcome Student'}
                role={role}
            />
            <div className="p-4 xl:ml-80">
                <DashboardNavbar/>
                <Configurator/>
                <IconButton
                    size="lg"
                    color="white"
                    className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
                    ripple={false}
                    onClick={() => setOpenConfigurator(dispatch, true)}
                >
                    <Cog6ToothIcon className="h-5 w-5"/>
                </IconButton>
                <Routes>
                    {(role === 'TEACHER' ? teacherRoutes : studentRoutes).map(
                        ({layout, pages}) =>
                            layout === 'dashboard' &&
                            pages.map(({path, element}) => <Route exact path={path} element={element}/>)
                    )}
                    {role === 'TEACHER' && (
                        <>
                            <Route exact path="/tests/question/:assignmentId/:studentId?"
                                   element={<PracticeDetail/>}/>
                            <Route exact path="/class/:classroomId" element={<Student/>}/>
                            <Route exact path="/tests/assignment" element={<CreateAssignment/>}/>
                            <Route exact path="/tests/:assignmentId" element={<PracticesParticipant/>}/>
                        </>
                    )}
                    {role === 'STUDENT' && (
                        <>
                            <Route exact path="/class/:classId" element={  <StudentMember/>}/>
                            <Route exact path="/practices/:assignmentId" element={<StudentPractice/>}/>
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
