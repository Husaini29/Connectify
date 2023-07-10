import React from 'react';
import "./likedpost.css"
import { Left } from '../home/component/left/Left';
import { Right } from '../home/component/right/Right';
import { usePost } from '../../context/PostContext';
import { useAuth } from '../../context/AuthContext';
import { PostCard } from '../../components/postCard/PostCard';
import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';

export const LikedPost = () => {
    const { postState:{ posts } } = usePost();
    const { currentUser } = useAuth();

    const likedPosts = posts?.filter(({ likes }) => likes.likedBy.find(({ username })=> username === currentUser.username));

  return (
    <div>
        <Header/>
    <div className='likedpost-container'>
        <Left/>
        <div>
            { likedPosts.length === 0 && <h3>No Post Liked</h3>}
            { likedPosts.length > 0 && (
                <div>
                    <h3 className='post-head'>Liked Posts</h3>
                    {
                        likedPosts.map(post =>
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
