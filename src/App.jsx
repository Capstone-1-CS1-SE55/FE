import {Routes, Route, Navigate} from "react-router-dom";
import {Dashboard, Auth} from "@/layouts";
import CreateAssignment from "@/pages/assignment/CreateAssignment.jsx";
import {useState} from "react";

function App() {
    const [role, setRole] = useState();
    return (
        <Routes>
            <Route path="/dashboard/*" element={<Dashboard/>}/>
            <Route path="/auth/*" element={<Auth/>}/>
            <Route exact path="/tests/assignment" element={<CreateAssignment/>}/>
            <Route path="*" element={<Navigate to="/auth/sign-in" replace/>}/>
        </Routes>
    );
}

export default App;
