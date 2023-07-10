import { useState } from "react";
import { createContext } from "react";
import { LoginUser } from "../apiCalls/LoginApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SignupUser } from "../apiCalls/SignupApi";

export const AuthContext = createContext();

export function AuthProvider({ children }){

    const navigate = useNavigate();
    const localStorageToken = JSON.parse(localStorage.getItem("loginDetails"));
    const [ currentUser, setCurrentUser ] = useState(localStorageToken?.user);
    const [ token, setToken ] = useState(localStorageToken?.token);

    const loginHandler = async({ username,password })=>{
        try{
            const res = await LoginUser(username,password);
            console.log(res);
            const { status, data:{ foundUser,encodedToken }} = res;
            if(status === 200){
                localStorage.setItem("loginDetails",JSON.stringify({ user: foundUser, token: encodedToken }));
                setCurrentUser(foundUser);
                setToken(encodedToken);
                toast.success("Successfully Logged In!");
                navigate("/");
            }
        }
        catch(e){
            console.error(e);
            toast.error("Unable to login")
        }
    }

    const signupHandler =async({ username,password,firstName,lastName })=>{
        try{
            const res = await SignupUser(username,password,firstName,lastName);
            console.log(res);
            const { status,data:{ createdUser,encodedToken } } = res;
            if(status === 201){
                localStorage.setItem("loginDetails",
                    JSON.stringify({ user: createdUser, token: encodedToken }));
                    setCurrentUser(createdUser);
                    setToken(encodedToken);
                    toast.success("Successfully Signed Up!");
                    navigate("/");
            }
        }
        catch(e){
            console.error(e);
            toast.error("Unable to SignUp!");
        }
    }

    const logoutHandler =()=>{
        setCurrentUser(null);
        setToken(null);
        localStorage.removeItem("loginDetails");
        navigate("/login");
        toast.success("Successfully LoggedOut")
    }

    return(
        <AuthContext.Provider value={{
            loginHandler,
            signupHandler,
            logoutHandler,
            currentUser,
            token,
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth =()=> useContext(AuthContext);