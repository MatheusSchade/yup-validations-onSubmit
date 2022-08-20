const typeToFormErrors = (err: any) => {
  // console.log('err', err.inner)
  const errors = {}; // objeto que receberá os erros
  err.inner.forEach((item: any) => { // inner transforma em array de objetos a mensagem padrão
    if (!errors[item.path]) { // se aquele erro não existir no objeto 'errors'
      errors[item.path] = item.message; // adiciona o erro ao objeto 'errors', com o value sendo a mensagem de erro
    }
  });
  return errors;
};

export const checkValidation = (err: any) => Object.keys(err).length === 0;
// checkValidation recebe o objeto com os erros do input e retorna um array de strings, 
// sendo cada string a chave do objeto com os erros recebidos. Se o array tiver length 0
// retorna true, significando que não há erros.

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
