import { useEffect, useState } from 'react';
import Select from 'react-select';

import { getDepartments, saveEmployee } from '../api';
import { validateEmployee } from '../utility/utils';

export default function RegistrationPage() {
  const [employeeNumber, setEmployeeNumber] = useState();
  const [employeeName, setEmployeeName] = useState('');
  const [doj, setDoj] = useState('');
  const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState();

  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const fetchDepartments = async () => {
    setIsDepartmentLoading(true);
    try {
      const res = await getDepartments();
      setDepartments(res);
    } catch (error) {
      setErrors([`error while loading departments`]);
    }

    setIsDepartmentLoading(false);
  };

  useEffect(() => {
    (async () => fetchDepartments())();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const employee = {
      employeeNumber,
      name: employeeName,
      dateOfJoining: doj,
      department: department.value,
      salary,
    };

    validateEmployee(employee)
      .then(() => {
        setErrors([]);
        saveEmployee(employee).then(() => {
          setSuccess(true);
        });
      })
      .catch((err) => setErrors(err.errors));

    console.log(employee);
  };

  const clearForm = () => {
    setErrors([]);
    setSuccess(false);
    setEmployeeNumber();
    setEmployeeName('');
    setDoj('');
    setDepartment('');
    setSalary();
  };

  const handleClear = (e) => {
    e.preventDefault();
    clearForm();
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div className='success'>
        <h1>User {employeeName} successfully registered!!</h1>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className='error'>
        {errors && errors.map((error) => <p key={error}>{error}</p>)}
      </div>
    );
  };

  return (
    <div>
      <div>
        <h1>User Registration</h1>
      </div>

      {errors.length > 0 && <div className='messages'>{errorMessage()}</div>}
      {success && <div className='success'>{successMessage()}</div>}

      <form>
        <div className='form-group'>
          <label className='label'>Employee Number</label>
          <input
            onChange={(e) => setEmployeeNumber(e.target.value)}
            className='input'
            value={employeeNumber}
            type='number'
          />
        </div>

        <div className='form-group'>
          <label className='label'>Employee Name</label>
          <input
            onChange={(e) => setEmployeeName(e.target.value)}
            className='input'
            value={employeeName}
            type='string'
          />
        </div>

        <div className='form-group'>
          <label className='label'>Date of joining</label>
          <input
            onChange={(e) => setDoj(e.target.value)}
            className='input'
            value={doj}
            type='date'
            // min={new Date().toISOString().slice(0, 10)}
          />
        </div>

        <div className='form-group'>
          <label className='label'>Department</label>
          <Select
            className='department-select'
            isLoading={isDepartmentLoading}
            options={departments}
            value={department}
            onChange={(value) => setDepartment(value)}
          />
        </div>

        <div className='form-group'>
          <label className='label'>Salary</label>
          <input
            onChange={(e) => setSalary(e.target.value)}
            className='input'
            value={salary}
            type='number'
          />
        </div>

        <div className='actionContainer'>
          <button onClick={handleSubmit} className='btn' type='submit'>
            Save
          </button>
          <button onClick={handleClear} className='btn'>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
