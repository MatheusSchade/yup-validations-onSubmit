
import Link from "next/link"
import React from 'react'
import HeadData from "../components/HeadData"
import useStore from '../stores/useStore'
import schema from "../validations/schemas"
import { runValidation } from '../validations/utils'

// ValidateOptions {
//   strict: boolean = false; //(default)
//   // quando verdadeiro, a análise é ignorada e a entrada é validada "como está". Default false
//   abortEarly: boolean = true; //(default)
//   // true(default): lança todos os erros 
//   // false .validate({list of data to validate}, {abortEarly: false}): lança apenas o primeiro erro encontrado
//   stripUnknown: boolean = false; //(default)
//   // Remove chaves não especificadas de objetos
//   recursive: boolean = true; //(default)
//   // quando `false`, as validações serão executadas superficialmente
//   context ?: object; //(default)
//   // Valores externos que podem ser fornecidos para validações e condicionais
// }

const UserForm = () => {
  const addUser = useStore((state => state.addUser))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let name = (e.target as any).name.value
    let email = (e.target as any).email.value
    let age = (e.target as any).age.value
    let password = (e.target as any).password.value

    let schemaErrors: any = await runValidation(schema, { name, email, age, password })

    if (!(schemaErrors as any)?.length) {
      addUser({ name, email, age, password })
    } else {
      alert(schemaErrors[0])
    }
  }

  return (
    <div className='flexCol'>
      <HeadData />

      <main>
        <form className='flexCol' onSubmit={onSubmit}>
          <input type="text" name="name" placeholder='Insira o nome' />
          <input type="text" name="email" placeholder='Insira o e-mail' />
          <input type="number" name="age" placeholder='Insira a idade' />
          <input type="number" name="password" placeholder='Insira a senha' />
          <button type='submit'>Create User</button>
        </form>
        <Link href="/">
          <a>
            <button>Home</button>
          </a>
        </Link>
      </main>
    </div>
  )
}

export default UserForm
