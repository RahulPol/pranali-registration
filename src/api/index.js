import axios from 'axios';

export const getDepartments = () => {
  // TODO: replace with api call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { value: 'AD', label: 'Administration' },
        { value: 'IT', label: 'Information Technology' },
        { value: 'HD', label: 'Help Desk' },
      ]);
    }, 2000);
  });
};

export const saveEmployee = (emp) => {
  console.log(`employee: ${JSON.stringify(emp)}`);
  // TODO: replace with api call
  return new Promise((resolve, reject) => {
    resolve({ response: 'employee saved successfully' });
  });
};
