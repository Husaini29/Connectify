import React, { useState } from 'react'
import { usePost } from '../../context/PostContext';
import { AiOutlineHeart,AiFillHeart } from "react-icons/ai"
import { FaRegComment } from "react-icons/fa"
import { BsBookmark,BsFillBookmarkFill } from "react-icons/bs"
import "./postcard.css"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PostModal } from '../postModal/PostModal';
import { useEffect } from 'react';
import { useUser } from '../../context/UserContext';

export const PostCard = ({ post }) => {

    const { currentUser } = useAuth();
    const { postState:{ bookmark },fetchAllPosts,deleteUserPost,likeUserPost,dislikeUserPost,bookmarkUserPost,removeBookmarkUserPost } = usePost();
    const { userState:{users},fetchAllUsers } = useUser();
    const [editOption,setEditOption] = useState(false);
    const [editPostModal,setEditPostModal] = useState(false);

    const { _id,username,content,mediaURL,createdAt,likes:{ likeCount },comments } = post;
    const userDetail = users.find(user=> user.username === username);

    const navigate = useNavigate();

    const isPostLiked =()=> post?.likes?.likedBy?.filter(({ _id })=> _id === currentUser._id)?.length !== 0;
    const isPostBookmark =()=> bookmark?.filter(postId=> postId === _id)?.length !== 0;

    const likeHandler=()=>{
      if(isPostLiked()){
        dislikeUserPost(post);
      }
      else{
        likeUserPost(post)
      }
    }
    
    const bookmarkHandler =()=>{
      if(isPostBookmark()){
        removeBookmarkUserPost(post);
      }
      else{
        bookmarkUserPost(post);
      }
    }

    const editClickHandler =()=>{
      setEditOption(false);
      setEditPostModal(true);
    }

    useEffect(()=>{
      fetchAllUsers();
      fetchAllPosts();
    },[])

    return (
        <div>
            <div className='user-posts'>
              <div className='user-details-wrapper'>
                <div className='user-post-card' onClick={()=> navigate(`/profile/${username}`)}>
                  <span>
                    <img src={userDetail?.avatarUrl || "/images/avatar.png"} className='user-avatar' alt='userProfile'/>
                  </span>
                  <div>
                    <div className='user-details'>
                      <p className='user-fullName'>{userDetail?.firstName} {userDetail?.lastName}</p>
                      <p className='post-date'>{createdAt.slice(0,-15)}</p>
                    </div>
                    <p className='user-username'>@{username}</p>
                  </div>
                </div>
                <div className='edit-options'>
                  {username === currentUser.username && (
                    <div style={{ display:"flex" }}>
                      <button onClick={()=> setEditOption(!editOption)}
                        className='option-btn'>...</button>
                        {editOption &&(
                          <div className='edit-delete-div'>
                            <div onClick={()=> editClickHandler()}>Edit</div>
                            <hr/>
                            <div onClick={()=> deleteUserPost(_id)}>Delete</div>
                          </div>
                  )}
                    </div>
                    )}
                    
                </div>
                
              </div>
              <div onClick={()=> navigate(`/post/${_id}`)}
                className='user-post-content'>
                <p className='post-content'>{content}</p>
                {mediaURL && <img className='user-post-image' src={mediaURL} alt='postImage'/>}
              </div>
              <hr/>
              <div className='user-activities'>
                <span onClick={()=>likeHandler()} className='like-post'>
                  {!isPostLiked() ? <AiOutlineHeart/> : <AiFillHeart/>}
                  <span className='count'>{likeCount}</span>
                </span>
                <span className='comment-post'>
                  <FaRegComment/>
                  <span className='count'>{comments?.length}</span>
                </span>
                <span onClick={()=>bookmarkHandler()} className='bookmark-post'>
                  {!isPostBookmark() ? <BsBookmark/> : <BsFillBookmarkFill/>}
                </span>
              </div>
            </div>
            {/* <span onClick={}
              className='create-post-icon'>
                <CiMedicalCross/>
            </span> */}
            {
              editPostModal && <PostModal post={post} setEditPostModal={setEditPostModal}/>
            }
            {/* {
              createPostModal && <PostModal post={post} setCreatePostModal={setCreatePostModal}/>
            } */}
        </div>
    )
}
