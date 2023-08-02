import React, { useEffect, useRef } from 'react'
import "./center.css"
import { usePost } from '../../../../context/PostContext'
import { useUser } from '../../../../context/UserContext'
import { PostCard } from '../../../../components/postCard/PostCard'
import { useState } from 'react'
import { GrAdd } from "react-icons/gr"
import { PostModal } from '../../../../components/postModal/PostModal'
import { useAuth } from '../../../../context/AuthContext'
import { BsImage } from "react-icons/bs"
import { GrEmoji } from "react-icons/gr"
import { RxCross2 } from "react-icons/rx"
import Picker from "emoji-picker-react"

export const Center = () => {

  const { postState:{posts,sort},createNewPost,handleSort } = usePost();
  const { userState:{ users },fetchAllUsers } = useUser();
  const { currentUser } = useAuth();
  const[ postContent,setPostContent ] = useState('');
  const[ media,setMedia ] = useState(null);
  const [ createPostModal,setCreatePostModal ] = useState(false);
  const [ emojiPicker,setEmojiPicker ] = useState(false);
  const imageRef = useRef();

  const loggedInUser = users?.find(({ username }) => username === currentUser?.username);
    
    const postsOfFollowed = posts?.filter(
    (post) =>
      loggedInUser?.following?.some(
        ({ username }) => username === post.username
        ) || currentUser?.username === post.username
        );

    const sortedPost = sort ? [...postsOfFollowed].sort((a,b)=> sort === "Trending" ? b.likes.likeCount - a.likes.likeCount : new Date(b.createdAt) - new Date(a.createdAt)) : postsOfFollowed

    const handleUploadImage =()=>{
      imageRef.current.click();
    }

    const handleUploadPostImage=(e)=>{
        const file = e.target.files[0];
        setMedia(file);
    }
        
    const emojiClickHandler = (emojiObj) => {
      const emoji = emojiObj.emoji;
      const updatedContent = postContent + emoji;
      setPostContent(updatedContent);
      setEmojiPicker(false);
    };

    const createPostHandler=()=>{
      const image = media && URL.createObjectURL(media);
      setPostContent('');
      setMedia(null);
      createNewPost(postContent,image);
    }


  useEffect(()=>{ 
    fetchAllUsers();
  },[]);

  return (
    <div className='center-container'>
      <div className='center-wrapper'>
        <div>
          <div className='avatar-post'>
            <img src={currentUser?.avatarUrl || "/images/avatar.png"} className='avatar-img' alt='avatarImg'/>
            <textarea value={postContent}
              onChange={(e)=> setPostContent(e.target.value)}
              className='text-input'
              placeholder="What's on your mind"/>
            </div>
            {media && (
              <div className="selected-image">
                {media.type.slice(0, 5) === "image" ? (
                  <img src={URL.createObjectURL(media)} alt="Post-pic" />
                ) : null}
                <button onClick={() => setMedia(null)}>
                  <span><RxCross2/></span>
                </button>
              </div>
            )}
            <div className='image-emoji-btns'>
              <div className='image-emoji-icons'>
                <span onClick={handleUploadImage}>
                  <input style={{ display:"none" }}
                    type='file'
                    accept='image/*'
                    ref={imageRef}
                    onChange={handleUploadPostImage}/>
                  <BsImage/>
                </span>
                <span>
                  <GrEmoji onClick={()=> setEmojiPicker(!emojiPicker)}/>
                  {emojiPicker && (
                    <div
                      className="emoji-picker"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Picker
                        onEmojiClick={emojiClickHandler}
                        width={300}
                        height={450}
                      />
                    </div>
                  )}
                </span>
              </div>
              <button disabled={postContent.trim() === "" && !media}
                className='post-btn' 
                onClick={()=> createPostHandler()}>
                  Post
              </button>
            </div>
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
