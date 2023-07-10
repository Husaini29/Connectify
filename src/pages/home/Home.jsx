import React from 'react'
import { Left } from './component/left/Left'
import { Center } from './component/center/Center'
import { Right } from './component/right/Right'
import "./home.css"
import { usePost } from '../../context/PostContext'
import { useEffect } from 'react'
import { Header } from '../../components/header/Header'
import { Footer } from '../../components/footer/Footer'

export const Home = () => {

  const { postState:{ posts,singlePost },fetchAllPosts,fetchPostById,fetchPostByUsername } = usePost();
  
  
  return (
    <div>
      <Header/>
      <div className='home-container'>
        <Left/>
        <Center/>
        <Right/>
      </div>
      <Footer/>
    </div>
  )
}
