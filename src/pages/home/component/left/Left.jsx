import React from 'react';
import { AiFillHome,AiFillHeart } from "react-icons/ai";
import { MdExplore } from "react-icons/md";
import { BsFillBookmarkFill } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import "./left.css";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { PostModal } from '../../../../components/postModal/PostModal';
import { useAuth } from '../../../../context/AuthContext';

export const Left = () => {
  const navigate = useNavigate();
  const [ createPostModal,setCreatePostModal ] = useState(false);
  const { currentUser } = useAuth();


  return (
    <div className='left-container' >
      <div className='left-icons-div' onClick={()=> navigate("/")}>
        <AiFillHome/>
        <span className='left-icon-tags'>
          Home
        </span>
      </div>
      <div className='left-icons-div' onClick={()=> navigate("/explore")}>
        <MdExplore/>
        <span className='left-icon-tags'>
          Explore
        </span>
      </div>
      <div className='left-icons-div' onClick={()=> navigate("/likedpost")}>
        <AiFillHeart/>
        <span className='left-icon-tags'>
          Liked Post
        </span>
      </div>
      <div className='left-icons-div' onClick={()=> navigate("/bookmark")}>
        <BsFillBookmarkFill/>
        <span className='left-icon-tags'>
          Bookmark
        </span>
      </div>

      <div className='left-icons-div' onClick={()=> navigate(`/profile/${currentUser?.username}`)}>
        <BiUserCircle/>
        <span className='left-icon-tags'>
          Profile
        </span>
      </div>
      <div className='create-post-btn' onClick={()=> setCreatePostModal(true)}>
        <button className='left-icon-tags'>
          Create Post
        </button>
      </div>

      {
        createPostModal && <PostModal setCreatePostModal={setCreatePostModal}/>
      }
    </div>
  )
}
