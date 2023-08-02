import React from 'react'
import { v4 as uuid } from "uuid"
import { useNavigate, useParams } from 'react-router-dom'
import { usePost } from '../../context/PostContext';
import { PostCard } from '../../components/postCard/PostCard';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import "./singlePost.css"
import { IoIosSend } from "react-icons/io"
import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { toast } from 'react-hot-toast';
import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
import { Left } from '../home/component/left/Left';
import { Right } from '../home/component/right/Right';

export const SinglePost = () => {
  const { postId } = useParams(); 
  const { userState:{ users } } = useUser();
  const { postState:{ posts,singlePost },fetchPostById } = usePost();
  const { currentUser } = useAuth();
  const selectedPost = posts.find(({ _id })=> _id === postId);
  const [postDetails, setPostDetails] = useState(selectedPost);
  const [comment, setComment] = useState({
    _id: uuid(),
    username:currentUser?.username,
    avatarUrl:currentUser?.avatarUrl,
    text:'',
    firstName:currentUser?.firstName,
    lastName:currentUser?.lastName,
  });
  
    const navigate = useNavigate();            

    const addCommentHandler =()=>{
      setPostDetails(prev=>({...prev,comments:[...postDetails?.comments,comment]}))
      setComment({...comment,text:''})
      toast.success("Comment Added Successfully")
    }

    useEffect(()=>{
        fetchPostById(postId);
    },[]);

    console.log(postDetails)

  return (
    <div>
      <Header/>
        <div style={{ display:"flex" }}>
          <Left/>
            <div style={{ width:"60%" }}>
                <PostCard post={postDetails} key={postDetails._id}/>
                <div className='comment-container'>
                    <img src={currentUser?.avatarUrl} alt="avatar"/>
                    <div className='comment-input-container'>
                      <input 
                        type="text"
                        placeholder='Add a comment...'
                        value={comment.text}
                        onChange={(e) => setComment({...comment,text:e.target.value})}
                        />
                        <span 
                          onClick={() => {
                              addCommentHandler();
                          }}
                          className='comment-icon'>
                          <IoIosSend/>
                        </span>
                    </div>
                </div>
                {postDetails?.comments?.length > 0 ? (
                <div className='users-comment-container'>
                  { postDetails?.comments.map(comment=> {
                    const userComment = users?.find(
                      (user) => user.username === comment?.username
                    );
                    return(
                      <div className='post-comments' key={comment._id}>
                        <img 
                          onClick={() =>navigate(`/profile/${userComment?.username}`)}
                          src={userComment?.avatarUrl}/>
                        <div className='post-comments-content'>
                          <div className='post-commet-user'>
                            <strong>{`${userComment?.firstName} ${userComment?.lastName}`}</strong>
                          </div>
                          <p>{comment?.text}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
                ):(
                  <div>
                    <p style={{marginLeft:"25%"}}>No Comments Found</p>
                  </div>
                )}
            </div>
          <Right/>
        </div>
    <Footer/>
    </div>
  )
}
