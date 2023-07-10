import { createContext } from "react";
import { editUserDetails, getUsers } from "../apiCalls/UserApis";
import { useReducer } from "react";
import { userReducer } from "../reducer/UserReducer";
import { useContext } from "react";
import { followUser, unfollowUser } from "../apiCalls/FollowApis";
import { useAuth } from "./AuthContext";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

export const UserContext = createContext();

const initialState ={
    users:[],
}

export function UserProvider({ children }){
    const { token,currentUser } = useAuth();
    const [ userState,userDispatch ] = useReducer(userReducer,initialState);

    const fetchAllUsers = async()=>{
        try{
            const res = await getUsers();
            const {status, data:{ users }} = res;
            if(status === 200){
                userDispatch({ type:"GET_USERS",payload:users });
            }
        }
        catch(e){
            console.error(e);
        }    
    }

    const followingUser = async(followingUser)=>{
        try {
            const res = await followUser(followingUser._id,token);
            console.log(res);
            const { status, data } = res;
            if(status === 200){
                userDispatch({ type:"UPDATE_USER" , payload:data.user});
                userDispatch({ type:"UPDATE_USER" , payload:data.followUser});
                toast.success("User Followed");
            }

        } catch (e) {
            console.error(e);
            toast.error("Unable To Follow user");
        }
    }

    const unfollowingUser = async(unfollowingUser)=>{
        try {
            const res = await unfollowUser(unfollowingUser._id,token);
            console.log(res);
            const { status, data } = res;
            if(status === 200){
                userDispatch({ type:"UPDATE_USER" , payload:data.user});
                userDispatch({ type:"UPDATE_USER" , payload:data.followUser});
                toast.success("User Unfollowed")
            }

        } catch (e) {
            console.error(e);
            toast.error("Unable to Unfollow User")
        }
    }

    const editUserProfile =async(userData)=>{
        try {
            const res = await editUserDetails(userData,token);
            const { status ,data:{ user } } = res;
            if(status === 201){
                userDispatch({ type:"EDIT_USER",payload:user});
                toast.success("Profile Updated Successfully");
            }
        } catch (e) {
            console.erroe(e);
            toast.error("Unable To Update Profile");
        }
    }

    const isFollowed = (userId) => {
        return userState?.users
          ?.find(({ _id }) => _id === currentUser?._id)
          ?.following?.find(({ _id }) => _id === userId)
          ? true
          : false;
      };

      useEffect(()=>{
        fetchAllUsers();
    },[])

    return(
        <UserContext.Provider value={{
            fetchAllUsers,
            followingUser,
            unfollowingUser,
            editUserProfile,
            isFollowed,
            userState,
            
        }}>
            { children }
        </UserContext.Provider>
    )
}

export const useUser =()=> useContext(UserContext);