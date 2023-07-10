import './App.css';
import Mockman from "mockman-js";
import { Routes, Route } from "react-router-dom";
import { Home } from './pages/home/Home';
import { Login } from './pages/login/Login';
import { Signup } from './pages/login/Signup';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { UserProfile } from './pages/profile/UserProfile';
import { Bookmark } from './pages/bookmark/Bookmark';
import { LikedPost } from './pages/likedpost/LikedPost';
import { Explore } from './pages/explore/Explore';
import { SinglePost } from './pages/singlePost/SinglePost';
import { Toaster } from 'react-hot-toast';
import { Error } from './pages/error/Error';
import { RequireAuth } from './components/auth/RequireAuth';

function App() {
  return (
    <div className="App">
       <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{ top: "10%" }}
      />
      <Routes>
        <Route path="/mockman" element={<Mockman/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route element={<RequireAuth/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/post/:postId" element={<SinglePost/>}/>
          <Route path="/likedpost" element={<LikedPost/>}/>
          <Route path="/bookmark" element={<Bookmark/>}/>
          <Route path="/profile/:username" element={<UserProfile/>}/>
        </Route>
        <Route path="/explore" element={<Explore/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
