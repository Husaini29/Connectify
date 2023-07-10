import React, { useEffect } from 'react'
import "./center.css"
import { usePost } from '../../../../context/PostContext'
import { useUser } from '../../../../context/UserContext'
import { PostCard } from '../../../../components/postCard/PostCard'
import { useState } from 'react'
import { GrAdd } from "react-icons/gr"
import { PostModal } from '../../../../components/postModal/PostModal'
import { useAuth } from '../../../../context/AuthContext'

export const Center = () => {

  const { postState:{posts,sort},createNewPost,handleSort } = usePost();
  const { userState:{ users },fetchAllUsers } = useUser();
  const { currentUser } = useAuth();
  const[ postContent,setPostContent ] = useState('');
  const [ createPostModal,setCreatePostModal ] = useState(false);

  const loggedInUser = users?.find(({ username }) => username === currentUser?.username);
    
    const postsOfFollowed = posts?.filter(
    (post) =>
      loggedInUser?.following?.some(
        ({ username }) => username === post.username
        ) || currentUser?.username === post.username
        );

    const sortedPost = sort ? [...postsOfFollowed].sort((a,b)=> sort === "Trending" ? b.likes.likeCount - a.likes.likeCount : new Date(b.createdAt) - new Date(a.createdAt)) : postsOfFollowed
        
    const createPostHandler=()=>{
      setPostContent('');
      createNewPost(postContent);
    }


  useEffect(()=>{ 
    fetchAllUsers();
  },[]);

  return (
    <div className='center-container'>
      <div className='center-wrapper'>
        <div className='avatar-post'>
          <img src={currentUser?.avatarUrl || "/images/avatar.png"} className='avatar-img' alt='avatarImg'/>
          <textarea value={postContent}
            onChange={(e)=> setPostContent(e.target.value)}
            className='text-input'
            placeholder="What's on your mind"/>
          <button className='post-btn' onClick={()=> createPostHandler()}>+</button>
        </div>
        <hr/>
        <div className='center-filter'>
          <button className='filter-btn' onClick={()=>handleSort("Trending")}>Trending</button>
          <button className='filter-btn' onClick={()=>handleSort("Latest")}>Latest</button>
        </div>
      </div>

      {
        sortedPost.length > 0 ? (
            sortedPost.map((post)=> 
              <PostCard key={post._id} post={post}/>
        )) :(
          <div className='nopost-container'>
            <h3>Post Something or Follow Someone To See Thier Posts</h3>
          </div>
        )
      }
      <span onClick={()=> setCreatePostModal(true)}
        className='create-post-icon'>
        <GrAdd/>
      </span>
      {
        createPostModal && <PostModal setCreatePostModal={setCreatePostModal}/>
      }
    </div>
  )
}
