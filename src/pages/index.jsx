import HeadData from '../components/HeadData'
import React, { useEffect } from 'react'
import { checkValidation, runValidation } from '../utils/utils.tsx';
import schema from "../schemas/schema"
import initialState from "../contexts/initialState"
import reducer from '../contexts/reducer'
import { setState } from '../contexts/alias'
import { useReducer } from "react"

const Home = () => {
  const [{ field, // dados que estão dentro dos inputs de email e password
    error, // objeto com os erros daquele input
    touched, // define se o input foi tocado ou não (se tocado, vai deixar exibir a mensagem de erro, do contrário, não exibirá)
    isValid
    // usando reducer, ao invés de passar o state, já passas os itens do state desestruturados
  }, dispatch] = useReducer(reducer, initialState);

  const handleChange = async ({ target: { name, value } }) => { // ao inves de receber o event, já recebe o target desestruturado
    const schemaErrors = await runValidation(schema, { ...field, [name]: value }); // executa a validação e coloca os erros em uma variável

    dispatch({
      type: setState, // tipo da função a executar (ver switch case do reducer) // nesse caso, só vai adicionar o payload ao estado
      payload: {
        error: schemaErrors,
        field: { ...field, [name]: value },
        touched: { ...touched, [name]: true },
        isValid: checkValidation(schemaErrors)
      }
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert(`email: ${field.email} and password: ${field.password}`);
  }

  // useEffect(() => {
  //   console.log('field', field)
  // }, [field])

  return (
    <>
      <HeadData />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={field.email}
          onChange={handleChange}
        />
        {(touched && touched.email) && (error && error.email) && (
          <i>
            {error.email}
          </i>
        )}
        <br />
        <input
          type="password"
          name="password"
          value={field.password}
          onChange={handleChange}
        />
        {(touched && touched.password) && (error && error.password) && (
          <i>
            {error.password}
          </i>
        )}
        <br />
        <button type="submit" disabled={!isValid}>Login</button>
      </form>
    </>
  );
}

export default Home