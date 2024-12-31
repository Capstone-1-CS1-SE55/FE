import axios from "axios";

export const pageClassroomsByTeacherId = async (classroomName, page) => {
    const token = localStorage.getItem('token')
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }
    try {
        const response = await axios.get(`http://localhost:8080/classroom/page-get-all-classroom-of-teacher?page=${page}&classroomName=${classroomName}`, header);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const updateClassroom = async (classroom) => {
    const token = localStorage.getItem('token')
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };
    try {
        await axios.patch("http://localhost:8080/classroom/update-classroom", classroom, header);
        return true;
    } catch (err) {
        console.log(err);
        return false
    }
}

export const deleteClassroom = async (classroomId) => {
    const token = localStorage.getItem('token')
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };
    try {
        await axios.delete(`http://localhost:8080/classroom/delete/${classroomId}`, header);
        return true;
    } catch (err) {
        console.log(err);
        return false
    }
}

export const pageStudentsInClassByStudentName = async (classroomId, studentName, page) => {
    const token = localStorage.getItem('token')
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }
    try {
        const response = await axios.get(`http://localhost:8080/classroom/page-all-student-in-class/${classroomId}?page=${page}&studentName=${studentName}`, header);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const deleteStudentFromClassroom = async (studentId, classroomId) => {
    const token = localStorage.getItem('token')
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };
    try {
        await axios.delete(`http://localhost:8080/classroom/delete-student-from-class/${studentId}/${classroomId}`, header);
        return true;
    } catch (err) {
        console.log(err);
        return false
    }
}

export const addNewStudentFromClassroom = async (classroomStudent) => {
    const token = localStorage.getItem('token')
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };
    try {
        await axios.post("http://localhost:8080/classroom/add-student-to-class", classroomStudent, header);
        return true;
    } catch (err) {
        console.log(err);
        return false
    }
}

export const addNewClass = async (classroomName, emails) => {
    const token = localStorage.getItem('token')
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };
    try {
        await axios.post(`http://localhost:8080/teacher/create-new-classroom?name=${classroomName}&emails=${emails}`,{},header)
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
}

export const listClassroomByTeacher = async () => {
    const token = localStorage.getItem('token')
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };
    try {
        const temp = await axios.get("http://localhost:8080/classroom/get-all-classroom-of-teacher", header)
        return temp.data;
    } catch (e) {
        console.log(e)
    }
}

export const PageGetAllClassOfStudent = async (classroomName, page) => {
    const token = localStorage.getItem('token')
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };
    try {
        const temp = await axios.get(`http://localhost:8080/classroom/page-get-all-class-of-student?classroomName=${classroomName}&page=${page}`,header)
        return temp.data;
    }catch (e) {
        console.log(e);
    }
}






