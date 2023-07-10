import axios from "axios";

export const followUser = async(userId,encodedToken)=>
    await axios.post(`/api/users/follow/${userId}`,
        {},
        { headers:{ authorization: encodedToken } }
    );

export const unfollowUser = async(userId,encodedToken)=>
    await axios.post(`/api/users/unfollow/${userId}`,
    {},
    { headers: { authorization: encodedToken }
});