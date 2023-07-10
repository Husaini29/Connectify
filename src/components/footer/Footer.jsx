import React from 'react'
import "./footer.css"
import { AiFillHome,AiFillHeart } from "react-icons/ai"
import { MdExplore } from "react-icons/md"
import { BsFillBookmarkFill } from "react-icons/bs"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export const Footer = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  return (
    <div className='footer-container'>
        <div className='footer-icons'>
          <span onClick={()=>navigate("/")}>
            <AiFillHome/>
          </span>
          <span onClick={()=>navigate("/explore")}>
            <MdExplore/>
          </span>
          <span onClick={()=>navigate("/likedpost")}>
            <AiFillHeart/>
          </span>
          <span onClick={()=>navigate("/bookmark")}>
            <BsFillBookmarkFill/>
          </span>
          <span onClick={()=>navigate(`/profile/${currentUser?.username}`)}
            className='user-avatar-icon'>
            <img src={currentUser?.avatarUrl || "/images/avatar.png"} className='user-avatar-image' alt='userProfile'/>
          </span>
        </div>
    </div>
  )
}
