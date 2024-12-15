import axios from "axios";

export const pageAssignmentOfTeacher = async (title, page) => {
    const token = localStorage.getItem('token');
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    try {
        const response = await axios.get(`http://localhost:8080/assignment/page-get-all-assignment-of-teacher?page=${page}&title=${title}`,header)
        return response.data;
    } catch (err) {
        console.log(err);
    }
}