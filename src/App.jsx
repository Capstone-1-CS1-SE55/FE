import {Routes, Route, Navigate} from "react-router-dom";
import {Dashboard, Auth} from "@/layouts";
import CreateAssignment from "@/pages/assignment/CreateAssignment.jsx";
import {useEffect, useState} from "react";
import {updateStatus} from "@/service/teacher/Assignment.jsx";
import PracticeInClass from "@/pages/dashboard/student/practice-in-class.jsx";

function App() {
    // const handleUpdateStatus = async () => {
    //     await updateStatus();
    // }
    //
    // useEffect(() => {
    //     handleUpdateStatus()
    //     const interval = setInterval(handleUpdateStatus, 6000);
    //     return () => clearInterval(interval);
    // }, []);

    return (
        <Routes>
            <Route path="/dashboard/*" element={<Dashboard/>}/>
            {/*<Route path="/dashboard/assignment/practices/:classId" element={<PracticeInClass/>}/>*/}
            <Route path="/auth/*" element={<Auth/>}/>
            <Route exact path="/tests/assignment" element={<CreateAssignment/>}/>
            <Route path="*" element={<Navigate to="/auth/sign-in" replace/>}/>
        </Routes>
    );
}

export default App;
