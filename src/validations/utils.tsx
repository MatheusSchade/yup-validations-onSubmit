export const typeToFormErrors = (err: any) => {
  let errors = []
  err.inner.forEach((item: any) => {
    errors.push(item?.message)
  })
  return errors
}

export const runValidation = (schema: any, values: any) => (
  new Promise((resolve, reject) => { // reject não será usada aqui
    // a primeira função é a resolve, que decide o que fazer
    schema.validate(values, { abortEarly: false }) // { abortEarly: false } retorna apenas o primeiro erro encontrado 
      .then(() => { // validate é uma função do yup
        resolve({}); // função da promise que torna acessível o parâmetro, após a conclusão da promise
        // se cair aqui, não faremos nem exiberemos nada
      })
      .catch((err: any) => {
        // se cair no erro, chamaremos a função typeToFormErrors para poder retornar as mensagens de erro
        resolve(typeToFormErrors(err)); // resolve vai retornar o objeto de erros retornado em 'typeToFormErrors'
      });
  })
)