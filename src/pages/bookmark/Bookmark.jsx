import React from 'react'
import "./bookmark.css"
import { Left } from '../home/component/left/Left'
import { Right } from '../home/component/right/Right'
import { usePost } from '../../context/PostContext'
import { PostCard } from '../../components/postCard/PostCard'
import { Header } from '../../components/header/Header'
import { Footer } from '../../components/footer/Footer'

export const Bookmark = () => {

    const { postState:{ posts,bookmark } } = usePost();
    const bookmarkedPost = posts?.filter(({ _id })=> bookmark.map(postId=> postId).includes(_id) );
  return (
    <div>
        <Header/>
            <div className='bookmark-container'>
                <Left/>
                <div style={{ width:"60%" }}>
                    {bookmarkedPost.length === 0 && <h3 className='bookmark-head'>No Post In Bookmark</h3>}
                    {bookmarkedPost.length > 0 && (
                        <div>
                            <h3 className='bookmark-head'>Your Bookmark</h3>
                            {
                                bookmarkedPost.map(post=>
                                        <PostCard key={post._id} post={post}/>
                                    )
                            }
                        </div>
                    )}
                    
                </div>
                <Right/>
            </div>
        <Footer/>
    </div>

  )
}
