import React from 'react'
import "./editImageModal.css"
import { AiOutlineClose } from "react-icons/ai";
import { avatarImages } from '../../assest/avatarImages';

export const EditImageModal = ({ setUpdatedProfile,setEditImageModal }) => {
  return (
    <div className="edit-image-modal-container">
      <div className="edit-image-modal">
        <div className="edit-image-modal-header">
          <h3>Edit Profile Image</h3>
          <span onClick={() => setEditImageModal(false)}>
            <AiOutlineClose/>
          </span>
        </div>
        <div className="images-container">
          {avatarImages?.map((avatar,index) => (
            <img
              src={avatar}
              key={index}
              alt="avatar"
              name="profileAvatar"
              value={avatar}
              onClick={() => {
                setUpdatedProfile((prev) => ({
                  ...prev,
                  avatarUrl: avatar,
                }));
                setEditImageModal(false);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
