import React from 'react'
import "./right.css"
import { useUser } from '../../../../context/UserContext'
import { useAuth } from '../../../../context/AuthContext';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Right = () => {

  const { userState:{ users },fetchAllUsers,followingUser } = useUser();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const userData = users?.find(
    (user) => user.username === currentUser?.username
  );

  const suggestedUsers = users
  ?.filter((user) => user.username !== userData?.username)
  ?.filter(
    (eachUser) =>
      !userData?.following?.find(
        (data) => data.username === eachUser.username
      )
  );

  useEffect(()=>{
    fetchAllUsers();
  },[]);


  const followingHandler=(user)=>{
    followingUser(user);
  }

  return (
    <div style={{ width:"24%" }}>
    <div className='right-container'>
      <div className='right-wrapper'>
        <h3>Suggestion for you</h3>
    
        {
          suggestedUsers.map(user=>{
            const { _id,firstName,lastName,username,avatarUrl } = user;
            return(
              <React.Fragment key={_id}>
                <div className='suggested-users'>
                  <img className="suggested-user-image" src={avatarUrl || "/images/avatar.png"} alt={firstName} onClick={()=> navigate(`/profile/${username}`)}/>
                  <div className='suggested-user-details' onClick={()=> navigate(`/profile/${username}`)}>
                    <p className='user-name'>{firstName} {lastName}</p>
                    <p className='user-name'>@{username}</p>
                  </div>
                  <button onClick={()=> followingHandler(user)}
                    className='follow-btn'>Follow</button>
              </div>
              <hr/>
              </React.Fragment>
            )
          })
        }
      </div>
    </div>
    </div>
  )
}
