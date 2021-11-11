import * as Yup from 'yup';

const categorySchema = Yup.object().shape({
  title: Yup.string().required('Please input title').max(100),
  description: Yup.string().required('Please input description').max(100)
});

export default categorySchema;
