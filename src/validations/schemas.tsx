import * as yup from 'yup';

const minCharacters = 6
const maxCharacters = 10

const errorMessages = {
  name: 'É necessário digitar um nome válido para continuar',
  email: 'Insira um e-mail válido para continuar',
  age: 'Digite uma idade válida',
  password: {
    min: `Sua senha deve ter pelo menos ${minCharacters} caracteres`,
    max: `Sua senha deve ter no máximo ${maxCharacters} caracteres`,
    default: `É obrigatório preencher a senha para continuar`
  },
}

const schema = yup.object().shape({
  name: yup.string().required(errorMessages.name),
  email: yup.string().email(errorMessages.email).required(errorMessages.email),
  age: yup.string().required(errorMessages?.age),
  password: yup.string()
  .required(errorMessages.password.default)
  .min(minCharacters, errorMessages.password.min)
  .max(maxCharacters, errorMessages.password.max)
})

export default schema

