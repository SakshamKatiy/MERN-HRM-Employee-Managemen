import React ,{useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
function AddCategory() {
    const [category,setCategory] = useState()
    const navigate = useNavigate()
    const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:3000/auth/add_category',{category}).then(result=>{
      if(result.data.Status){
navigate('/dashboard/category')
      }else{
        alert(result.data.Error)
      }
    })
    .catch(err=>console.log(err))
}
    
  return (
    <div>
      <div className='bg-zinc-600 h-screen text-4xl py-20 '>
        <div className='h-80 border w-[41.5vh] border-slate-600 mx-[75vh]'>
     

          <h2 className='my-5 text-center'>Add Category</h2>
        
         
         <form action="" onSubmit={handleSubmit}>
            <label htmlFor="Category">Category</label>
            <input type="text" name='category' placeholder='Enter Category' onChange={(e)=>setCategory(e.target.value)} className='text-zinc-800'/>
            <button>Add </button>
         </form>
        </div>
      </div>
    </div>
  )
}

export default AddCategory
