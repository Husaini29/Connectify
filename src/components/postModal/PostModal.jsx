import React, { useRef, useState } from 'react'
import { AiOutlineClose } from "react-icons/ai"
import "./postModal.css"
import { usePost } from '../../context/PostContext';
import Picker from "emoji-picker-react";
import { BsImage } from "react-icons/bs"
import { GrEmoji } from "react-icons/gr"
import { RxCross2 } from "react-icons/rx"

export const PostModal = ({ post,setEditPostModal,setCreatePostModal }) => {
  const [ updatePost,setUpdatePost ] = useState(post || {});
  const { editUserPost,createNewPost } = usePost();
  const [ emojiPicker,setEmojiPicker ] = useState(false);
  const [ media,setMedia ] = useState(null);
  const imageRef = useRef();


  const handleUploadImage =()=>{
    imageRef.current.click();
  }

  const handleUploadPostImage=(e)=>{
      const file = e.target.files[0];
      setMedia(file);
  }
      
  const emojiClickHandler = (emojiObj) => {
    const emoji = emojiObj.emoji;
    const updatedContent = updatePost?.content ? updatePost?.content + emoji : emoji;
    setUpdatePost(prev=> ({...prev,content:updatedContent}));
    setEmojiPicker(false);
  };

  const buttonClickHandler =()=>{
    if(post){
      const image = media && URL.createObjectURL(media);
      editUserPost(post._id,updatePost?.content,image);
      setEditPostModal(false);
    }
    else{
      const image = media && URL.createObjectURL(media);
      createNewPost(updatePost?.content,image);
      setCreatePostModal(false);
    }
  }

  return (
    <div className='edit-post-container'>
      <div className='edit-post-modal'>    
        <div className="edit-post-modal-header">
            {post ? <h2>Edit Post</h2> : <h2>Create Post</h2>}
            <span
              className="close-icon"
              onClick={() =>
                post ? setEditPostModal(false) : setCreatePostModal(false)
              }
            >
              <AiOutlineClose/>
            </span>
        </div>
        <textarea
          className='post-modal-textarea'
          value={updatePost?.content}
          onChange={(e) =>
            setUpdatePost((prev) => ({
              ...prev,
              content: e.target.value,
            }))
          }
        ></textarea>
        {/* <div>
          <button onClick={()=> buttonClickHandler()}
            className='post-modal-btn'>{post ? "Update" : "Post"}</button>
        </div> */}
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
              <button
                className='post-modal-btn' 
                onClick={()=> buttonClickHandler()}>
                  {post ? "Update": "Post" }
              </button>
            </div>
      </div>
    </div>
  )
}
