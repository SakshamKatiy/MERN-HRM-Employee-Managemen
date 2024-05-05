import React from 'react';
import { Link ,Outlet, useNavigate} from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate()
  axios.defaults.withCredentials=true
  const  handleLogout =()=>{
axios.get('http://localhost:3000/auth/logout').then(result=>{
  if(result.data.Status){
    navigate('/adminlogin')
  }
})
  }
  return (
    <div className="w-full h-screen bg-zinc-300">
      <div className='flex'>
     
          <div className='h-screen w-1/6 bg-zinc-400 drop-shadow-2xl font-bold'>
            <Link to="/dashboard " className='mx-16 '>Employee details</Link>

            {['Dashboard', 'Employees', 'Category', 'Profile', 'Logout'].map((item, index) => (
              
                  <li key={index} className='text-zinc-900  text-lg flex justify-center items-center my-10' onClick={index === 4 ? handleLogout : undefined}>
                  <Link to={index=== 0 ? "/dashboard":`/dashboard/${item.toLowerCase()}`}>{item}</Link>

                    
                  </li>
                
            ))}
          </div>
          <div className='w-5/6'>
         <div className=" h-16 bg-zinc-500 py-4 drop-shadow-2xl font-bold gap-4 text-center ">
          <h4 className='text-black text-lg drop-shadow-md '>Employee Management System</h4>
          </div>
          <Outlet />
          
        </div>

        
      </div>
    </div>
  );
}

export default Dashboard;
