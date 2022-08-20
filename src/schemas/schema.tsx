import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string()
    .email('not email bro!')
    .required('email required bro!'),
  password: yup.string()
    .required('password required bro!')
    .min(6, 'min. 6 char bro!')
});

export default schema