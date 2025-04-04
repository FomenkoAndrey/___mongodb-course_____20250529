/*
 ? Ці функції відповідають за логіку відповіді клієнта, тому згідно паттерна MVC (Model-View-Controller) їх краще винести в controllers.
*/

// articles
const getArticlesHandler = (req, res) => {
  res.end('Get articles route')
}
const postArticlesHandler = (req, res) => {
  res.end('Post articles route')
}

// article/:articleId
const getArticleByIdHandler = (req, res) => {
  const articleId = req.params['articleId']
  res.end(`Get article by Id route: ${articleId}`)
}
const deleteArticleByIdHandler = (req, res) => {
  const articleId = req.params['articleId']
  res.end(`Delete article by Id route: ${articleId}`)
}
const putArticleByIdHandler = (req, res) => {
  const articleId = req.params['articleId']
  res.end(`Put article by Id route: ${articleId}`)
}

export {
  getArticlesHandler,
  postArticlesHandler,
  getArticleByIdHandler,
  deleteArticleByIdHandler,
  putArticleByIdHandler
}
