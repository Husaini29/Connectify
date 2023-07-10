import React from 'react'
import { Left } from "../home/component/left/Left"
import { Right } from "../home/component/right/Right"
import { usePost } from '../../context/PostContext'
import { PostCard } from '../../components/postCard/PostCard'
import { useEffect } from 'react'
import { useUser } from '../../context/UserContext'
import { Header } from '../../components/header/Header'
import { Footer } from '../../components/footer/Footer'

export const Explore = () => {
    const { postState:{ posts,sort },fetchAllPosts,handleSort } = usePost();
    const { fetchAllUsers } = useUser();

    const sortedPost = sort ? [...posts].sort((a,b)=> sort === "Trending" ? b.likes.likeCount - a.likes.likeCount : new Date(b.createdAt) - new Date(a.createdAt)) : posts
    

    useEffect(()=>{
        fetchAllUsers();
        fetchAllPosts();
    },[]);
    
  return (
    <div>
        <Header/>
    <div style={{ display:"flex" }}>
        <Left />
        <div>
        <div className='center-filter'>
          <button className='filter-btn' onClick={()=>handleSort("Trending")}>Trending</button>
          <button className='filter-btn' onClick={()=>handleSort("Latest")}>Latest</button>
        </div>
            {
                sortedPost?.map(post =>
                    <PostCard key={post._id} post={post}/>)
            }
        </div>
        <Right />
    </div>
    <Footer/>
    </div>
  )
}
