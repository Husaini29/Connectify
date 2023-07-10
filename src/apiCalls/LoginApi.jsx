import axios from "axios";

export const LoginUser = async(username,password)=> 
    await axios.post('/api/auth/login',{
        username,
        password,
})