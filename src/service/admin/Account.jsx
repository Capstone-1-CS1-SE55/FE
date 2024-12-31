import axios from "axios";

export const pageGetAllAccount = async (username, page) => {
    const token = localStorage.getItem('token');
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };
    try {
        const response = await axios.get(`http://localhost:8080/user/all-user?username=${username}&page=${page}`, header)
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const deleteAccount = async (userId) => {
    const token = localStorage.getItem('token');
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };
    try {
        await axios.delete(`http://localhost:8080/user/delete-user/${userId}`,header);
        return true;
    }catch (e) {
        console.log(e);
        return false;
    }
}

export const createAccount = async (account) => {
    try {
        await axios.post("http://localhost:8080/user/create",account);
        return true;
    }catch (e) {
        console.log(e);
        return false;
    }
}
export const checkUsername = async (username) => {
    try {
        const response = await axios.get(`http://localhost:8080/user/check-username/${username}`)
        return response.data;
    } catch (e) {
        console.log(e);
    }
}