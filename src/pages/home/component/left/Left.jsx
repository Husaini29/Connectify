import React from 'react';
import { AiFillHome,AiFillHeart } from "react-icons/ai";
import { MdExplore } from "react-icons/md";
import { BsFillBookmarkFill } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import "./left.css";
import { NavLink,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { PostModal } from '../../../../components/postModal/PostModal';
import { useAuth } from '../../../../context/AuthContext';

export const Left = () => {
  const navigate = useNavigate();
  const [ createPostModal,setCreatePostModal ] = useState(false);
  const { currentUser } = useAuth();

  const getActiveStyle =({ isActive })=>({
    background: isActive && "var(--light-pink)",
    color: isActive && "var(--white)"
  })


  return (
    <div style={{ width:"17%" }}>
    <div className='left-container' >
      <NavLink to="/" className='left-icons-div' style={getActiveStyle}>
        <span><AiFillHome /></span>
        <span className='left-icon-tags'>
          Home
        </span>
      </NavLink>
      <NavLink to="/explore" className='left-icons-div' style={getActiveStyle}>
        <span><MdExplore /></span>
        <span className='left-icon-tags'>
          Explore
        </span>
      </NavLink>
      <NavLink to="/likedpost" className='left-icons-div' style={getActiveStyle}>
        <span><AiFillHeart /></span>
        <span className='left-icon-tags'>
          Liked Post
        </span>
      </NavLink>
      <NavLink to="/bookmark" className='left-icons-div' style={getActiveStyle}>
        <span><BsFillBookmarkFill /></span>
        <span className='left-icon-tags'>
          Bookmark
        </span>
      </NavLink>

      <NavLink to={`/profile/${currentUser?.username}`} className='left-icons-div' style={getActiveStyle}>
        <span><BiUserCircle /></span>
        <span className='left-icon-tags'>
          Profile
        </span>
      </NavLink>
      <div className='create-post-btn' onClick={()=> setCreatePostModal(true)}>
        <button className='left-icon-tags' >
          Create Post
        </button>
      </div>

      {
        createPostModal && <PostModal setCreatePostModal={setCreatePostModal}/>
      }
    </div>
    </div>
  )
}
