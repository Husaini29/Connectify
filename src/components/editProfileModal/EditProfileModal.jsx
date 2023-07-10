import React, { useState } from 'react'
import { AiFillCamera, AiOutlineClose } from "react-icons/ai"
import "./editProfileModal.css"
import { useUser } from '../../context/UserContext'
import { EditImageModal } from '../editImageModal/EditImageModal'

export const EditProfileModal = ({ selectedUser,setEditProfileModal }) => {
    const { editUserProfile } = useUser();
    const [updatedProfile, setUpdatedProfile] = useState({
        firstName: selectedUser?.firstName,
        lastName: selectedUser?.lastName,
        bio: selectedUser?.bio,
        website: selectedUser?.website,
        avatarUrl: selectedUser?.avatarUrl || "/images/avatar.png",
      }); 

      const [ editImageModal,setEditImageModal ] = useState(false);
      const updateProfileDetails = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile((prev) => ({ ...prev, [name]: value }));
      };

      const updateProfileHandler = () => {
        editUserProfile(updatedProfile);
        setEditProfileModal((editProfileModal) => !editProfileModal);
      };

  return (
    <div className="edit-profile-modal-container">
      <div className="edit-profile">
        {editImageModal && (
          <EditImageModal
            setUpdatedProfile={setUpdatedProfile}
            setEditImageModal={setEditImageModal}
          />
        )}
        <div className="edit-profile-header">
          <h2>Edit Profile</h2>
          <span onClick={() => setEditProfileModal(false)}>
            <AiOutlineClose/>
          </span>
        </div>
        <div className="edit-image-bgImage-container">
          <div className='edit-image-container'>
            <div className="edit-image">
              <img
                className="avatar"
                src={updatedProfile?.avatarUrl}
                alt="avatar"
              />
              
                <span onClick={()=> setEditImageModal(true)}
                    className='edit-image-icon'>
                    <AiFillCamera/>
                </span>
            </div>
          </div>
        </div>
        <div className="edit-user-details">
          <div className="edit-name">
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={updatedProfile?.firstName}
                onChange={updateProfileDetails}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={updatedProfile?.lastName}
                onChange={updateProfileDetails}
              />
            </div>
          </div>
          <div className="edit-website">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="text"
              name="website"
              value={updatedProfile?.website}
              onChange={updateProfileDetails}
            />
          </div>
          <div className="edit-bio">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              placeholder="bio"
              name="bio"
              value={updatedProfile?.bio}
              onChange={updateProfileDetails}
            />
          </div>
        </div>
        <button className='update-profile-btn'
            onClick={updateProfileHandler}>Update</button>
      </div>
    </div>
  )
}
