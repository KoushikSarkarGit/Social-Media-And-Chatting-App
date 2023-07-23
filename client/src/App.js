import './App.css';
import Home from './pages/Home';
import Profilepage from './pages/Profilepage';

function App() {
  return (
    <div className="mainapp">

      <div className="backgroundblur" style={{ top: '-18%', right: '0%' }}    ></div>
      <div className="backgroundblur" style={{ top: '37%', left: '-10%' }}    ></div>

      <Home />
      {/* <Profilepage /> */}
    </div>
  );
}

export default App;
