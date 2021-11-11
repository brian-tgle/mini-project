import * as Yup from 'yup';

const today = new Date();
today.setHours(0, 0, 0, 0);

const expenseSchema = Yup.object().shape({
  category: Yup.string().required('Please select a category'),
  value: Yup.number().required('Please input a value'),
  title: Yup.string().required('Please input a location').max(500),
  date: Yup.date().required('Please input a Proposed date and time 1')
    .max(today, 'Date cannot be in the future')
});

export default expenseSchema;
