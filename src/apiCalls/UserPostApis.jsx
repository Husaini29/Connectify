import axios from "axios";

export const getAllPosts = async()=> await axios.get("/api/posts");

export const getPostById = async(postId)=> await axios.get(`/api/posts/${postId}`);

export const getPostByUsername = async(username)=> await axios.get(`/api/posts/user/${username}`);

export const createPost = async(post,encodedToken)=> 
    await axios.post("/api/posts",
    { postData: {content: post} },
    { headers: { authorization: encodedToken }
});

export const deletePost = async(postId,encodedToken)=>
    await axios.delete(`/api/posts/${postId}`,
    { headers: { authorization: encodedToken}
});

export const editPost = async(postId,postData,encodedToken)=>
    await axios.post(`/api/posts/edit/${postId}`,
    {postData : { content:postData}},
    { headers: { authorization: encodedToken }
});

export const likePost =async(postId,encodedToken)=>
    await axios.post(`/api/posts/like/${postId}`,
        {},
        { headers : { authorization: encodedToken }
    })

export const dislikePost = async(postId,encodedToken)=>
    await axios.post(`/api/posts/dislike/${postId}`,
        {},
        { headers : { authorization: encodedToken }
    })

export const getBookmark = async()=> await axios.get("/api/users/bookmark");

export const bookmarkPost = async(postId,encodedToken)=> 
    await axios.post(`/api/users/bookmark/${postId}`,
        {},
        { headers: { authorization: encodedToken }
});

export const removeBookmarkPost = async(postId,encodedToken)=> 
    await axios.post(`/api/users/remove-bookmark/${postId}`,
    {},
    { headers: { authorization: encodedToken}
});

