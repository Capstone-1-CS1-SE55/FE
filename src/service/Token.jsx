import {jwtDecode} from "jwt-decode";
import axios from "axios";

const token = localStorage.getItem('token');
export const getUsernameFromToken = () => {
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            const username = decodedToken.sub;
            return username;
        } catch (error) {
            console.error("Invalid token:", error);
            return null;
        }
    } else {
        console.warn("No token found");
        return null;
    }
};

export const getRole = async () => {
    const token2 = localStorage.getItem('token');
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token2}`
        }
    };
    try {
        const response = await axios.get('http://localhost:8080/user/myInfo',header);
        console.log(response.data.result.roles[0])
        return response.data.result.roles[0];
    } catch (e) {
        console.log(e)
    }
}

export const introspectToken = async () => {
    const tokenPayload = {
        token: token,
    };
    try {
        const response = await axios.post("http://localhost:8080/auth/introspect", tokenPayload);
        return response.data.result.valid;
    } catch (e) {
        console.log(e)
    }
}