import React from 'react'
import "./bookmark.css"
import { Left } from '../home/component/left/Left'
import { Right } from '../home/component/right/Right'
import { usePost } from '../../context/PostContext'
import { PostCard } from '../../components/postCard/PostCard'

export const Bookmark = () => {

    const { postState:{ posts,bookmark } } = usePost();
    const bookmarkedPost = posts?.filter(({ _id })=> bookmark.map(postId=> postId).includes(_id) );
  return (
    <div className='bookmark-container'>
        <Left/>
        <div>
            {bookmarkedPost.length === 0 && <h2>No Post In Bookmark</h2>}
            {bookmarkedPost.length > 0 && (
                <div>
                    <h3>Your Bookmark</h3>
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
  )
}
