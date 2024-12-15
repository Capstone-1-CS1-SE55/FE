import axios from "axios";

export const login = async (account) => {
    try {
        const res = await axios.post('http://localhost:8080/auth/token', account, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        localStorage.setItem("token", res.data.result.token);
        console.log("Login Successful", res);
        return true;
    } catch (err) {
        console.log("Login Failed", err);
        return false;
    }
};

export const getAllUser = async () => {
    const token = localStorage.getItem('token')
    console.log(token)
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }
    await axios.get('http://localhost:8080/user/get-all', header)
        .then((res) => {
            console.log("All User", res.data);
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        })
}

export const getAllUser2 = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("Token is not defined or missing.");
        }
        console.log("Token:", token);

        const header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        };

        const response = await axios.get('http://localhost:8080/user/get-all-user', header);
        console.log("All User", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};