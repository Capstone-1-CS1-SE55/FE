import {Routes, Route} from 'react-router-dom';
import {Cog6ToothIcon} from '@heroicons/react/24/solid';
import {IconButton} from '@material-tailwind/react';
import {Sidenav, DashboardNavbar, Configurator, Footer} from '@/widgets/layout';
import teacherRoutes, {adminRoutes, studentRoutes} from '@/pages/dashboard/routes';
import {useMaterialTailwindController, setOpenConfigurator} from '@/context';
import PracticeDetail from '@/pages/dashboard/teacher/practice-detail';
import Student from '@/pages/dashboard/teacher/student';
import StudentMember from '@/pages/dashboard/student/student';
import PracticesParticipant from '@/pages/dashboard/teacher/practices-participant';
import StudentPractice from '@/pages/dashboard/student/practice-detail';
import {useEffect, useState} from 'react';
import {getRole} from "@/service/Token.jsx";
import CreateAssignment from "@/pages/assignment/CreateAssignment.jsx";
import PracticeInClass from "@/pages/dashboard/student/practice-in-class.jsx";

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
        return (<div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="flex items-center space-x-2">
                <div
                    className="loader border-t-transparent border-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
                <span className="text-2xl font-semibold text-gray-700">Loading...</span>
            </div>

            <style jsx>{`
              .loader {
                border-color: transparent;
              }
            `}</style>
        </div>);
    }

    return (<div className="min-h-screen bg-blue-gray-50/50">
        <Sidenav
            routes={role === 'TEACHER' ? teacherRoutes : role === 'STUDENT' ? studentRoutes : adminRoutes}
            brandImg={sidenavType === 'dark' ? '/img/logo-ct.png' : '/img/logo-ct-dark.png'}
            brandName={role === 'TEACHER' ? 'Welcome Teacher' : role === 'STUDENT' ? 'Welcome Student' : 'Welcome Admin'}
            role={role}
        />
        <div className="p-4 xl:ml-80">
            <DashboardNavbar/>
            <Configurator/>
            {/*<IconButton*/}
            {/*    size="lg"*/}
            {/*    color="white"*/}
            {/*    className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"*/}
            {/*    ripple={false}*/}
            {/*    onClick={() => setOpenConfigurator(dispatch, true)}*/}
            {/*>*/}
            {/*    <Cog6ToothIcon className="h-5 w-5"/>*/}
            {/*</IconButton>*/}
            <Routes>
                {(role === 'TEACHER'
                        ? teacherRoutes
                        : role === 'STUDENT'
                            ? studentRoutes
                            : adminRoutes
                ).map(({
                           layout,
                           pages
                       }) => layout === 'dashboard' && pages.map(({
                                                                      path,
                                                                      element
                                                                  }) =>
                    <Route exact path={path} element={element}/>))}
                {role === 'TEACHER' && (<>
                    <Route exact path="/practices/question/:assignmentId/:studentId?"
                           element={<PracticeDetail/>}/>
                    <Route exact path="/class/:classroomId" element={<Student/>}/>
                    <Route exact path="/tests/assignment" element={<CreateAssignment/>}/>
                    <Route exact path="/practices/:assignmentId" element={<PracticesParticipant/>}/>
                </>)}
                {role === 'STUDENT' && (<>
                    <Route exact path="/class/:classId" element={<StudentMember/>}/>
                    <Route exact path="/practices/:assignmentId" element={<StudentPractice/>}/>
                    <Route exact path="/class/assignment/:classId" element={<PracticeInClass/>}/>
                </>)}
            </Routes>
            {/*<div className="text-blue-gray-600">*/}
            {/*        <Footer />*/}
            {/*    </div>*/}
        </div>
    </div>);
}


Dashboard.displayName = '/src/layout/dashboard.jsx';

export default Dashboard;
