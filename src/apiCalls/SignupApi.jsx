import axios from "axios";

export const SignupUser = async(username,password,firstName,lastname)=>
    await axios.post("/api/auth/signup",{
        username,
        password,
        firstName,
        lastname,
    });