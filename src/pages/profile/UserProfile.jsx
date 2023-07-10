import React,{useState} from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../../context/UserContext';
import { FiLogOut } from "react-icons/fi"
import "./userprofile.css"
import { usePost } from '../../context/PostContext';
import { PostCard } from '../../components/postCard/PostCard';
import { Left } from '../home/component/left/Left';
import { Right } from '../home/component/right/Right';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { EditProfileModal } from '../../components/editProfileModal/EditProfileModal';
import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';

export const UserProfile = () => {

    const { username } = useParams();
    const { logoutHandler } = useAuth();
    const { currentUser,token } = useAuth();
    const { userState:{ users },followingUser,unfollowingUser,isFollowed } = useUser();
    const { postState:{ posts} } = usePost();
    const navigate = useNavigate();
    const [editProfileModal, setEditProfileModal] = useState(false);

    const selectedUser = users?.find((user)=> user.username === username);
    const userPost = posts?.filter(post => post.username === selectedUser.username)
    const { _id,firstName,lastName,avatarUrl,bio,website } = selectedUser;

    const followClickHandler =()=>{
        if(token) {
            if(isFollowed(_id)){
              unfollowingUser(selectedUser);
            } else {
              followingUser(selectedUser);
            }
          } else {
            toast.error("Please login to follow");
            navigate("/login");
          }    
    }
  return (
    <div>
        <Header/>
        <div style={{ display:"flex"}}>
            <Left/>
    <div style={{ width:"50%"}}>
        <div key={_id} className='userprofile-container'>
            <div className='user-post-card'>
                <span>
                    <img src={avatarUrl || "/images/avatar.png"} className='user-avatar' alt='userProfile'/>
                </span>
                <div>
                    <div className='user-details'>
                        <p className='user-fullName'>{firstName} {lastName}</p>
                    </div>
                        <p className='user-username'>@{selectedUser.username}</p>
                </div>
            </div>
            <div className='edit-profile-details'>
                <span>
                    { username === currentUser?.username ?(
                        <div>
                            <button className='edit-btn' onClick={()=>setEditProfileModal(true)}>Edit Profile</button>
                            {editProfileModal && (
                                <EditProfileModal
                                selectedUser={selectedUser}
                                setEditProfileModal={setEditProfileModal}
                                />
                            )}
                        </div>
                    ) : (
                        <button className='edit-btn'
                            onClick={()=> followClickHandler()}
                        >
                            {isFollowed(_id)
                            ? "UnFollow"
                            : "Follow"}
                        </button>
                    )
                }
                </span>
                <span onClick={logoutHandler}
                    className='logout-span'>
                    <FiLogOut/>
                </span>
            </div>
            <div className='user-bio-website'>
                <p>{bio}</p>
                <NavLink className="website">{website}</NavLink>
            </div>
            <div>
                <p className='following-details'>
                    <span>{selectedUser?.following?.length}</span>
                    <span>Following</span>
                    <span>{selectedUser?.followers?.length}</span>
                    <span>Follower</span>
                </p>
            </div>
            <hr/>
        </div>
        {
            userPost.map(post=>
                <PostCard key={post._id} post={post}/>)
        }    
    </div>
        <Right/>
    </div> 
    <Footer/>   
    </div>    
  )
}
