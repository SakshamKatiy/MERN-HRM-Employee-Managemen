

import React from 'react';
import Login from './Components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Employee from './Components/Employee';
import Category from './Components/Category';
import Profile from './Components/Profile';
import AddCategory from './Components/AddCategory';
import AddEmployee from './Components/AddEmployee';
import EditEmployee from './Components/EditEmployee';

function App() {
  return (
    <div className='w-full h-screen bg-zinc-800 text-white'>
      <BrowserRouter>
        <Routes>
          <Route path='/adminlogin' element={<Login />}></Route> 
          <Route path='/dashboard' element={<Dashboard />}>
          <Route path='' element={<Home />}></Route> 
          <Route path='/dashboard/employees' element={<Employee />}></Route>
          <Route path='/dashboard/category' element={<Category />} ></Route>
          <Route path='/dashboard/profile' element={<Profile />} ></Route>
          <Route path='/dashboard/add_category' element={<AddCategory />} ></Route>
          <Route path='/dashboard/add_employee' element={<AddEmployee />} ></Route>
          <Route path='/dashboard/edit_employee/:_id' element={<EditEmployee />} ></Route>
          </Route> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
