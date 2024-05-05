import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Home() {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    adminRecords();
  }, []);

  const adminRecords = () => {
    axios.get('http://localhost:3000/auth/admin_records')
      .then(result => {
        if (result.data.Status) {
          setAdmins(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(error => {
        console.error('Error fetching admin records:', error);
        // alert('Error fetching admin records');
      });
  };

  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count')
      .then(result => {
        if (result.data.Status) {
          setAdminTotal(result.data.Result);
        }
      })
      .catch(error => {
        console.error('Error fetching admin count:', error);
        // alert('Error fetching admin count');
      });
  };

  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employee_count')
      .then(result => {
        if (result.data.Status) {
          setEmployeeTotal(result.data.Result);
        }
      })
      .catch(error => {
        console.error('Error fetching employee count:', error);
        // alert('Error fetching employee count');
      });
  };

  const salaryCount = () => {
    axios.get('http://localhost:3000/auth/salary_count')
      .then(result => {
        if (result.data.Status) {
          setSalaryTotal(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(error => {
        console.error('Error fetching salary count:', error);
        // alert('Error fetching salary count');
      });
  };

  return (
    <div>
      <div className="card font-bold text-zinc-800 flex gap-20 justify-center items-center">
        <div className="py-4 px-20 border border-red-900">
          <div className="text-center">
            <h4>Admin</h4>
          </div>
          <hr />
          <div className="">
            Total: {adminTotal}
          </div>
        </div>
        <div className="py-4 px-20 border border-red-900">
          <div className="text-center">
            <h4>Employee</h4>
          </div>
          <hr />
          <div className="">
            Total: {employeeTotal}
          </div>
        </div>
        <div className="py-4 px-20 border border-red-900">
          <div className="text-center">
            <h4>Salary</h4>
          </div>
          <hr />
          <div className="">
            Total: {salaryTotal}
          </div>
        </div>
       
      </div>
      <div className="my-4 px-12 px-4">
          <h3>List of Admins</h3>
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {admins.map((admin, index) => (
      <tr key={admin._id}>
        <td>{admin.email}</td>
        <td>
          <button className='rounded border border-zinc-800 hover:bg-green-900 px-2 py-4'>
            Edit
          </button>
          <button className='rounded border border-zinc-800 hover:bg-red-900 px-2 py-4'>
            Delete
          </button>
        </td>
      </tr>
    ))}
            </tbody>
          </table>
          </div>
    </div>
  );
}

export default Home;
