import React, { useState } from 'react';
import './compents/style/style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogIn from './compents/Login/Login';
import Signup from './compents/Sigin-up/Sigin';
import TaskList from './compents/Tasker/Tasker'
// import SideNavBar from './compents/SideNavBar/SideNav';



function App() {

  const [tasks, setTasks] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
           <Route path='/'  element={<LogIn/>}/>   
           <Route path='/Signup'  element={<Signup/>}/>  
           <Route path='/TaskList'  element={<TaskList tasks={tasks} setTasks={setTasks} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;

