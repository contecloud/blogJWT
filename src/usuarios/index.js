const middlewareAutenticacao = require('./middleware-autenticacao');

module.exports = {
  rotas: require('./usuarios-rotas'),
  controlador: require('./usuarios-controlador'),
  modelo: require('./usuarios-modelo'),
  estrategiasAutenticacao: require('./estrategias-autenticacao'),
  middlewareAutenticacao: require('./middleware-autenticacao'),
}