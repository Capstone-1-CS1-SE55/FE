import axios from "axios";
export const createNewAssignment = async (assignment) => {
    const token = localStorage.getItem('token')
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };
    try {
        await axios.post("http://localhost:8080/assignment/create", assignment, header);
        return true;
    } catch (err) {
        console.log(err);
        return false
    }
}

export const pageGetAllStudentAssignment = async (assignmentId, studentName, page) => {
    const token = localStorage.getItem('token');
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
    try {
        const temp = await axios.get(`http://localhost:8080/assignment/page-student-assignment/${assignmentId}?studentName=${studentName}&page=${page}`, header)
        return temp.data;
    } catch (e) {
        console.log(e);
    }
}

export const updateAssignment = async (assignmentList, assignmentId) => {
    const token = localStorage.getItem('token');
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
    try {
        await axios.post(`http://localhost:8080/assignment/update/${assignmentId}`, assignmentList, header);
        return true;
    }catch (e) {
        console.log(e);
        return false;
    }
}

export const getAllQuestionInAssignment = async (assignmentId) => {
    const token = localStorage.getItem('token');
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
    try {
        let temp = await axios.get(`http://localhost:8080/assignment/all-question/${assignmentId}`, header);
        console.log(temp.data);
        return temp.data;
    }catch (e) {
        console.log(e);
        return false;
    }
}