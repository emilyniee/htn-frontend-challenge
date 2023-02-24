import './App.css';
import Login from './components/Login';
import Events from './components/Events';
import GuestEvents from './components/GuestEvents';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Login />}/>
          <Route path = "/events" element = {<Events />}/>
          <Route path = "/guest-events" element = {<GuestEvents />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
