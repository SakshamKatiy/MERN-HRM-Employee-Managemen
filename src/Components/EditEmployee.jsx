import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditEmployee = () => {
    const {_id} = useParams()
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        salary: '',
        address: '',
        phone: '',
        category: '',
        
      });
      const [category , setCategory] = useState([])
      const navigate = useNavigate()
      useEffect(()=> {
        axios.get('http://localhost:3000/auth/category')
        .then(result => {
            if(result.data.Status) {
                setCategory(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
        axios.get(`http://localhost:3000/auth/employees/${_id}`)
        .then(result => {
          
          
              const employeeData = result.data.Result;
        setEmployee({
          ...employee,
          name: employeeData.name,
          email: employeeData.email,
          address: employeeData.address,
          salary: employeeData.salary,
          phone: employeeData.phone,
          category: employeeData.category._id,
        });
      }).catch(err => console.log(err))
    }, [_id]);
    const handleSubmit = (e) => {
      e.preventDefault()
      axios.put(`http://localhost:3000/auth/edit_employee/${_id}`, employee)
      .then(result => {
          if(result.data.Status) {
              navigate('/dashboard/employees')
          } else {
              alert(result.data.Error)
          }
      }).catch(err => console.log(err))
  }
  return (
    <div>
    <div className='bg-zinc-600 h-screen text-4xl'>
      <div className='h-80 border w-[41.5vh] border-slate-600 mx-[75vh]'>
        <h2 className=' text-center'>Add Employee</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" name='name' placeholder='Enter Your Name' className='text-zinc-800' value={employee.name} onChange={(e) => setEmployee({ ...employee, name: e.target.value })} />

          <label htmlFor="email">Email</label>
          <input type="email" name='email' placeholder='Enter Your Email' className='text-zinc-800' value={employee.email} onChange={(e) => setEmployee({ ...employee, email: e.target.value })} />

          

          <label htmlFor="salary">Salary</label>
          <input type="number" name='salary' placeholder='Enter Salary' className='text-zinc-800' value={employee.salary} onChange={(e) => setEmployee({ ...employee, salary: e.target.value })} />

          <label htmlFor="address">Address</label>
          <input type="text" name='address' placeholder='Enter Address' className='text-zinc-800' value={employee.address} onChange={(e) => setEmployee({ ...employee, address: e.target.value })} />

          <label htmlFor="phone">Phone</label>
          <input type="text" name='phone' placeholder='Enter Phone Number' className='text-zinc-800' value={employee.phone} onChange={(e) => setEmployee({ ...employee, phone: e.target.value })} />

          <label htmlFor="category">Category</label>


      

<select name="category" id="category" className='text-zinc-800' value={employee.category} onChange={(e) => setEmployee({ ...employee, category: e.target.value })}>
{category.map((c) =>  {
  return <option key={c._id} value={c._id}>{c.category}{c.name}</option>;
})}
</select>




          {/* <label htmlFor="image">Select image</label>
          <input type="file" name='image' className='text-zinc-800' onChange={(e) => setEmployee({...employee,image:e.target.files[0]})}/> */}

          <button className='bg-slate-900 rounded-lg text-zinc-800'>Edit Employee</button>
        </form>
      </div>
    </div>
  </div>
);
}
  

export default EditEmployee
