import axios from "axios";

export const getUsers = async() => await axios.get("/api/users");

export const getSingleUser = async(userId) => await axios.get(`/api/users/${userId}`);

export const editUserDetails = async(userData,endcodedToken)=> await axios.post("/api/users/edit",
        { userData },
        {headers:{ authorization: endcodedToken }}
    )