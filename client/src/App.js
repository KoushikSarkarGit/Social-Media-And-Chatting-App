import './App.css';
import MyContextPool from './ContextFolder/MyContextPool';

import ExplorePage from './pages/ExplorePage';
import Home from './pages/Home';
import Loginpage from './pages/Loginpage';
import Profilepage from './pages/Profilepage';
import SignUpPage from './pages/SignUpPage';
import { Routes, Route } from 'react-router-dom'
import TimelinePage from './pages/TimelinePage';
import ViewPostpage from './pages/ViewPostpage';
import UserProfile from './pages/UserProfile';
import PageNotFound from './pages/PageNotFound';
import MobileEditProfile from './pages/MobileEditProfile';
import MtrendingPage from './pages/MtrendingPage';
import MobileFollowers from './pages/MobileFollowers';
import MobileFindNewPeople from './pages/MobileFindNewPeople';






function App() {
  return (

    <MyContextPool>
      <div className="mainapp" style={{ overflowX: 'auto' }}>
        <div className="backgroundblur" style={{ top: '-18%', right: '0%' }}    ></div>
        <div className="backgroundblur" style={{ top: '37%', left: '-10%' }}    ></div>
        <div className="backgroundblur2" style={{ top: '-30%', left: '-15%', backgroundColor: 'rgba(113, 198, 255, 0.664)' }}    ></div>
        <div className="backgroundblur2" style={{ top: '42%', right: '0%', width: '17rem', filter: 'blur(98px)', backgroundColor: 'rgba(122, 202, 255, 0.511)' }}></div>

        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profilepage />} />
          <Route path='/login' element={<Loginpage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/explore/:type/:keyword' element={<ExplorePage />} />
          <Route path='/explore' element={<ExplorePage />} />
          <Route path='/timeline' element={<TimelinePage />} />
          <Route path='/m/editprofile' element={<MobileEditProfile />} />
          <Route path='/m/trending' element={<MtrendingPage />} />
          <Route path='/m/followers' element={<MobileFollowers />} />
          <Route path='/m/findnewpeople' element={<MobileFindNewPeople />} />
          <Route path='/viewpost/:postId' element={<ViewPostpage />} />
          <Route path='/view-user-profile/:viewOtherUserProfileuserId' element={<UserProfile />} />



          <Route path='*' element={<PageNotFound />} />
        </Routes>

      </div>
    </MyContextPool>
  );
}

export default App;
