import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    password: '',
    salary: '',
    address: '',
    phone: '',
    category: '',
    image: null
  });

  const [categoryPrint, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/auth/category')
      .then(result => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', employee.name);
            formData.append('email', employee.email);
            formData.append('password', employee.password);
            formData.append('salary', employee.salary);
            formData.append('address', employee.address);
            formData.append('phone', employee.phone);
            formData.append('category', employee.category);
            formData.append('image', employee.image);

      await axios.post('http://localhost:3000/auth/add_employee', formData)
      // navigate('/dashboard/employees', { replace: true });
      .then(result=>{
        if(result.data.Status) {
          navigate('/dashboard/employees')
      } else {
          alert(result.data.Error)
      }
      })
    } catch (error) {
      console.error(error);
      alert('Failed to add employee');
    }
  };



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

            <label htmlFor="password">Password</label>
            <input type="password" name='password' placeholder='Enter Password' className='text-zinc-800' value={employee.password} onChange={(e) => setEmployee({ ...employee, password: e.target.value })} />

            <label htmlFor="salary">Salary</label>
            <input type="number" name='salary' placeholder='Enter Salary' className='text-zinc-800' value={employee.salary} onChange={(e) => setEmployee({ ...employee, salary: e.target.value })} />

            <label htmlFor="address">Address</label>
            <input type="text" name='address' placeholder='Enter Address' className='text-zinc-800' value={employee.address} onChange={(e) => setEmployee({ ...employee, address: e.target.value })} />

            <label htmlFor="phone">Phone</label>
            <input type="text" name='phone' placeholder='Enter Phone Number' className='text-zinc-800' value={employee.phone} onChange={(e) => setEmployee({ ...employee, phone: e.target.value })} />

            <label htmlFor="category">Category</label>


        

<select name="category" id="category" className='text-zinc-800' value={employee.category} onChange={(e) => setEmployee({ ...employee, category: e.target.value })}>
  {categoryPrint.map((c) =>  {
    return <option key={c._id} value={c._id}>{c.category}{c.name}</option>;
  })}
</select>




            <label htmlFor="image">Select image</label>
            <input type="file" name='image' className='text-zinc-800' onChange={(e) => setEmployee({...employee,image:e.target.files[0]})}/>

            <button className='bg-slate-900 rounded-lg text-zinc-800'>Add Employee</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
