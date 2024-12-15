import axios from "axios";

export const getClassroomWithStudents = async (classroomId, page) => {
    const token = localStorage.getItem("token");
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };
    try {
        const temp = await axios.get(`http://localhost:8080/classroom/students/${classroomId}?page=${page}`,header)
        return temp.data;
    }catch (e) {
        console.log(e);
    }
}

export const pageGetAssignmentOfClass = async (classroomId, page) => {
    const token = localStorage.getItem("token");
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };
    try {
        const temp = await axios.get(`http://localhost:8080/assignment/assignment-of-class/${classroomId}?page=${page}`,header)
        return temp.data;
    }catch (e) {
        console.log(e);
    }
}