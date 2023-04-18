import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import PasswordRecovery from './pages/PasswordRecovery';
import CSVUpload from './pages/CSVUpload';


function App() {
  return (<Router>
    <Routes>
      <Route exact path='/login' element={<Login />}/>
      <Route exact path='/recover-password' element={<PasswordRecovery />}/>  
      <Route exact path='/csv-upload' element={<CSVUpload />}/> 
    </Routes>
  </Router>);
}

export default App;


