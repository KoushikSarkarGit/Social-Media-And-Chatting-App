import './App.css';
import MyContextPool from './ContextFolder/MyContextPool';
import Timelinecomponent from './components/Timelinecomponent';
import ExplorePage from './pages/ExplorePage';
import Home from './pages/Home';
import Loginpage from './pages/Loginpage';
import Profilepage from './pages/Profilepage';
import SignUpPage from './pages/SignUpPage';
import { Routes, Route } from 'react-router-dom'
import TimelinePage from './pages/TimelinePage';


function App() {
  return (

    <MyContextPool>
      <div className="mainapp">
        <div className="backgroundblur" style={{ top: '-18%', right: '0%' }}    ></div>
        <div className="backgroundblur" style={{ top: '37%', left: '-10%' }}    ></div>

        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profilepage />} />
          <Route path='/login' element={<Loginpage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/explore' element={<ExplorePage />} />
          <Route path='/timeline' element={<TimelinePage />} />


        </Routes>

      </div>
    </MyContextPool>
  );
}

export default App;
