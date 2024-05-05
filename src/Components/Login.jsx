import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/auth/adminlogin', values)
  .then(result => {
    if (result.data.loginStatus) {
      navigate('/dashboard');
    } else {
      console.log('Error message:', result.data.Error);
      setError("Wrong email or password");
    }
  })
  .catch(err => {
    console.error('Error:', err);
    setError("Wrong email or password");

  });

  
  };

  return (
    <div>
      <div className='bg-zinc-600 h-screen text-4xl py-20 bg-[url("https://cdn.wallpapersafari.com/22/70/oZCrvS.jpeg")]'>
        <div className='h-80 border w-[41.5vh] border-slate-600 mx-[75vh]'>
     

          <h2 className='my-5 text-center'>Login Page</h2>
          <div className={error ? "text-red-700" : ""}>
  {error && error}
</div>
          <form action="" onSubmit={handleSubmit}>
            {['Email', 'Password'].map((item, index) => (
              <div key={index}>
                <label htmlFor={item.toLowerCase()}>{item}:</label> 
                <input
                  type={index === 0 ? 'email' : 'password'}
                  className='rounded-lg text-pink-500 my-2'
                  autoComplete='off'
                  id={item.toLowerCase()} 
                  name={index === 0 ? 'email' : 'password'}
                  placeholder={`Enter your ${item}`}
                  onChange={(e) => index === 0 ? setValues({ ...values, email: e.target.value }) : setValues({ ...values, password: e.target.value })}
                />
              </div>
            ))}
            <button type="submit" className='bg-blue-800 rounded-xl w-[41vh]'>Submit</button>
          </form>
          <div className="my-3 text-xl">
            <input type="checkbox" className='w-5 h-4' name="tick" id="tick" />
            <label htmlFor="tick" className='mx-2'>You are Agree with terms & conditions</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
