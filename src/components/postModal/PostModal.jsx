import React, { useState } from 'react'
import { AiOutlineClose } from "react-icons/ai"
import "./postModal.css"
import { usePost } from '../../context/PostContext';

export const PostModal = ({ post,setEditPostModal,setCreatePostModal }) => {
  const [ updatePost,setUpdatePost ] = useState(post || {});
  const { editUserPost,createNewPost } = usePost();

  const buttonClickHandler =()=>{
    if(post){
      editUserPost(post._id,updatePost?.content);
      setEditPostModal(false);
    }
    else{
      createNewPost(updatePost?.content);
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
        <div>
          <button onClick={()=> buttonClickHandler()}
            className='post-modal-btn'>{post ? "Update" : "Post"}</button>
        </div>
      </div>
    </div>
  )
}
