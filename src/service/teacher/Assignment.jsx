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

export const updateAssignment = async (assignmentList, assignmentId, selectedClassrooms) => {
    const token = localStorage.getItem('token');
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };

    if (selectedClassrooms.length === 0) {
        try {
            await axios.post(`http://localhost:8080/assignment/update/${assignmentId}`, assignmentList, header);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    } else {
        const queryString = selectedClassrooms
            .map((item) => `classroomIds=${item.classroomId}`)
            .join("&");
        try {
            await axios.post(`http://localhost:8080/assignment/update/${assignmentId}?${queryString}`, assignmentList, header);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
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

export const submitAssignment = async (answer, assignmentId) => {
    const token = localStorage.getItem('token');
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
    try {
        await axios.post(`http://localhost:8080/assignment/submit-assignment/${assignmentId}`, JSON.stringify(answer), header);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const updateStatus = async () => {
    try {
        await axios.patch('http://localhost:8080/assignment/update-status');
    } catch (e) {
        console.log(e)
    }
}

export const pageGetAllAssignmentOfStudent = async (page) => {
    const token = localStorage.getItem('token');
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
    try {
        const temp = await axios.get(`http://localhost:8080/assignment/assignment-list?page=${page}`, header)
        return temp.data;
    } catch (e) {
        console.log(e);
    }
}

export const testScoring = async (assignmentList, assignmentId, studentId) => {
    const token = localStorage.getItem('token');
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
    try {
        await axios.patch(`http://localhost:8080/assignment/test-scoring/${assignmentId}/${studentId}`, assignmentList, header);
        return true;
    }catch (e) {
        console.log(e);
        return false;
    }
}

export const deleteAssignment = async (assignmentId) => {
    const token = localStorage.getItem('token');
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
    try {
        await axios.delete(`http://localhost:8080/assignment/delete/${assignmentId}`, header);
        return true;
    }catch (e) {
        console.log(e);
        return false;
    }
}