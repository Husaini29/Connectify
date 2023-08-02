import { createContext,useContext } from "react";
import { bookmarkPost, createPost, deletePost, dislikePost, editPost, getAllPosts, getBookmark, getPostById, getPostByUsername, likePost, removeBookmarkPost } from "../apiCalls/UserPostApis";
import { useReducer } from "react";
import { postReducer } from "../reducer/PostReducer";
import { useAuth } from "./AuthContext";
import { useUser } from "./UserContext";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

export const PostContext = createContext();
 

const initialState ={
    posts:[],
    singlePost:{},
    bookmark:[],
    sort:null
}

export function PostProvider({ children }){
    const { token,currentUser } = useAuth();
    const { userState:{ users } } = useUser();
    const [ postState, postDispatch ] = useReducer(postReducer,initialState);

    const fetchAllPosts =async()=>{
        try {
            const res = await getAllPosts();
            const { status,data:{ posts }} =res;
            if(status === 200){
                postDispatch({ type:"GET_POSTS",payload:posts });
            }
        } catch (e) {
            console.error(e);
        }
    }


    const createNewPost = async(post,media)=>{
        try{
            const res = await createPost(post,media,token);
            console.log(res);
            const { status, data:{ posts } } = res;
            if(status === 201){
                postDispatch({ type:"CREATE_POST",payload:posts});
                toast.success("Post Added Succesfully")
            }
        }
        catch(e){
            console.error(e);
            toast.error("Something Went Wrong")
        }
    }

    const editUserPost = async(postId,postData,media)=>{
        try{
            const res = await editPost(postId,postData,media,token);
            console.log(res);
            const { status, data:{ posts } } = res;
            if(status === 201){
                postDispatch({ type:"EDIT_POST",payload:posts});
                toast.success("Post Edited Succesfully")
            }

        }
        catch(e){
            console.error(e);
        }
    }

    const deleteUserPost =async(postId)=>{
        try{
            const res = await deletePost(postId,token);
            console.log(res);
            const { status,data:{ posts } } = res;
            if( status === 201){
                postDispatch({ type:"DELETE_POST", payload: posts });
                toast.success("Post Deleted")
            }
        }
        catch(e){
            console.error(e);
            toast.error("Unable to delete post");
        }
    }

    const fetchPostById =async(postId)=>{
        try {
            const res = await getPostById(postId);
            const { status,data:{ post }} =res;
            if(status === 200){
                postDispatch({ type:"GET_POST_BY_ID",payload:post });
            }
        } catch (e) {
            console.error(e);
        }
    }

    const fetchPostByUsername =async(username)=>{
        try {
            const res = await getPostByUsername(username);
            console.log(res);
            const { status,data:{ posts }} =res;
            if(status === 200){
                postDispatch({ type:"GET_POST_BY_USERNAME",payload:posts });
            }
        } catch (e) {
            console.error(e);
        }
    }


    const likeUserPost =async(post)=>{
        try {
            const res = await likePost(post._id,token);
            // const data = await res.json();
            const { status,data:{ posts }} = res;
            console.log(res);
            if(status === 201){
                postDispatch({ type:"LIKE_POST",payload:posts });
                toast.success("Post Liked");
            }
            
        } catch (e) {
            console.error(e);
            toast.error("Unable to Like a Post");
        }
    }
    
    const dislikeUserPost =async(post)=>{
        try {
            const res = await dislikePost(post._id,token);
            // const data = await res.json();
            const { status, data:{ posts }} = res;
            console.log(res);
            if(status === 201){
                postDispatch({ type:"DISLIKE_POST",payload:posts });
                toast.success("Post Disliked");
            }
            
        } catch (e) {
            console.error(e);
            toast.error("Unable to Disike a Post");
        }
    }

    const fetchBookmark =async()=>{
        try {
            const res = await getBookmark();
            const { status,data: {bookmarks} } = res;
            if(status === 200){
                postDispatch({ type:"SET_ALL_BOOKMARK_POST",payload:bookmarks });
            }
        } catch (e) {
            console.error(e)
        }
    } 

    const bookmarkUserPost =async(post)=>{
        try {
            const res = await bookmarkPost(post._id,token);
            console.log(res);
            const { status, data:{ bookmarks }} = res;
            if(status === 200){
                postDispatch({ type:"SET_ALL_BOOKMARK_POST",payload:bookmarks });
                toast.success("Successfully Bookmarked Post")
            }
            
        } catch (e) {
            console.error(e);
            toast.error("Unable To Bookmark Post")
        }
    }
    
    const removeBookmarkUserPost =async(post)=>{
        try {
            const res = await removeBookmarkPost(post._id,token);
            console.log(res);
            const { status, data:{ bookmarks }} = res;
            if(status === 200){
                postDispatch({ type:"SET_ALL_BOOKMARK_POST",payload:bookmarks });
                toast.success("Successfully Removed Bookmarked Post")
            }
            
        } catch (e) {
            console.error(e);
            toast.error("Unable To Remove Bookmark Post")
        }
    }

    const handleSort =(sortType)=>{
        postDispatch({ type:"SORT",payload:sortType})
    }

    const homePosts = postState?.posts?.filter(
        (post) => post?.username === currentUser?.username || currentUser?.following?.map(followingUser=> followingUser.username).includes(post?.username)
      );

    const activeUser = users.filter(user=> homePosts.find(post=> post.username === user.username));
    
    useEffect(()=>{
        fetchAllPosts();
    },[])
    return(
        <PostContext.Provider value={{
            postState,
            fetchAllPosts,
            createNewPost,
            editUserPost,
            fetchPostById,
            fetchPostByUsername,
            deleteUserPost,
            likeUserPost,
            dislikeUserPost,
            fetchBookmark,
            bookmarkUserPost,
            removeBookmarkUserPost,
            handleSort,
            homePosts,
            activeUser,
            
        }}>
            { children }
        </PostContext.Provider>
    )
}

export const usePost =()=> useContext(PostContext);