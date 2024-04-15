import './App.css';
import React from 'react';
import Forms from './components/Forms/index'
import Room from './pages/Room';
import {Route, Routes} from "react-router-dom";

const App=()=> {
  return (
    <div className="container">
      {/* <Routes>
        <Route path ="/" component = {<Forms />} />
        <Route path = "/room" element={<Room />} />
      </Routes> */}
      <Room />
    </div>
  );
}

export default App;
