import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios'
function Employee() {
  const [ employee,setEmployee]=useState([])
  useEffect(()=>{
    axios.get('http://localhost:3000/auth/employees').then(result=>{
      if(result.data.Status){
        setEmployee(result.data.Result);
      }else{
        alert(result.data.error);
      }
    }).catch(err=>console.log(err))
      },[]);
      const handleDelete = (_id)=>{
        axios.delete(`http://localhost:3000/auth/delete_employee/${_id}`).then(result =>{
          if(result.data.Status){
            window.location.reload()
          }else{
            alert(result.data.Error)
          }
        })
      }
  return (
    <div>
      <div className='text-center text-zinc-900 font-bold'>
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className='border text-zinc-800 w-[10vw] h-[7vh]  font-bold rounded-md bg-green-500'>Add Employee</Link>

      <div>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
Name
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
Email
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
Address
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
Salary
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
Phone
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
Image
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
Action
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {
              employee.map(e=>(
                <tr key={e._id}>
                <td className='px-6 py-4 whitespace-nowrap text-gray-900'>{e.name}</td>
                <td className='text-sm font-medium text-gray-900'>{e.email}</td>
                <td className='text-sm font-medium text-gray-900'>{e.address}</td>
                <td className='text-sm font-medium text-gray-900'>{e.salary}</td>
                <td className='text-sm font-medium text-gray-900'>{e.phone}</td>
                
                <td><img className='h-12 w-12 rounded-full' src={`http://localhost:3000/Images/${e.image}`} alt="" /></td>
                

                
                <td className='bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
  <Link to={`/dashboard/edit_employee/${e._id}`}>Edit</Link>
</td>

              
                  <td>                  <button className='bg-red-500 hover:bg-red-900 text-white font-bold py-2 px-4 rounded' onClick={()=>handleDelete(e._id)}>Delete</button>
                </td>
              </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Employee
