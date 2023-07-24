import './App.css';
import Home from './pages/Home';
import Loginpage from './pages/Loginpage';
import Profilepage from './pages/Profilepage';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <div className="mainapp">

      <div className="backgroundblur" style={{ top: '-18%', right: '0%' }}    ></div>
      <div className="backgroundblur" style={{ top: '37%', left: '-10%' }}    ></div>

      {/* <Home /> */}
      <Profilepage />
      {/* <Loginpage /> */}
      {/* <SignUpPage /> */}
    </div>
  );
}

export default App;
