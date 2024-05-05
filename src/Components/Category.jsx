import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
function Category() {
  const [categoryPrint , setCategory] = useState([])
  useEffect(()=>{
axios.get('http://localhost:3000/auth/category').then(result=>{
  if(result.data.Status){
    setCategory(result.data.Result);
  }else{
    alert(result.data.error);
  }
}).catch(err=>console.log(err))
  },[])
  return (
    <div>
      <div className='text-center text-zinc-900 font-bold'>
        <h3>Category List</h3>
      </div>
      <Link to="/dashboard/add_category" className='border text-zinc-800 w-[10vw] h-[7vh]  font-bold rounded-md bg-green-500'>Add Category</Link>

      <div>
        <table className='text-zinc-800'>
          <thead>
            <tr>
              <th>
Name
              </th>
            </tr>
          </thead>
          <tbody>
            {
              categoryPrint.map(c=>(
                <tr key={c._id}>
                <td>{c.category}</td>
              </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Category
