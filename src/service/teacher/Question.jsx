import axios from "axios";

export const getAllQuestionsInAssignment = async (assignmentId, studentId) => {
    const token = localStorage.getItem('token');
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
    const url = studentId
        ? `http://localhost:8080/assignment/questions/${assignmentId}/${studentId}`
        : `http://localhost:8080/assignment/questions/${assignmentId}`;
    try {
        const response = await axios.get(url, header);
        console.log('a', response.data);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}