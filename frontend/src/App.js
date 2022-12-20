import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AllUser from './components/AllUser';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Task from './components/Task';

const App = () => {
  return (
    <>
      <Navbar></Navbar>
      <Route path="/">
        <Home />
      </Route>
    </>
  );
};

export default App;
