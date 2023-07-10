import React, { useState } from 'react'
import "./header.css"
import { useAuth } from '../../context/AuthContext'
import { FiLogOut } from "react-icons/fi"
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'

export const Header = () => {
  const[ searchInput,setSearchInput ] = useState("")
  const[ searchedUser,setSearchedUser ] = useState([])
  const { userState:{users} } = useUser();

  const { logoutHandler } = useAuth();
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setSearchInput(e.target.value);

    const searchedResults = users?.filter(
      (user) =>
        user?.firstName?.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user?.lastName?.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user?.username?.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchedUser(searchedResults);
  };
  
  const clearInput = () => {
    setSearchInput("");
    setSearchedUser([]);
  };

  return (
    <div className='header-container'>
        <h3 onClick={()=> navigate("/")}>Connectify</h3>
        <input
          type="text"
          onChange={inputHandler}
          value={searchInput}
          placeholder='Search User...'
          className='search-input'/>
          
          <div className='user-list-container'>
          {
            searchInput.length > 0 && searchedUser.length >0 ? (
                <div className='users-list'>
                  {
                    searchedUser?.map(
                      ({ _id, firstName, lastName, username, avatarUrl })=>{
                        return (
                          <li key={_id} className="searched-user">
                            <div
                              className="searched-users-profile"
                              onClick={() => {
                                navigate(`/profile/${username}`);
                                clearInput();
                              }}
                            >
                              <img
                                className="user-avatar"
                                src={avatarUrl || "/images/avatar.png"}
                                alt="avatar"
                              />
                              <div className="searched-name">
                                <span>
                                  {firstName} {lastName}
                                </span>
                                <small>@{username}</small>
                              </div>
                            </div>
                            <hr/>
                          </li>
                        );
                      }
                    )
                  }
                </div>
            ) :(
              searchInput.length >0 && (
              <div className='users-list'>
                <p className='user-not-found'>User not found</p>
              </div>
              )
              )
            }
          </div>

        <span className='logout' onClick={logoutHandler}>
          <FiLogOut/>
        </span>
    </div>
  )
}
