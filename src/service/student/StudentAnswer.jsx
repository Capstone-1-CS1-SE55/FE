import axios from "axios";

export const saveStudentAnswer = async (answer) => {
    const token = localStorage.getItem("token");
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };
    try {
        await axios.post("http://localhost:8080/question/save-student-answer", JSON.stringify(answer), header);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }

}