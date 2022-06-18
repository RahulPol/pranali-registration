import * as yup from 'yup';

const schema = yup.object().shape({
  employeeNumber: yup.number().required().positive().max(9999999999),
  name: yup.string().required().max(100),
  dateOfJoining: yup.date().required(), //.min(new Date()),
  department: yup.string().required(),
  salary: yup.number().required().positive(),
});

export const validateEmployee = (employee) =>
  schema.validate(employee, { abortEarly: false });
